var path = "dashboard.product-catagory.";
$(() => {
    "use strict";

    var dataTable = $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        dom: "Bfrtip",
        colReorder: true,
        buttons: ["copy", "excel", "pdf", "colvis"],
        ajax: route(`${path}index`),
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                className: "text-center",
            },
            {
                data: "title",
                name: "title",
                className: "text-center",
            },
            {
                data: "visibility",
                name: "visibility",
                className: "text-center",
            },
            {
                data: "status",
                name: "status",
                className: "text-center",
            },
            {
                data: "action",
                name: "action",
                className: "text-center",
            },
        ],
        order: [],
    });
});

function deleteProductCatagory(id) {
    swal({
        title: "Warning",
        text: "Are you sure to delete this data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            axios
                .delete(route(`${path}destroy`, id))
                .then((resp) => {
                    $(".siteDataTable").DataTable().ajax.reload(null, false);
                    swal("Success", "Product deleted successfully.", "success");
                })
                .catch((err) =>
                    swal("Warning", "Something went wrong.", "error")
                );
        }
    });
}

$("#productCatagoryForm").on("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    axios
        .post(route(path + "store"), formData)
        .then(({ data }) => {
            $(event.target)[0].reset();
            $("#siteModal").modal("toggle");
            $(".siteDataTable").DataTable().ajax.reload(null, false);
            Swal2.fire({
                icon: "success",
                title: "Created Sucessfully",
                message: data.message,
            });
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again.\n${error}`,
            });
        });
});

//Edit Designation
function editProductCatagory(id) {
    Dashmix.block("state_loading", ".siteBlock");

    let form = $("#editProductCatagoryForm");

    axios
        .get(route(`${path}edit`, id))
        .then(({ data }) => {
            form.attr("data-id", data.id);

            form.find('[name="title"]').val(data.title);
            form.find('[name="visibility"]').prop("checked", data.visibility);
            form.find('[name="status"]').prop("checked", data.status);

            $("#siteModalEdit").modal("show");
        })
        .catch((error) => {
            console.error("Something went wrong: " + error);
            Toast.fire({
                icon: "error",
                title: "Something went wrong. Please try again!",
            });
        })
        .then(() => Dashmix.block("state_normal", ".siteBlock"));
}

//Update
$("#editProductCatagoryForm").submit(function (event) {
    event.preventDefault();
    let id = $(this).data("id");
    let data = {
        title: $(event.target).find('[name="title"]').val(),
        visibility: $(event.target).find('[name="visibility"]').is(":checked"),
        status: $(event.target).find('[name="status"]').is(":checked"),
    };

    axios
        .patch(route(path + "update", id), data)
        .then(({ data }) => {
            $(event.target)[0].reset();
            $("#siteModalEdit").modal("toggle");
            $(".siteDataTable").DataTable().ajax.reload(null, false);
            Swal2.fire({
                icon: "success",
                title: "Updated Sucessfully",
                message: data.message,
            });
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again.\n${error}`,
            });
        });
});
