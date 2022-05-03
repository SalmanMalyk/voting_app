var path = 'dashboard.ledger.customer-invoices';

var btn = $('.btn-fetch-data');

var customer_id = $('#customer_id');

var date_range = $('#date_range');

var table; 

$(document).ready(function() {
    table = $('#customersLedger').DataTable({
        columnDefs: [
            {
                targets: [3, 4, 5],
                className: 'text-right'
            },
            {
                targets: [2],
                className: 'text-center'
            }
        ],
        buttons: [
            { extend: "copy", className: "btn btn-sm btn-primary" }, 
            { extend: "csv", className: "btn btn-sm btn-primary" }, 
            { extend: "pdf", className: "btn btn-sm btn-primary" }, 
            { extend: "print", className: "btn btn-sm btn-primary" }
        ], 
        dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
    })
})

btn.on('click', e => {
    e.preventDefault();
    
    var balance_checker = 0;

    if(!customer_id.val() && !date_range.val()) {
        $.notify('Please select customer & date range first!')
        return false;
    }

    btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Please Wait')

    table.clear().draw();

    axios.post(route(`${path}.show`), {
        params: {
            customer_id: customer_id.val(),
            date_range: date_range.val()
        }
    })
    .then(response => {
        let html = ``;
        
        let opening_balance = response.data.results[0] ? response.data.results[0].remaing_balance : 0;

        table.row.add([
            0, 
            '',
            '',
            '',
            'Opening Balance',
            numeral(opening_balance).format('0,0') || 0,
        ])

        response.data.results.forEach((v, i) => {
            
            opening_balance = (Number(v.invoice_amount) + Number(opening_balance)) - Number(v.received_amount);
            
            table.row.add([
                ++i, 
                v.display_date,
                v.document_number,
                numeral(v.invoice_amount).format('0,0'),
                numeral(v.received_amount).format('0,0'),
                numeral(opening_balance).format('0,0'),
            ])
            
        })

        table.draw();
    })
    .catch(err => {
        $.notify('Something went wrong!', 'error')
        console.error(err)
    })
    .then(() => btn.html('<i class="fas fa-arrow-down fa-sm mr-1"></i> Fetch Data'))
    

})





let data = {
    zone_name: $('#name').val(),
    
};