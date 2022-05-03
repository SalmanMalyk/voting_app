var path = 'dashboard.bad-debts';

$(() => {
    'use strict';

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        bStateSave: true,
        order: [[1, 'desc']],
        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            { extend: "csv", className: "btn btn-sm btn-primary" },
            { extend: "pdf", className: "btn btn-sm btn-primary" },
            { extend: "print", className: "btn btn-sm btn-primary" },
            {
                text: 'Refresh',
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                },
                className: "btn btn-sm btn-primary"
            }
        ],
        lengthMenu: [
            [25, 50, 100, -1],
            ['25 rows', '50 rows', '100 rows', 'Show all']
        ],
        bLengthChange: false,
        dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left                                                                                                                                                                                        'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
        ajax: route(`${path}.index`),
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                className: "text-center",
                orderable: false,
                searchable: false
            },
            {
                data: 'payment_date',
                name: 'payment_date',
                className: "text-right",
                type: 'num',
                render: {
                    _: 'display',
                    sort: 'timestamp'
                },
                defaultContent: "—"
            },
            {
                data: "customer_branch.customer.membership_no",
                name: "customerBranch.customer.membership_no",
                className: "text-center",
                defaultContent: "—"
            },
            {
                data: "customer_branch.complete_name",
                name: "customerBranch.customer.name",
                className: "text-left text-capitalize",
                defaultContent: "—"
            },
            {
                data: "customer_branch.short_address",
                name: "customerBranch.address",
                className: "text-left text-capitalize",
                defaultContent: "—"
            },
            {
                data: "customer_branch.block.name",
                name: "customerBranch.block_id",
                className: "text-center text-capitalize",
                defaultContent: "—"
            },
            {
                data: "customer_branch.town.name",
                name: "customerBranch.town_id",
                className: "text-left text-capitalize",
                defaultContent: "—"
            },
            {
                data: "amount",
                name: "amount",
                className: "text-right",
                type: 'num',
                render: $.fn.dataTable.render.number(','),
                defaultContent: null

            },
            {
                data: "created_by.name",
                name: "createdBy.name",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "updated_by.name",
                name: "updatedBy.name",
                className: "text-left",
                defaultContent: "—"
            },
            // {
            //     data: "action",
            //     name: "action",
            //     className: "text-center",
            //     orderable: false,
            //     searchable: false
            // }
        ],
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over all pages
            let total = api.ajax.json().total;
            // Total over this page
            let pageTotal = api
                .column(7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            // Update footer
            $(api.column(7).footer()).html(
                numeral(pageTotal).format('0,0') + ' ( ' + numeral(total).format('0,0') + ' Grand Total)'
            ).addClass('font-w700 text-right');
        }

    });


    $('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row(this).data();
        viewCustomerDetails(data.customer_branch.id, (data.customer_branch.complete_name || null));
    });


    $(document).on('change', '#customer_branch_id, #edit_customer_branch_id', async function (event) {
        event.preventDefault();

        let customer_branch_id = event.target.value,
            customerInfo = document.querySelector('.customerInfo');

        customerInfo.hidden = true;

        await axios.get(route('api.customers.customerLedgerInfo', customer_branch_id))
            .then(async ({ data }) => {
                customerInfo.hidden = false;
                
                $('.complete_name').html(data.complete_name || null),
                $('.address').html(`${data.new_address}, ${data.town}`)

                $('.first_delivery').html(moment(data.first_delivery).format('DD-MMM-YYYY') || null),
                $('.last_delivery').html(moment(data.last_delivery).format('DD-MMM-YYYY')),
                $('.bottle_cap').html(data.bottle_cap),
                $('.last_paid_amount').html(data.last_paid_amount),
                $('.sum_sale').html(data.sum_sale),
                $('.address').html(`${data.new_address}, ${data.town}`),
                $('.sum_receipts').html(data.receivable),
                $('.complete_name').html(data.complete_name + ` (${data.membership_no})`)
                $('.last_paid_date').html(data.last_paid_date)
                
                $('#amount').val(numeral(data.receivable).value()).attr({min: numeral(data.receivable).value(),max: numeral(data.receivable).value()})
            })
            .catch(error => {
                customerInfo.hidden = true;

                Toast.fire({
                    icon: "error",
                    title: `Something went wrong.\nPlease try again.\n${error}`
                })
            })        
    })
    

    $('#siteModal').on('show.bs.modal', function (e) {
        document.querySelector('.customerInfo').hidden = true;
        $('#badDebtCreateForm')[0].reset();
    })
});


