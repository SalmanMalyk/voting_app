$(() => {
    'use strict';

    $('.siteDataTable thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('.siteDataTable thead');

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        bStateSave: true,
        order: [[8, 'desc']],
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
                data: "compain",
                name: "compain",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: 'phone_no',
                name: 'phone_no',
                className: "text-left",
                type: 'num',
                defaultContent: "—"
            },
            {
                data: "customer_branch.complete_name",
                name: "customerBranch.customer.name",
                className: "text-left text-capitalize",
                defaultContent: "—"
            },
            {
                data: "customer_branch.customer.membership_no",
                name: "customerBranch.customer.membership_no",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "sent_by.name",
                name: "sentBy.name",
                className: "text-center",
                defaultContent: "—"
            },
            {
                data: "sending_type",
                name: "sending_type",
                className: "text-center text-capitalize",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            {
                data: "status",
                name: "status",
                className: "text-center text-capitalize",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            {
                data: "created_at",
                name: "created_at",
                className: "text-right",
                render: {
                    _: 'display',
                    sort: 'timestamp'
                },
                defaultContent: "—"
            },
            {
                data: "action",
                name: "action",
                className: "text-center",
                orderable: false,
                searchable: false
            }
        ],
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function () {
            var api = this.api();

            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html('<input type="text" placeholder="' + title + '" />');

                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('keyup change', function (e) {
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
    });


    $('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row(this).data();
        if (data.customer_branch) {
            viewCustomerDetails(data.customer_branch.id, (data.customer_branch.complete_name || null));
        }
    });
});
