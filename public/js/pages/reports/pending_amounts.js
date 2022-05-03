$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		order: [ [8, 'desc'] ],
		select: true,
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
		ajax: {
            url: route(`dashboard.reports.pendingAmounts.index`),
            data: function (d) {
                d.filters = {
                    amount:        $('#amount').val(),
                    operator:      $('#operator').val(),
                    customer_type: $('#customer_type_id').val(),
                };
            }
        },
		columns: [
			{
				data: 'customer.membership_no',
				name: 'customer.membership_no',
                className: "text-left",
				defaultContent: null
			},
            {
				data: 'branch_name',
				name: 'branch_name',
                className: "text-left",
				defaultContent: null
			},
            {
				data: 'town.name',
				name: 'town_id',
                className: "text-left",
				defaultContent: null
			},
            {
				data: 'address',
				name: 'address',
                className: "text-left",
				defaultContent: null
			},
            {
				data: 'sum_sale',
				name: 'sum_sale',
                className: "text-right",
				defaultContent: null,
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: null
			},
            {
				data: 'sum_receipts',
				name: 'sum_receipts',
                className: "text-right",
				defaultContent: null,
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: null
			},
            {
				data: 'last_paid_amount',
				name: 'last_paid_amount',
                className: "text-right",
				defaultContent: null,
                type: 'num',
                render: $.fn.dataTable.render.number(','),
				defaultContent: null
			},
            {
				data: 'last_paid_date',
				name: 'last_paid_date',
                className: "text-right",
				defaultContent: null
			},
            {
				data: 'remaining_balance',
				name: 'remaining_balance',
                className: "text-right",
				type: 'num',
				defaultContent: null,
				render: $.fn.dataTable.render.number(','),
				searchable: false
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

            // Total over this page
            let saleTotal = api
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
			
			let cashReceived = api
                .column( 5, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
					if(b != '—') {
						return intVal(a) + intVal(b);
					}
                }, 0 );
				
			let cashReceivableTotal = api
                .column( 8, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
					if(b != '—') {
						return intVal(a) + intVal(b);
					}
                }, 0 );

            // Update footer
            $( api.column(4).footer()).html(
                numeral(saleTotal).format('0,0')
            );
			
			$( api.column(5).footer()).html(
                numeral(cashReceived).format('0,0')
            );
			
			$( api.column(8).footer()).html(
                numeral(cashReceivableTotal).format('0,0')
            );
        }

	});

	$(document).on('click', '.btn-filter', () => {
		event.preventDefault();
		$(".siteDataTable").DataTable().ajax.reload(null, false);
	})

});


