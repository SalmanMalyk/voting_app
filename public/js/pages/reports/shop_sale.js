var path = 'dashboard.reports.saleDetails';

$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		order: [ [1, 'asc'] ],
		buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "colvis", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" }, 
            { 
				extend: "csv", 
				className: "btn btn-sm btn-primary",
				exportOptions: {
                    columns: ':visible'
                }
		 	}, 
            { 
				extend: "pdf", 
				className: "btn btn-sm btn-primary",
				exportOptions: {
                    columns: ':visible'
                } 
			}, 
            { 
				extend: "print", 
				className: "btn btn-sm btn-primary",
				exportOptions: {
                    columns: ':visible'
                }
			},
			{
				text: 'Refresh',
				action: function ( e, dt, node, config ) {
					dt.ajax.reload();
				},
				className: "btn btn-sm btn-primary"
			}
        ],
		lengthMenu: [
            [ 25, 50, 100, -1 ],
            [ '25 rows', '50 rows', '100 rows', 'Show all' ]
        ],
		bLengthChange: false,
        dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left bg-body-light'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
		ajax: {
            url: route(`${path}.index`),
            data: function (d) {
                d.filters = {
                    delivery_statuses: $('#delivery_statuses').val(),
                    date_from: $('#date_from').val(),
                    date_to: $('#date_to').val(),
                };
            }
        },
		columns: [
			{
				data: 'invoice_no',
				name: 'invoice_no',
                className: "text-center invoice",
				defaultContent: "—"
			},
            {
				data: 'delivery_date',
				name: 'delivery_date',
                className: "text-right",
				render: {
					_: 'display',
					sort: 'timestamp'
				},
				defaultContent: "—"
			},
            {
				data: 'order_type',
				name: 'invoice_type_id',
                className: "text-left",
				render: {
					_: 'display',
					sort: 'data'
				}, 
				defaultContent: "—"
			},
			{
				data: "customer_branch.customer.name",
				name: "customerBranch.customer.name",
				className: "text-left customer",
				defaultContent: "—"
			},
			{
				data: "customer_branch.short_address",
				name: "customerBranch.address",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.block.name",
				name: "customerBranch.block_id",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.town.name",
				name: "customerBranch.town_id",
				className: "text-left",
				defaultContent: "—"
			},
            {
				data: 'order_taken_by.name',
				name: 'orderTakenBy.name',
                className: "text-left",
				defaultContent: "—"
			},
			{
				data: "sum_invoice_amount",
				name: "sum_invoice_amount",
				className: "text-right",
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: "—"
			},
            {
				data: 'cash_received_by',
				name: 'payment.createdBy.name',
                className: "text-left",
				defaultContent: "—"
			},
			{
				data: "payment.amount",
				name: "payment.amount",
				className: "text-right",
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: "—"
			},
			{
				data: "difference",
				name: "difference",
				className: "text-right",
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: "—",
                sortable: false,
                searchable: false,
			},
            
		],
		"footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over all pages
            let total = api.ajax.json().total;
            // Total over this page
            let saleTotal = api
                .column( 8, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
			
			let cashReceived = api
                .column( 10, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
					if(b != '—') {
						return intVal(a) + intVal(b);
					}
                }, 0 );
				
			let difference = api
                .column( 11, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
					if(b != '—') {
						return intVal(a) + intVal(b);
					}
                }, 0 );

            // Update footer
            $( api.column(8).footer()).html(
                numeral(saleTotal).format('0,0')
            );
			
			$( api.column(10).footer()).html(
                numeral(cashReceived).format('0,0')
            );
			$( api.column(11).footer()).html(
                numeral(difference).format('0,0')
            );
        }

	});


});



$(document).on('change', '.filters-block .form-control', () => {
	event.preventDefault();
	$(".siteDataTable").DataTable().ajax.reload(null, false);
})


$('.siteDataTable tbody').on('dblclick', '.customer', function () {
      var data = $('.siteDataTable').DataTable().row(this).data();
      viewCustomerDetails(data.customer_branch.id,data.customer_branch.customer.name);
    });
$('.siteDataTable tbody').on('dblclick', '.invoice', function () {
      var data = $('.siteDataTable').DataTable().row(this).data();
      viewInvoiceDetails(data.id,data.invoice_no);
    });


