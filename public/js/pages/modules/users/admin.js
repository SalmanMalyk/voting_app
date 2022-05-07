var path = "dashboard.users.admin";
var dataTable;

$(function () {
    "use strict";

    $(".siteDataTable thead tr")
        .clone(true)
        .addClass("filters")
        .appendTo(".siteDataTable tfoot");

    dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        orderCellsTop: true,
        scrollCollapse: true,
        order: [[1, "desc"]],
        colReorder: true,
        select: true,
        ajax: route(`${path}.index`),
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
    path;
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

    $("#createForm").on("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        Swal2.fire({
            icon: "question",
            title: "Confirm",
            html: "Are you sure to create new admin?",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2ecc71",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                await axios
                    .post(route(`${path}.store`), formData)
                    .then(({ data }) => {
                        $("#createModal").modal("toggle");
                        $("#createForm").trigger('reset');
                        $(".siteDataTable").DataTable().ajax.reload(null, false);
                        Toast.fire({
                            icon: "success",
                            title: data.message
                        })
                        return data;
                    })
                    .catch((error) => {
                        if (error.response.status == 422) {
                            let messages = "";
                            $.each(error.response.data.errors, (k, v) => {
                                messages += `${v[0]} <br>`;
                            });
                            Swal2.showValidationMessage(`${messages}`);
                        } else {
                            Swal2.showValidationMessage(
                                `Request failed: ${error}`
                            );
                        }
                    });
            },
        });
    });

    $("#editForm").on("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this),
            id = $(event.target).attr('data-id');
        Swal2.fire({
            icon: "question",
            title: "Confirm",
            html: "Are you sure to update admin?",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2ecc71",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                await axios
                    .post(route(`${path}.update`, id), formData)
                    .then(({ data }) => {
                        $("#editModal").modal("toggle");
                        $("#editForm").trigger('reset');
                        $(".siteDataTable").DataTable().ajax.reload(null, false);
                        Toast.fire({
                            icon: "success",
                            title: data.message
                        })
                        return data;
                    })
                    .catch((error) => {
                        if (error.response.status == 422) {
                            let messages = "";
                            $.each(error.response.data.errors, (k, v) => {
                                messages += `${v[0]} <br>`;
                            });
                            Swal2.showValidationMessage(`${messages}`);
                        } else {
                            Swal2.showValidationMessage(
                                `Request failed: ${error}`
                            );
                        }
                    });
            },
        });
    });
});


const edit = async (admin) => {
    event.preventDefault();

    let data = dataTable.row(`tr#${admin}`).data(),
        popup = $('#editModal');

    $('#editForm').attr('data-id', admin)

    for (const item in data) {
        if (item == 'role') {
            popup.find(`.modal-body .form-control[name="role_id"]`).append(new Option(data[item], data['roles'][0].id, true, true)).trigger('change')
        } else {
            popup.find(`.modal-body .form-control[name="${item}"]`).val(data[item])
        }

    }
    popup.modal('toggle')
}


const deleteAdmin = async (admin) => {
    Swal2.fire({
        icon: "question",
        title: "Confirm",
        html: "Are you sure to delete admin?",
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            await axios
                .delete(route(`${path}.destroy`, admin))
                .then(({ data }) => {
                    $(".siteDataTable").DataTable().ajax.reload(null, false);
                    Toast.fire({
                        icon: "success",
                        title: data.message
                    })
                    return data;
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        let messages = "";
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        });
                        Swal2.showValidationMessage(`${messages}`);
                    } else {
                        Swal2.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    }
                });
        },
    });
}