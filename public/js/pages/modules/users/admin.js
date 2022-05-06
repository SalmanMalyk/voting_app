var path = "dashboard.users";

$(function () {
    "use strict";

    $(".siteDataTable thead tr")
        .clone(true)
        .addClass("filters")
        .appendTo(".siteDataTable tfoot");

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        orderCellsTop: true,
        scrollCollapse: true,
        order: [[1, "desc"]],
        colReorder: true,
        select: true,
        ajax: route(`${path}.adminUser`),
        fixedHeader: {
            header: true,
            headerOffset: $(".content-header").height() - 8,
        },

        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            { extend: "csv", className: "btn btn-sm btn-primary" },
            { extend: "pdf", className: "btn btn-sm btn-primary" },
            { extend: "print", className: "btn btn-sm btn-primary" },
            {
                text: "Refresh",
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                },
                className: "btn btn-sm btn-primary",
            },
        ],
        initComplete: function () {
            var api = this.api();

            // For each column
            api.columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $(".filters th").eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html(
                        '<input type="text" class="form-control form-control-sm" placeholder="' +
                            title +
                            '" />'
                    );

                    // On every keypress in this input
                    $(
                        "input",
                        $(".filters th").eq(
                            $(api.column(colIdx).header()).index()
                        )
                    )
                        .off("input")
                        .on("input", function (e) {
                            e.stopPropagation();

                            // Get the search value
                            $(this).attr("title", $(this).val());
                            var regexr = "({search})"; //$(this).parents('th').find('select').val();

                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api.column(colIdx)
                                .search(
                                    this.value != ""
                                        ? regexr.replace(
                                              "{search}",
                                              "(((" + this.value + ")))"
                                          )
                                        : "",
                                    this.value != "",
                                    this.value == ""
                                )
                                .draw();

                            $(this)
                                .focus()[0]
                                .setSelectionRange(
                                    cursorPosition,
                                    cursorPosition
                                );
                        });
                });
        },
        lengthMenu: [
            [25, 50, 100, -1],
            ["25 rows", "50 rows", "100 rows", "Show all"],
        ],
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
                name: "name",
                className: "text-center",
            },
            {
                data: "email",
                name: "email",
                className: "text-center",
            },
            {
                data: "role",
                name: "role",
                className: "text-center",
                orderable: false,
                searchable: false,
            },
            {
                data: "status",
                name: "status",
                className: "text-center",
                render: {
                    _: "display",
                    sort: "status",
                },
                searchable: false,
            },
            {
                data: "created_at",
                name: "created_at",
                className: "text-right",
                render: {
                    _: "display",
                    sort: "timestamp",
                },
                defaultContent: "—",
            },
            {
                data: "action",
                name: "action",
                className: "text-center",
                searchable: false,
                orderable: false,
            },
        ],
        language: {
            processing: `<div class="v-middle">
				<i class='fas fa-circle-notch fa-spin fa-3x text-primary mb-2'></i> 
				<br> 
				Processing
			</div>`,
        },
    });

    // update status when clicked

    $("table tbody").on("dblclick", ".x-btn-update", (e) => {
        e.preventDefault();
        Dashmix.block("state_loading", ".siteBlock");
        let payload = $(e.target).data("payload");

        axios
            .patch(route(`${routePath}.updateStatus`), {
                payload: payload,
            })
            .then(({ data }) => {
                Toast.fire({
                    title: "User status updated successfully! Please wait...",
                    icon: "success",
                });
                window.location.reload();
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: `Something went wrong. \nPlease try again.\n(${error})`,
                });
            })
            .then(() => Dashmix.block("state_normal", ".siteBlock"));
    });

    $(".x-filter-logs").on("click", (e) => {
        e.preventDefault();

        let hash = $(event.target).attr("data-hash");

        window.open(
            route("dashboard.users.activityLogs", {
                hash: hash,
                date_from: $("#date_from").val(),
                date_to: $("#date_to").val(),
            }),
            "_self"
        );
    });
});
