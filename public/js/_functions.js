$(() => {
    $("body").on("click", function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (
                !$(this).is(e.target) &&
                $(this).has(e.target).length === 0 &&
                $(".popover").has(e.target).length === 0
            ) {
                $(this).popover("hide");
            }
        });
    });
});

/**
 * Function to check if a string contains numbers
 * @author Salman
 * @param {String} string The string to be checked.
 * @returns The result of the check.
 */
function hasNumber(string) {
    return /\d/.test(string);
}

/**
 * Function to restrict user to stay in min max limit
 * @author Salman
 * @param {string} el The input to be checked.
 */
function imposeMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}

/**
 * show customer discounts popup according to shop or order
 * @param {string} id customer branch id which needs to be fetched
 */
const showCustomerDiscounts = async (id) => {
    event.preventDefault();

    let popup = $("#customerDiscountModal");

    // REQUEST FOR CUSTOMER DISCOUNTS MODAL
    Dashmix.block("state_loading", ".siteBlock");

    await axios
        .get(route(`dashboard.master.discounts.customer-discount.show`, id))
        .then(async ({ data }) => {
            popup.find(".modal-body form").html(data);
            popup.modal("show");
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: "Something went wrong. Please try again!",
            });
        })
        .then(() => Dashmix.block("state_normal", ".siteBlock"));
};

/**
 * Calculated customer discount according to type
 * TODO: Calculate Customer discount according to changed discount
 *  @param String type [invoice type id]
 */
const calculateDiscountReceivable = (type) => {
    // call restriction function
    // imposeMinMax(this);

    // act
    let discount = parseInt($(event.target).val()),
        price = parseInt(
            $(event.target).closest("tr").find(`[col="price_${type}"]`).text()
        ),
        receivable = $(event.target)
            .closest("tr")
            .find(`[col="receivable_${type}"]`);

    // if (discount > price) {
    //     Toast.fire({
    //         icon: "warning",
    //         title: `Discount (${discount}) cannot be greater then product price (${price}).`
    //     })
    //     $(event.target).val(0)
    //     return;
    // }
    if (isNaN(discount)) {
        discount = 0;
    }

    receivable.text(price - discount);
};

const storeCustomerDiscount = async () => {
    event.preventDefault();

    const formData = new FormData($("#discountForm")[0]);

    // CONFIRM AND SEND AJAX
    Swal2.fire({
        title: "Confirm",
        icon: "question",
        text: "Are you sure to update customer discount details?",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#e74c3c",
        confirmButtonText: "Yes, Update",
        showLoaderOnConfirm: true,
        preConfirm: async (data) => {
            return axios
                .post(
                    route(`dashboard.master.discounts.customer-discount.store`),
                    formData
                )
                .then(({ data }) => console.log(data))
                .catch((error) => {
                    Swal2.showValidationMessage(`Request failed: ${error}`);
                });
        },
        allowOutsideClick: () => !Swal2.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal2.fire(
                "Success",
                "Customer Discounts Updated Successfully!",
                "success"
            );
            $("#customerDiscountModal").modal("hide");
        }
    });
};

const printDiv = (id) => {
    var divToPrint = document.getElementById(id);
    var newWin = window.open("", "Print-Window");
    newWin.document.open();
    newWin.document.write(
        '<html><body onload="window.print()">' +
            divToPrint.innerHTML +
            "</body></html>"
    );
    newWin.document.close();

    setTimeout(function () {
        newWin.close();
    }, 10);
};

/**
 * @param FormData
 * @return update user password
 */
$(document).on("submit", "#passwordChangeForm", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    // send request
    Swal2.fire({
        title: "Confirm",
        icon: "question",
        text: "Are you sure to update password?",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#e74c3c",
        confirmButtonText: "Yes, Update",
        showLoaderOnConfirm: true,
        backdrop: true,
        preConfirm: async (data) => {
            return axios
                .post(route(`dashboard.password.update`), formData)
                .then((response) => {
                    $("#passwordChangeForm")[0].reset();
                    return response.data;
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        let messages = "";
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        });
                        Swal2.showValidationMessage(`${messages}`);
                    } else {
                        Swal2.showValidationMessage(`Request failed: ${error}`);
                    }
                });
        },
        allowOutsideClick: () => !Swal2.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal2.fire(
                "Action Status",
                "Password updated successfully!",
                "success"
            );
            window.location.reload();
        }
    });
});

