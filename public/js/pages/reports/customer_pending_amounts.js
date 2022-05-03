var routePath = 'dashboard.reports.CustomerPending', selectedCustomer;

$(() => {
    'use strict';

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        order: [[8, 'desc']],
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
            url: route(`${routePath}.index`),
            data: function (d) {
                d.filters = {
                    amount: $('#amount').val(),
                    operator: $('#operator').val(),
                    customer_type: $('#customer_type_id').val(),
                };
            }
        },
        columns: [
            {
                data: 'membership_no',
                name: 'membership_no',
                className: "text-center",
                defaultContent: null
            },
            {
                data: 'customer_name',
                name: 'name',
                className: "text-left",
                defaultContent: null
            },
            {
                data: 'contact_person',
                name: 'contact_person',
                className: "text-left",
                defaultContent: null
            },
            {
                data: 'contact_no',
                name: 'contact_no',
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
                defaultContent: null,
                searchable: false
            },
            {
                data: 'sum_receipts',
                name: 'sum_receipts',
                className: "text-right",
                defaultContent: null,
                type: 'num',
                render: $.fn.dataTable.render.number(','),
                defaultContent: null,
                searchable: false
            },
            {
                data: 'last_paid_amount',
                name: 'last_paid_amount',
                className: "text-right",
                defaultContent: null,
                type: 'num',
                render: $.fn.dataTable.render.number(','),
                defaultContent: null,
                searchable: false,
                orderable: false
            },
            {
                data: 'last_paid_date',
                name: 'last_paid_date',
                className: "text-right",
                defaultContent: null,
                searchable: false,
                orderable: false
            },
            {
                data: 'remaining_balance',
                name: 'remaining_balance',
                className: "text-right",
                type: 'num',
                defaultContent: null,
                render: $.fn.dataTable.render.number(','),
                searchable: false
            }
            // {
            //     data: 'action',
            //     name: 'action',
            //     className: "text-center",
            //     searchable: false,
            //     orderable: false
            // },

        ],
        language: {
            'processing': '<i class="fas fa-spinner fa-spin fa-3x fa-fw"></i>'
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page
            let saleTotal = api
                .column(4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            let cashReceived = api
                .column(5, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    if (b != '—') {
                        return intVal(a) + intVal(b);
                    }
                }, 0);

            let cashReceivableTotal = api
                .column(8, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    if (b != '—') {
                        return intVal(a) + intVal(b);
                    }
                }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                numeral(saleTotal).format('0,0')
            );

            $(api.column(5).footer()).html(
                numeral(cashReceived).format('0,0')
            );

            $(api.column(8).footer()).html(
                numeral(cashReceivableTotal).format('0,0')
            );
        }

    });

    $(document).on('click', '.btn-filter', () => {
        event.preventDefault();
        $(".siteDataTable").DataTable().ajax.reload(null, false);
    })

    $('.siteDataTable tbody').on('dblclick', 'tr', function() {
        var data = $('.siteDataTable').DataTable().row(this).data();

        if (data.customer_branches_count > 1) { // customer has more then one branch so open details popup
            viewCustomerChilds(data.id, data.name)
        } else {
            viewCustomerDetails(data.customer_branches[0].id, data.customer_branches[0].complete_name);
        }

    })
    
    $('.pendingAmountTable tbody').on('dblclick', 'tr', function () {
        var data = $('.pendingAmountTable').DataTable().row(this).data();
        viewCustomerDetails(data.id, data.complete_name);
    });

});


const viewCustomerChilds = (customer, name = null) => {
    event.preventDefault();

    let popup = $('#customerDetailsModal');

    popup.find('.modal-title').html(`Pending Amounts of: <b>"${name}"</b>`)
    $.notify('Fetching customer details. \nPlease Wait...', 'message')
    

    $(".pendingAmountTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        order: [[8, 'desc']],
        select: true,
        bDestroy: true,
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
            url: route(`${routePath}.show`, customer),
        },
        columns: [
            {
                data: 'customer.membership_no',
                name: 'customer.membership_no',
                className: "text-center",
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
                className: "text-center",
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
            {
                data: "status",
                name: "status",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'status'
                },
                defaultContent: "—"
            },

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

            // Total over this page
            let saleTotal = api
                .column(4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            let cashReceived = api
                .column(5, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    if (b != '—') {
                        return intVal(a) + intVal(b);
                    }
                }, 0);

            let cashReceivableTotal = api
                .column(8, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    if (b != '—') {
                        return intVal(a) + intVal(b);
                    }
                }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                numeral(saleTotal).format('0,0')
            );

            $(api.column(5).footer()).html(
                numeral(cashReceived).format('0,0')
            );

            $(api.column(8).footer()).html(
                numeral(cashReceivableTotal).format('0,0')
            );
        }
    });

    popup.modal('show');
}