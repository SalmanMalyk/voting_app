$(() => {
    "use strict";

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        select: true,
        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "colvis", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            {
                extend: "csv",
                className: "btn btn-sm btn-primary",
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                extend: "pdf",
                className: "btn btn-sm btn-primary",
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                extend: "print",
                className: "btn btn-sm btn-primary",
                exportOptions: {
                    columns: ":visible",
                },
            },
            {
                text: "Refresh",
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                },
                className: "btn btn-sm btn-primary",
            },
        ],
        lengthMenu: [
            [25, 50, 100, -1],
            ["25 rows", "50 rows", "100 rows", "Show all"],
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
            url: route(`dashboard.reports.special-customer-report.index`),
            data: function (d) {
                d.filters = {
                    customer_type: $("#customer_type_id").val(),
                };
            },
        },
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                className: "text-center",
                orderable: false,
                searchable: false,
            },
            {
                data: "name",
                name: "customer.name",
                render: {
                    _: "display",
                    sort: "value",
                },
                defaultContent: "—",
            },
            {
                data: "address",
                name: "address",
                className: "text-left",
                defaultContent: "—",
            },
            {
                data: "block.name",
                name: "block.name",
                className: "text-left",
                defaultContent: "—",
            },
            {
                data: "town.name",
                name: "town.name",
                className: "text-left",
                defaultContent: "—",
            },
            {
                data: "action",
                name: "action",
                className: "text-left",
                defaultContent: null,
                orderable: false,
                searchable: false,
            },
        ],
    });

    $(document).on("change", "#customer_type_id", function (event) {
        $(".siteDataTable").DataTable().ajax.reload(null, false);
    });
});
