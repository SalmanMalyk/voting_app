var path    = 'dashboard.ledger.customer-invoices',
    btn     = $('.btn-fetch-data'),
    customer_id = $('#customer_id'),
    date_from   = $('#date_from'),
    date_to     = $('#date_to'),
    table;

let params = (new URL(document.location)).searchParams;
let c_id = params.get("customer_id");
let c_name  = params.get("name");


$(document).ready(function () {
    table = $("#customersLedger").DataTable({
        ordering: false,
        order: [],
        rowId: "id",
        columnDefs: [
            {
                targets: [4, 5, 6, 7, 8],
                className: "text-right",
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                targets: [2],
                className: "text-center invoice-details",
                exportOptions: {
                    columns: ":visible",
                },
            },
        ],
        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "colvis", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            { extend: "csv", className: "btn btn-sm btn-primary" },
            {
                text: "PDF",
                action: function (e, dt, node, config) {
                    generateCustomerDetailsLedger().then(() => {
                        $("#printLedgerPdf").modal("show");
                    });
                },
                className: "btn btn-sm btn-primary",
            },
        ],
        lengthMenu: [
            [10, 25, 50, -1],
            ["10 rows", "25 rows", "50 rows", "Show all"],
        ],
        bLengthChange: false,
        dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
    });

    if(c_id && c_name) {
        $('#customer_id').append(new Option(c_name, c_id, true, true)).trigger('change')
        $('.btn-fetch-data').trigger("click");
    }


    /**
     * show invoice details on double clicking invoice number
     * @param int Invoice ID
     * @returns opens invoice details popup
     */
    $('#customersLedger tbody').on('dblclick', 'td.invoice-details', function() {
        
        let id = $(event.target).closest('tr').attr('id'),
            invoice_no = $(event.target).text();

        // TODO: check if selected cell is not an payment
        if (hasNumber(invoice_no)) {
            viewInvoiceDetails(id, invoice_no);
        }
        
    });
})

btn.on('click', e => {
    e.preventDefault();

    var balance_checker = 0;
    if (!customer_id.val() || !date_from.val() || !date_to.val()) {
        $.notify('Please select customer & date range first!')
        return false;
    }

    btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Please Wait')

    table.clear().draw();   

    axios.post(route(`dashboard.ledger.customerInvoiceProducts`), {
            params: {
                customer_id: customer_id.val(),
                date_from: date_from.val(),
                date_to: date_to.val()
            }
        })
        .then(response => {
            let html = ``;

            let opening_balance = response.data.results[0] ? response.data.results[0].remaing_balance : 0;

            table.row.add([
                0,
                '',
                '',
                'Opening Balance',
                '',
                '',
                '',
                '',
                '',
                numeral(opening_balance).format('0,0') || 0,
            ])

            response.data.results.forEach((v, i) => {

                let discounted_rate = v.qty > 0 ? Number(v.pRate) - (Number(v.discount_amount) / Number(v.qty)) : 0;

                let amount = Number(v.qty) * Number(discounted_rate);

                opening_balance = (Number(amount) + Number(opening_balance)) - Number(v.received_amount);

                table.row.add([
                    ++i,
                    v.display_date,
                    v.document_number || null,
                    v.pName || null,
                    v.qty || null,
                    v.returned || null,
                    discounted_rate ? numeral(discounted_rate).format('0,0') : null,
                    amount ? numeral(amount).format('0,0') : null,
                    v.received_amount ? numeral(v.received_amount).format('0,0') : null,
                    opening_balance ? numeral(opening_balance).format('0,0') : null,
                ]).node().id = v.id;
            })

            table.draw();
        })
        .catch(err => {
            $.notify('Something went wrong!', 'error')
            console.error(err)
        })
        .then(() => btn.html('<i class="fas fa-arrow-down fa-sm mr-1"></i> Fetch Data'))


})


const generateCustomerDetailsLedger = async () => {


    return new Promise((resolve, reject) => {
        // get parameters
        let params = {
            customer: $('#customer_id').val(),
             date_from: date_from.val(),
                date_to: date_to.val()
        };
        // check if exists
        if(params.customer && params.date_from && params.date_to) {
            $.notify('Please wait generating pdf!', 'message')
            try {
                $('#printLedgerPdf .ledger-pdf').prop('src', route('dashboard.ledger.generateCustomerProductsLedgerPdf', {
                    customer: $('#customer_id').val(),
                    date_from: date_from.val(),
                    date_to: date_to.val()
                }))
                resolve()
            } catch (error) {
                $.notify('Something went wrong. Please try again!')
                reject(error);
            }
        } else {
            reject();
            $(event.target).notify('Please select filters first!', 'error');
        }
    });

    
}

// empty previous iframe source on modal hidden
$('#printLedgerPdf').on('hide.bs.modal', () => {
    $('#printLedgerPdf .ledger-pdf').prop('src', '')
})

$('#customer_id').on('change',()=>{
    let customer_id = $('#customer_id').val()

    if(customer_id) {
        // show customers details dive
        // $('.customer-details').prop('hidden', false)
        $.notify('Please wait system fetching \ncustomer details.', 'info')

        axios.get(route('api.customers.customerLedgerInfo', customer_id))
            .then(({data}) => {
                $('.first_delivery').html(moment(data.first_delivery).format('DD-MMM-YYYY') || null),
                $('.last_delivery').html(moment(data.last_delivery).format('DD-MMM-YYYY')),
                $('.bottle_cap').html(data.bottle_cap),
                $('.bottle_cap_balance').html(data.bottle_balance),

                $('.last_paid_amount').html(data.last_paid_amount),
                $('.sum_sale').html(data.sum_sale),
                $('.address').html(`${data.new_address}, ${data.town}`),
                $('.sum_receipts').html(data.receivable),
                $('.complete_name').html(data.complete_name + ` (${data.membership_no})`)
                $('.last_paid_date').html(data.last_paid_date)
                $('.balance').html(data.receivable)
            })
            .catch(error=>{
                Toast.fire({
                    icon: "error",
                    title: `Something went wrong.\nPlease try again.\n${error}`
                })
            })
    } else {
        // hide customers details dive
        $('.customer-details').prop('hidden', true)
    }
})