/**
 * redirect user to customer ledger page and generate ledger with params automatically
 * @author Salman
 * @param int id Id of the customer branch
 * @param string name name of the customer branch
 */
const viewCustomerDetails = (id, name) => {
    window.open(
        route("dashboard.ledger.customerInvoiceProductResults", {
            customer_id: id,
            name: name,
        }),
        "_blank"
    );
};

const viewInvoiceDetails = (id, invoice_no) => {
    let popup = $("#invoiceDetailsModal");

    Dashmix.block("state_loading", ".siteBlock");
    popup.find(".modal-body").empty();

    axios
        .get(route("dashboard.invoices.show", id))
        .then((response) => {
            popup.find(".modal-title").text(`Invoice # ${invoice_no} Details`);
            popup.find(".modal-body").html(response.data);
            popup.modal("show");
        })
        .catch((error) => {
            $.notify("Something went wrong. Please try again!");
        })
        .then(() => {
            Dashmix.block("state_normal", ".siteBlock");
        });
};

const editInvoiceDetails = (id, invoice_no) => {
    event.preventDefault();

    let popup = $("#invoiceDetailsEditModal"),
        btn = $(event.target);

    popup
        .find(".modal-title")
        .html(`Editing Invoice no <b>"${invoice_no}"</b>`);
    flatpickr(".init-flatpicker");

    btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Fetching Info');

    axios
        .get(route(`api.invoices.getInvoiceDetails`, id))
        .then(({ data }) => {
            $("#invoiceDetailsEditModal")
                .find("#dispatcher")
                .val(data.dispatcher);
            $("#invoiceDetailsEditModal")
                .find("#edit_cash_received")
                .val(data.cash_received);
            $("#invoiceDetailsEditModal")
                .find("#edit_change_return")
                .val(data.change_return);
            $("#invoiceDetailsEditModal")
                .find("#edit_bottle_returned")
                .val(data.bottle_returned);
            $("#invoiceDetailsEditModal")
                .find("#edit_delivery_statuses")
                .val(data.status);
            $("#invoiceDetailsEditModal")
                .find("#invoiceDetailsEditForm")
                .attr("data-id", data.id);
            $(".init-flatpicker").each((indx, el) => {
                $(el).val(
                    data[$(el).attr("name")]
                        ? moment(data[$(el).attr("name")]).format("Y-M-D HH:mm")
                        : null
                );
            });
            popup.modal("toggle");
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\n${error}`,
            });
        })
        .then(() =>
            btn.html('<i class="fas fa-fw fa-pen mr-1"></i> Edit Changes')
        );
};

const invoiceDetailsEditForm = () => {
    event.preventDefault();

    let formData = new FormData($(event.target)[0]),
        id = $(event.target).attr("data-id"),
        btn = $('[form="invoiceDetailsEditForm"]'),
        popup = $("#invoiceDetailsEditModal");

    btn.html(`<i class="fas fa-sync-alt fa-spin mr-1"></i> Updating Invoice`);

    axios
        .post(route(`api.invoices.updateInvoiceDetails`, id), formData)
        .then(({ data }) => {
            Toast.fire({
                icon: "success",
                title: "Invoice updated successfully!",
            });
            popup.modal("hide");
            // * re-open invoice details popup
            viewInvoiceDetails(data.id, data.invoice_no);
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again.\n${error}`,
            });
        })
        .then(() =>
            btn.html(
                `<i class="fas fa-cloud-upload-alt mr-1"></i> Update Details`
            )
        );
};