const removePayment = (id) => {
    event.preventDefault();

    Swal2.fire({
        title: 'Are you sure?',
        text: "This payment will be removed entirely!",
        icon: 'warning',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#bdc3c7',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Dashmix.block('state_loading', '.siteBlock')

            axios.delete(route(`${path}.destroy`, id))
                .then(({ data }) => {
                    $(".siteDataTable").DataTable().ajax.reload(null, false);
                    Toast.fire({
                        icon: 'success',
                        title: data.message
                    })
                })
                .catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong. Please try again!'
                    })
                })
                .then(() => Dashmix.block('state_normal', '.siteBlock'))
        } else {
            Toast.fire({
                icon: 'info',
                title: 'Action canceled!'
            })
        }
    })



}


const createAction = () => {
    event.preventDefault();

    let formData = new FormData($('#badDebtCreateForm')[0])
    
    Swal2.fire({
        icon: 'question',
        title: 'Confirm',
        html: 'Are you sure to create this entry?',
        confirmButtonText: 'Yes, Continue',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            await axios.post(route(`${path}.store`), formData)
                .then(({ data }) => {
                    Swal2.fire({
                        title: 'Success',
                        icon: 'success',
                        html: data.message,
                        confirmButtonText: 'Done',
                        showCancelButton: false,
                        allowOutsideClick: false,
                        confirmButtonColor: '#2ecc71'
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            $('#siteModal').modal('toggle')
                            $(".siteDataTable").DataTable().ajax.reload(null, false);
                        }
                    })
                    return data;
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        let messages = '';
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        })
                        Swal2.showValidationMessage(
                            `${messages}`
                        )
                    } else {
                        Swal2.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    }
                })
        }
    })
}



const edit = async (customerBranch) => {
    let form = $('#badDebtEditForm'),
        popup = $('#editSiteModal');

    Dashmix.block('state_loading', '.siteBlock');

    await axios.get(route(`${path}.edit`, customerBranch))
        .then(({data}) => {
            $('#badDebtEditForm').attr('data-id', data.id)
            for(let key in data) {
                form.find(`[name="${key}"]`).val(data[key]).trigger('change')
            }
            form.find('#edit_customer_branch_id').append(new Option(data.customer_branch.complete_name, data.customer_branch_id, true, true));
            form.find('#edit_customer_branch_id').trigger('change');
            
            popup.modal('toggle')
        })
        .catch(error => {
            console.log(error)
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again later.\n${error}`
            })
        })
        .then(() => Dashmix.block('state_normal', '.siteBlock'))
}

const editAction = async () => {
    event.preventDefault();

    let formData = $('#badDebtEditForm').serialize(),
        id = $('#badDebtEditForm').attr('data-id');

    Swal2.fire({
        icon: 'question',
        title: 'Confirm',
        html: 'Are you sure to update this entry?',
        confirmButtonText: 'Yes, Continue',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            await axios.patch(route(`${path}.update`, id), formData)
            .then(({ data }) => {
                Swal2.fire({
                    title: 'Success',
                    icon: 'success',
                    html: data.message,
                    confirmButtonText: 'Done',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#2ecc71'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            $('#editSiteModal').modal('toggle')
                            $(".siteDataTable").DataTable().ajax.reload(null, false);
                        }
                    })
                return data;
            })
            .catch(error => {
                if (error.response.status == 422) {
                    let messages = '';
                    $.each(error.response.data.errors, (k, v) => {
                        messages += `${v[0]} <br>`;
                    })
                    Swal2.showValidationMessage(
                        `${messages}`
                    )
                } else {
                    Swal2.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }
            })
        }
    })
}