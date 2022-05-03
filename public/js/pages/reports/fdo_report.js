var routePath = `dashboard.reports.fdoReport`;

const notAssignedCustomers = () => {
    let filters = {
        customer_type_id: $("#customer_type_id").val(),
        date: $("#date").val()
    };
    Dashmix.block("state_loading", ".notAssignedBlock");
    $(".notAssignedTableData tbody").empty();
    return axios
        .post(route(`${routePath}.notAssignedTableData`), filters)
        .then((response) => {
            $(".notAssignedTableData tbody").html(atob(response.data));
        })
        .catch((error) => {
            console.error(error);
            $.notify("Something went wrong.");
        })
        .then(() => {
            Dashmix.block("state_normal", ".notAssignedBlock");
        });
};

const notDeliveredOrder = () => {
    let filters = {
        customer_type_id: $("#customer_type_id").val(),
        date: $("#date").val()
    };
    Dashmix.block("state_loading", ".notDeliveredOrderBlock");
    $(".notDeliveredOrderTableData tbody").empty();
    return axios
        .post(route(`${routePath}.notDeliveredOrder`), filters)
        .then((response) => {
            $(".notDeliveredOrderTableData tbody").html(atob(response.data));
        })
        .catch((error) => {
            console.error(error);
            $.notify("Something went wrong.");
        })
        .then(() => {
            Dashmix.block("state_normal", ".notDeliveredOrderBlock");
        });
};

const lessPaymentByCustomer = () => {
    let filters = {
        customer_type_id: $("#customer_type_id").val(),
        date: $("#date").val()
    };
    Dashmix.block("state_loading", ".nonPaidBlock");
    $(".nonPaidTableData tbody").empty();
    return axios
        .post(route(`${routePath}.lessPaymentByCustomer`), filters)
        .then((response) => {
            $(".nonPaidTableData tbody").html(atob(response.data));
        })
        .catch((error) => {
            console.error(error);
            $.notify("Something went wrong.");
        })
        .then(() => {
            Dashmix.block("state_normal", ".nonPaidBlock");
        });
};

const extraPaymentByCustomer = () => {
    let filters = {
        customer_type_id: $("#customer_type_id").val(),
        date: $("#date").val()
    };
    Dashmix.block("state_loading", ".extraPaymentBlock");
    $(".extraPaymentTable tbody").empty();
    return axios
        .post(route(`${routePath}.extraPaymentByCustomer`), filters)
        .then((response) => {
            $(".extraPaymentTable tbody").html(atob(response.data));
        })
        .catch((error) => {
            console.error(error);
            $.notify("Something went wrong.");
        })
        .then(() => {
            Dashmix.block("state_normal", ".extraPaymentBlock");
        });
};

const bottleVariance = () => {
    let filters = {
        customer_type_id: $("#customer_type_id").val(),
        date: $("#date").val()
    };
    Dashmix.block("state_loading", ".extraBottleReturnBlock");
    $(".extraBottleTableData tbody").empty();
    return axios
        .post(route(`${routePath}.bottleVariance`), filters)
        .then((response) => {
            $(".extraBottleTableData tbody").html(atob(response.data));
        })
        .catch((error) => {
            console.error(error);
            $.notify("Something went wrong.");
        })
        .then(() => {
            Dashmix.block("state_normal", ".extraBottleReturnBlock");
        });
};

async function resolvePromises() {
    await notAssignedCustomers();
    await notDeliveredOrder();
    await lessPaymentByCustomer();
    await extraPaymentByCustomer();
    await bottleVariance();
}

$(document).ready(function () {
    resolvePromises();

    $(document).on("click", ".btn-filter", () => {
        event.preventDefault();

        if ($("#date").val()) {
            resolvePromises();
        } else {
            $(event.target).notify(
                "Please select proper date range.",
                "warning"
            );
        }
    });
});