const updateInvoiceEntries = (entry) => {
    removePreviousEdit();

    let tr = $(event.currentTarget);
    (quantity = tr.find(".quantity")),
        (product_price = tr.find(".product_price")),
        (discount_amount = tr.find(".discount_amount"));

    quantity.html(
        `<input type="number" class="form-control form-control-sm text-right" oninput="calculateEntry()" value="${quantity.attr(
            "data-value"
        )}" min="1" oninput="this.value = Math.abs(this.value)">`
    );
    product_price.html(
        `<input type="number" class="form-control form-control-sm text-right" oninput="calculateEntry()" value="${product_price.attr(
            "data-value"
        )}" min="1" oninput="this.value = Math.abs(this.value)">`
    );
    discount_amount.html(
        `<input type="number" class="form-control form-control-sm text-right" oninput="calculateEntry()" value="${discount_amount.attr(
            "data-value"
        )}" min="0" oninput="this.value = Math.abs(this.value)">`
    );

    $(".quick-btns").prop("hidden", false).find(".btn").attr("data-row", entry);
};

function removePreviousEdit() {
    $.each($(".invoice_entry_table tr"), (k, tr) => {
        if ($(tr).find("input").length > 0) {
            $.each($(tr).find("td"), (l, td) => {
                if ($(td).attr("data-value")) {
                    $(td).empty().text($(td).attr("data-value"));
                }
            });
            $(tr)
                .find('td[data-name="discount_amount"]')
                .text(
                    Number($(tr).find(".discount_amount").text()) *
                        Number($(tr).find(".quantity").text())
                );
            recalculateAmount();
        }
    });
}

/**
 * calculate changed entry values and amount
 */
const calculateEntry = () => {
    let tr = $(event.target).closest("tr"),
        quantity = tr.find(".quantity input").val(),
        product_price = tr.find(".product_price input").val(),
        discount_amount = tr.find(".discount_amount input").val(),
        amount = tr.find(".amount");

    tr.find('[data-name="discount_amount"]').text(
        Number(discount_amount) * Number(quantity)
    );
    amount.text(
        numeral(quantity * product_price - quantity * discount_amount).format(
            "0,0"
        )
    );

    recalculateAmount();
};

/**
 * @author Abdullah
 * recalculate all rows data
 */
function recalculateAmount() {
    let entries = [];

    $(".invoice_entry_table tbody tr").each((k, tr) => {
        $(tr)
            .find('td[scope="col"]')
            .each((key, td) => {
                let name = $(td).attr("data-name");

                if (name) {
                    if ($(td).find("input").length) {
                        entries[name] =
                            numeral($(td).find("input").val()).value() +
                            numeral(entries[name]).value();
                    } else {
                        entries[name] =
                            numeral($(td).text()).value() +
                            numeral(entries[name]).value();
                    }
                }
            });
    });

    entries["total"] = entries["amount"] + entries["discount_amount"];
    $(".invoice-total").text(numeral(entries["total"]).format("0,0"));
    $(".quantity_total").text(numeral(entries["quantity"]).format("0,0"));
    $(".invoice-discount").text(
        numeral(entries["discount_amount"]).format("0,0")
    );
    $(".invoice-due-price").text(numeral(entries["amount"]).format("0,0"));
}

const cancelEdit = () => {
    const entry = $(event.target).attr("data-row");

    let tr = $(`tr[data-row="${entry}"]`),
        quantity = Number(tr.find(".quantity").attr("data-value")),
        product_price = Number(tr.find(".product_price").attr("data-value")),
        discount_amount = Number(
            tr.find(".discount_amount").attr("data-value")
        ),
        amount = tr.find(".amount");

    $.each($(tr).find("td"), (l, td) => {
        if ($(td).attr("data-value")) {
            $(td).html($(td).attr("data-value"));
        }
    });

    tr.find('[data-name="discount_amount"]').text(quantity * discount_amount);
    amount.text(
        numeral(quantity * product_price - discount_amount * quantity).format(
            "0,0"
        )
    );
    // re-calculates all entries again
    recalculateAmount();
    // hide buttons
    $(".quick-btns").prop("hidden", true).find(".btn").attr("data-row", null);
};

