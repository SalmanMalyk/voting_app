var path = 'dashboard.reports.delivery-process',
    dataTable;

$(() => {
    'use strict';

    // TODO: duplicate table header
    $('.siteDataTable thead tr').clone(true).addClass('filters').appendTo('.siteDataTable thead');

    // TODO: init datatable
    dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        orderCellsTop: true,
        scrollCollapse: true,
        select: true,
        ajax: route(`${path}.show`, sc_id),
        order: [[0, "asc"]],
        colReorder: true,
        rowReorder: {
            dataSrc: 'order_no'
        },
        fixedHeader: {
            header: true,
            headerOffset: $('.content-header').height() - 8
        },
        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            { extend: "csv", className: "btn btn-sm btn-primary" },
            { extend: "pdf", className: "btn btn-sm btn-primary" },
            { extend: "print", className: "btn btn-sm btn-primary" },
            {
                text: 'Refresh',
                className: "btn btn-sm btn-primary",
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                },
            }
        ],
        lengthMenu: [
            [25, 50, 100, -1],
            ['25 rows', '50 rows', '100 rows', 'Show all']
        ],
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
        columns: [
            {
                data: "order_no",
                name: "order_no",
                className: "text-center reorder"
            },
            {
                data: "complete_name",
                name: "customerBranch.customer.name",
                className: "clearfix",
                defaultContent: "—",
                orderable: false
            },
            {
                data: "customer_branch.short_address",
                name: "customerBranch.address",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "customer_branch.block.name",
                name: "customerBranch.block.name",
                className: "text-center",
                defaultContent: "—"
            },
            {
                data: "customer_branch.town.name",
                name: "customerBranch.town.name",
                className: "text-center",
                defaultContent: "—"
            },
            {
                data: "cash_received",
                name: "cash_received",
                className: "text-center",
                defaultContent: "—",
                searchable: false
            },
            {
                data: "bottle_quantity",
                name: "bottle_quantity",
                className: "text-center",
                defaultContent: "—",
                searchable: false
            },
            {
                data: "actual_bottle_qty",
                name: "actual_bottle_qty",
                className: "text-center",
                defaultContent: "—",
                searchable: false
            },
            {
                data: "returned_bottle_qty",
                name: "returned_bottle_qty",
                className: "text-center",
                defaultContent: "—",
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
            {
                data: "special_instructions",
                name: "special_instructions",
                defaultContent: "—",
                className: 'special_instructions'
            },
            {
                data: "modified_by.name",
                name: "modifiedBy.name",
                className: "text-center",
                defaultContent: "—"
            }
        ],
        language: {
            "processing": `<div class="v-middle">
							<i class='fas fa-circle-notch fa-spin fa-3x text-muted mb-2'></i> 
							<br> 
							Processing
						  </div>`,
        },
        initComplete: function () {
            var api = this.api();

            // For each column
            api
                .columns(":visible")
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html('<input type="text" class="form-control form-control-sm" placeholder="' + title + '" />');

                    // On every keypress in this input
                    $('input', $('.filters th').eq($(api.column(colIdx).header()).index()))
                        .off('input')
                        .on('input', function (e) {
                            e.stopPropagation();

                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();

                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();

                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page
            let schedule_total = api
                .column(6, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            let actual_total = api
                .column(7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            let returened_qty = api
                .column(8, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(6).footer()).html(numeral(schedule_total).format('0,0'))
            $(api.column(7).footer()).html(numeral(actual_total).format('0,0'))
            $(api.column(8).footer()).html(numeral(returened_qty).format('0,0'))
        }
    });
});