const saveEdit = () => {
    event.preventDefault();

    let InvoiceEntry = $(event.target).attr("data-row"),
        tr = $(`tr[data-row="${InvoiceEntry}"]`),
        quantity = Number(tr.find(".quantity input").val()),
        product_price = Number(tr.find(".product_price input").val()),
        discount_amount = Number(tr.find(".discount_amount input").val()),
        btn = $(event.target);

    btn.prop("disabled", true).html(
        '<i class="fas fa-sync-alt fa-spin"></i> Saving...'
    );

    axios
        .patch(route(`dashboard.invoices.updateDetails`, InvoiceEntry), {
            quantity,
            product_price,
            discount_amount,
        })
        .then(({ data }) => {
            tr = $(`tr[data-row="${InvoiceEntry}"]`);
            (quantity = Number(tr.find(".quantity input").val())),
                (product_price = Number(tr.find(".product_price input").val())),
                (discount_amount = Number(
                    tr.find(".discount_amount input").val()
                )),
                tr.find(".quantity").empty().text(quantity);
            tr.find(".product_price").empty().text(product_price);
            tr.find(".discount_amount").empty().text(discount_amount);

            $(".quick-btns").prop("hidden", true);

            Toast.fire({
                icon: "success",
                title: data.message,
            });
        })
        .catch((error) => {
            Toast.fire({
                icon: "error",
                title: `Something went wrong. \nPlease try again! \n(${error})`,
            });
        })
        .then(() => btn.prop("disabled", false).html("Save"));
};

/**
 * generates a xlsx file with provided table id
 * @author Salman
 * @param {string} tableId table id which to be exported
 * @param {string} type type of extension which to be exported in
 * @param {string} filename filename of exporting table
 * @returns xlsx exported file
 */

const exportTableToExcel = (tableId, type, filename, fn, dl) => {
    var elt = document.getElementById(tableId);
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(wb, fn || filename + "." + (type || "xlsx"));
};

/**
 * add cell search capability within table
 *
 * @author Salman
 * @param {strong} tableId table which needs to be searched from
 * @param {int} index index of td which needs to be searched
 */
const searchTableCell = (table, index) => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = event.target;
    filter = input.value.toUpperCase();
    table = document.querySelector(table);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[index];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

/**
 * Get audits for specific type and id
 *
 * @param {int} auditable_id
 * @param {string} auditable_type
 * @author Salman
 */
const getModelAudits = (auditable_id, auditable_type) => {
    event.preventDefault();

    Snackbar.show({
        text: "System is fetching changes. Please wait",
        pos: "bottom-right",
    });

    let popup = $("#appModelAudits");

    axios
        .post(route(`dashboard.getModelAudits`), {
            filters: {
                auditable_id,
                auditable_type,
            },
        })
        .then(({ data }) => {
            popup.find(".modal-body").html(data.view);
            popup.modal("show");
        })
        .catch((error) => {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again later.\n${error}`,
            });
        })
        .then(() => Snackbar.close());
};

// Read a page's GET URL variables and return them as an associative array.
const getUrlVars = () => {
    var vars = [],
        hash;
    var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

/**
 * Animates count in div
 *
 * @param {Dom Element} obj
 * @param {Int} initVal starting value
 * @param {Int} lastVal  end value
 * @param {Int} duration time in millosecond to animate
 */
function countAnimate(obj, initVal, lastVal, duration = 1000) {
    let startTime = null;

    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    //pass the current timestamp to the step function
    const step = (currentTime) => {
        //if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime;
        }

        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime - startTime) / duration, 1);

        //calculate what to be displayed using the value gotten above
        $(obj).text(
            numeral(
                Math.floor(progress * (lastVal - initVal) + initVal)
            ).format("0,0")
        );

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };

    //start animating
    window.requestAnimationFrame(step);
}

function limiter(input) {
    let value = Number(input.value),
        max = Number(input.max),
        min = Number(input.min);

    if (min > value) {
        input.value = "";
        $(input).notify(`Value must be greater than ${min}`);
    } else if (max < value) {
        input.value = "";
        $(input).notify(`Value must be less than ${max}`);
    }
}
