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
        order: [[1, "asc"]],
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
            // {
            //     text: 'Add Customer',
            //     className: "btn btn-sm btn-primary",
            //     action: (e, dt, node, config) => {
            //         let assigned_cap = $('.assigned_cap'),
            //             remaining_cap = $('.remaining_cap'),
            //             total_customers = $('.total_customers');

            //         Swal2.fire({
            //             title: 'Add Customer',
            //             html: `
            //                 <div class="form-group text-left">
            //                     <select name="customer_branch_id" id="customer_branch_id" class='form-control' style="width:100%"></select>
            //                 </div>
            //             `,
            //             confirmButtonText: 'Add Customer',
            //             cancelButtonText: 'Cancel',
            //             confirmButtonColor: '#2ecc71',
            //             cancelButtonColor: '#d33',
            //             showCancelButton: true,
            //             allowOutsideClick: false,
            //             backdrop: true,
            //             showLoaderOnConfirm: true,
            //             allowOutsideClick: () => !Swal2.isLoading(),
            //             didOpen: () => {
            //                 $('#customer_branch_id').select2({
            //                     placeholder: 'Select Customer',
            //                     allowClear: true,
            //                     minimumInputLength: 2,
            //                     ajax: {
            //                         url: route('api.customers.index'),
            //                         dataType: 'json',
            //                         delay: 250,
            //                         cache: true,
            //                         data: function (params) {
            //                             return {
            //                                 _token: $('meta[name="csrf-token"]').attr('content'),
            //                                 q: params.term,
            //                             };
            //                         },
            //                         processResults: function (data, params) {
            //                             params.page = params.page || 1;

            //                             return {
            //                                 results: $.map(data, function (v, k) {
            //                                     return {
            //                                         id: v.id,
            //                                         text: v.text,
            //                                         html: v.html,
            //                                         title: v.title,
            //                                     }
            //                                 }),
            //                                 pagination: {
            //                                     more: (params.page * 10) < data.count_filtered
            //                                 }
            //                             };
            //                         },
            //                     },
            //                     escapeMarkup: function (markup) {
            //                         return markup;
            //                     },
            //                     templateResult: function (data) {
            //                         return data.html;
            //                     },
            //                     templateSelection: function (data) {
            //                         return data.text;
            //                     }
            //                 });
            //             },
            //             preConfirm: async () => {
            //                 let customer = $('#customer_branch_id').val();
            //                 await axios.post(route(`${path}.addCustomerInDetailSchedule`, [scheduleData.id, Number(customer)]))
            //                     .then(({ data }) => {
            //                         assigned_cap.text(Number(assigned_cap.text()) + data.quantity)
            //                         remaining_cap.text(Number(remaining_cap.text()) - data.quantity)
            //                         total_customers.text(Number(total_customers.text()) + 1)

            //                         Toast.fire({
            //                             icon: 'success',
            //                             title: `${data.message}`
            //                         })
            //                         dt.ajax.reload(null, false);
            //                         return data;
            //                     })
            //                     .catch(error => {
            //                         if (error.response.status == 422) {
            //                             let messages = '';
            //                             $.each(error.response.data.errors, (k, v) => {
            //                                 messages += `${v[0]} <br>`;
            //                             })
            //                             Swal2.showValidationMessage(
            //                                 `${messages}`
            //                             )
            //                         } else {
            //                             Swal2.showValidationMessage(
            //                                 `Request failed: ${error}`
            //                             )
            //                         }
            //                     })
            //             }
            //         })
            //     },
            // },
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
            },
            {
                data: "action",
                name: "action",
                className: "text-center",
                orderable: false,
                searchable: false
            },
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

    // Making TD editable exept td with action button
    $('body').on('dblclick', 'td.special_instructions', function () {
        // The cell that has been clicked will be editable
        $(this).attr('contenteditable', 'true');
        var el = $(this);
        // We put the cursor at the beginning 
        var range = document.createRange();
        var sel = window.getSelection();
        if (el[0].childNodes.length > 0) {
            range.setStart(el[0].childNodes[0], 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        // The cell have now the focus
        el.focus();

        $(this).blur(endEdition);
    });

    function endEdition() {
        // We get the cell 
        var el = $(this),
            rowData = dataTable.row(el).data();

        axios.post(route(`${path}.updateInstructions`, rowData.id), {
                value: el.text()
            })
            .then(response => {
                Snackbar.show({
                    text: 'Delivery note updated successfully.',
                    pos: "bottom-right",
                    backgroundColor: "#2ecc71",
                    textColor: "#fff",
                    actionTextColor: "#fff"
                });
            })
            .catch(error => $.notify(`Something went wrong. Please try again later.\n${error}`))

        el.attr('contenteditable', 'false');
        el.off('blur', endEdition); // To prevent another bind to this function
    }

    // row reorder event
    dataTable.on('row-reorder', (e, details) => {
        console.log(details)
        if (details.length) {

            let rows = [];
            details.forEach(element => {
                rows.push({
                    id: $(element.node).attr('id'),
                    position: element.newData,
                    status: dataTable.row(element.node).data().status.status
                });
            });


            axios.post(route(`${path}.reorder`), { rows })
                .then(() => dataTable.ajax.reload(null, false))
                .catch(error => {
                    console.error(error)
                    Toast.fire({
                        icon: 'error',
                        title: `Something went wrong.\nPlease try again later.\n${error}`
                    })
                })
        }
    });


    $('.siteDataTable tbody').on('dblclick', 'tr td:not(".special_instructions")', function () {
        let data = $('.siteDataTable').DataTable().row(this).data(),
            popup = $('#detailItemModal'),
            table = $('#scheduleProductsTable');

        if (data.schedule_delivery.status == 7) {
            $('.x-add-product').text('Order is Completed').prop('disabled', true);
        } else if (data.status.status == 0 || data.status.status == 2 || data.status.status == 3) {
            $('.x-add-product').html('<i class="fas fa-plus mr-1"></i> Add new Product').prop('disabled', false).attr('data-id', data.id);
        } else if (data.status.status == 4){
            $('.x-add-product').text('Order is Delivered').prop('disabled', true);
        } else if (data.status.status == 5){
            $('.x-add-product').text('Order is Un-Delivered').prop('disabled', true);
        } else {
            $('.x-add-product').text('Order is Removed').prop('disabled', true);
        }

        if (data.items) {

            let btnCheck = data.invoice_id ? true : (data.status.status == 5 ? true : (data.status.status == 4 ? true : (data.schedule_delivery.status == 7 ? true : false)));
            
            let rows = ``;
            //  * generate rows
            data.items.forEach((el, indx) => {
                rows += `
                    <tr data-detail="${el.id}">
                        <td align="center">${++indx}</td>
                        <td class="product_id">${el.product.name}</td>
                        <td align="center">
                            <input type="number" 
                                   value="${el.bottle_qty}" 
                                   class="bottle_qty ${!data.invoice_id ? 'product-quantity' : null} form-control form-control-sm bg-transparent border-0 w-100 rounded-0 text-center"
                                   readonly="true"
                                />
                        </td>
                        <td class="bottle_rate" align="center">${el.bottle_rate}</td>
                        <td class="bottle_amount" align="right">${numeral(el.bottle_qty * el.bottle_rate).format('0,0')}</td>
                        <td align="center">${el.modified_by ? el.modified_by.name : '—'}</td>
                        <td align="center" ${data.invoice_id ? 'title="You cannot remove this product as this is orignally from invoice." style="cursor: not-allowed"' : null}>
                            <button class="btn btn-sm btn-link" ${btnCheck ? 'disabled' : `onclick="deleteProduct(${el.id}, ${data.id})"`}>
                                <i class="fas fa-times text-danger"></i>
                            </button>
                        </td>
                    </tr>
                `;
            })
            // * append in table body
            table.find('tbody').html(rows)
            $('[data-toggle="tooltip"]').tooltip()
            // * append in table footer
            let total_qty = data.items.reduce((s, { bottle_qty }) => {
                return s = s + bottle_qty;
            }, 0);

            let total_amount = data.items.reduce((s, el) => {
                return s = s + (el.bottle_qty * el.bottle_rate);
            }, 0);

            table.find('tfoot').html(`
                <tr>
                    <th></th>
                    <th></th>
                    <th class="v-middle text-center">${total_qty || 0}</th>
                    <th></th>
                    <th class="v-middle text-right">${total_amount || 0}</th>
                    <th></th>
                    <th></th>
                </tr>
            `)
        }

        // TODO: is order is canceled than show reason and remarks
        if (data.status.status == 5) { 
            popup.find('.reasons-div').html(`
                <label class="mb-0 font-size-sm font-w700">Order Cancel Reason:</label>
                <p class="mb-2 font-size-sm">${data.reason.display}</p>
                <label class="mb-0 font-size-sm font-w700">Remarks:</label>
                <p class="mb-2 font-size-sm">${data.remarks || 'No remarks given...'}</p>
                
            `)
        } else {
            popup.find('.reasons-div').html(null)
        }

        popup.modal('show');
    });

    // TODO: add new product
    $(document).on('click', '.x-add-product', event => {
        event.preventDefault();

        let id = $(event.target).data('id');

        Swal2.fire({
            title: 'Add Product',
            html: `
                <div class="mb-1 text-left">
                    <label for="product_id" class="font-sm float-left">Select Product:<i class="text-danger">*</i></label>
                    <select name="product_id" id="product_id" class='form-control' style="width:100%"></select>
                </div>
            `,
            confirmButtonText: 'Add Product',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            didOpen: () => {
                $('#product_id').select2({
                    placeholder: 'Select Product',
                    allowClear: true,
                    cache: true,
                    ajax: {
                        url: route('api.getAllProducts'),
                        dataType: 'json',
                        delay: 250,
                        cache: true,
                        data: function (params) {
                            return {
                                _token: $('meta[name="csrf-token"]').attr('content'),
                                q: params.term,
                            };
                        },
                        processResults: function (data) {
                            return {
                                results: $.map(data, function (v, k) {
                                    return {
                                        id: k,
                                        text: v,
                                    }
                                })
                            };
                        }
                    }
                });
            },
            preConfirm: async () => {
                let product = $('#product_id').val();
                await axios.post(route(`${path}.addNewProduct`, [id, product]))
                    .then(({ data }) => {
                        // re-open popup
                        $('#detailItemModal').modal('hide')
                        // reload dataable
                        $(".siteDataTable").DataTable().ajax.reload(null, false);
                        Toast.fire({
                            icon: 'success',
                            title: `${data.message}`
                        })
                        return data;
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            let messages = '';
                            $.each(error.response.data.errors, (k, v) => {
                                messages += `${v[0]} <br>`;
                            })
                            Swal2.showValidationMessage(
                                `${messages}`
                            )
                        } else {
                            Swal2.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        }
                    })
            }
        })
    })

    // TODO: Product table quantity edit
    $('#scheduleProductsTable').on('dblclick', '.product-quantity', function () {
        // The cell that has been clicked will be editable
        $(this).attr('readonly', false);
        var el = $(this);
        // We put the cursor at the beginning 
        var range = document.createRange();
        var sel = window.getSelection();
        if (el[0].childNodes.length > 0) {
            range.setStart(el[0].childNodes[0], 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        // The cell have now the focus
        el.focus();

        $(this).blur(endProductEdition);
    });

    $('#scheduleProductsTable').on('input', '.bottle_qty', e => {
        e.preventDefault();
        let scheduleTable = $('.scheduleTable');
        $.each(scheduleTable.find('tbody tr'), (k, el) => {
            let qty = Number($(el).find('.bottle_qty').val());
            let rate = numeral($(el).find('.bottle_rate').text()).value();

            let amount = 0;
            amount = qty * rate;
            $(el).find('.bottle_amount').text(numeral(amount).format('0,0'));
        })
    });

    function endProductEdition(e) {
        e.preventDefault();
        var el = $(this);
        let id = el.parents('tr').attr('data-detail');
        let bottle_qty = numeral(el.parents('tr td').find('.bottle_qty').val()).value();
        axios.post(route(`${path}.updateDeliveryDetailItem`, id), {
            bottle_qty
        })
            .then(response => {
                $('#detailItemModal').modal('toggle');
                location.reload()
                // show message
                Toast.fire({
                    icon: 'success',
                    title: 'Delivery saved successfully'
                })
            })
        el.attr('readonly', 'true');
        el.off('blur', endProductEdition); // To prevent another bind to this function
    }



    // * chart js
    Highcharts.chart('percentage-bar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Schedule Plan Chart'
        },
        xAxis: {
            categories: ['Delivery Plan']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total delivered comparison'
            }
        },
        legend: {
            reversed: true
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            series: {
                stacking: 'percent',
            }
        },
        series: [{
            name: 'Scheduled',
            data: [scheduleData.items.filter(item => item.product_id == 8).reduce((carry, item) => carry += item.bottle_qty, 0)]
        }, {
            name: 'Completed',
            data: [scheduleData.items.filter(item => item.product_id == 8).reduce((carry, item) => carry += item.actual_bottle_qty, 0)]
        }]
    });

})

const removeCustomerFromList = (id) => {
    event.preventDefault();

    let assigned_cap = $('.assigned_cap'),
        remaining_cap = $('.remaining_cap'),
        total_customers = $('.total_customers');

    Swal2.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#e74c3c',
        confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Dashmix.block('state_loading', '.siteBlock')

            axios.delete(route(`${path}.removeCustomerFromList`, id))
                .then(({ data }) => {
                    if (data.success) {
                        let row = dataTable.row(`#${id}`).data(),
                            total_row_qty = row.items.reduce((carry, { bottle_qty }) => {
                                return carry = carry + bottle_qty;
                            }, 0);

                        assigned_cap.text(Number(assigned_cap.text()) - total_row_qty)
                        remaining_cap.text(Number(remaining_cap.text()) + total_row_qty)
                        total_customers.text(Number(total_customers.text()) - 1)

                        $(".siteDataTable").DataTable().ajax.reload(null, false);

                        Toast.fire({
                            title: data.message,
                            icon: 'success'
                        })
                    } else {
                        Swal2.fire({
                            icon: 'warning',
                            title: 'Warning',
                            text: data.message,
                            confirmButtonColor: '#e74c3c',

                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    Toast.fire({
                        title: 'Something went wrong. Please try again!',
                        icon: 'error'
                    })
                })
                .then(() => Dashmix.block('state_normal', '.siteBlock'))
        }
    })
}

/**
 * TODO: detail detail item from database
 * @param {int} id detail item id 
 */
const deleteProduct = (id, rowId) => {
    event.preventDefault();
    let btn = $(event.target);
    try {
        btn.html(`<i class="fas fa-cog fa-spin text-muted"></i>`)

        axios.delete(route(`${path}.deleteProduct`, id))
            .then(async ({ data }) => {
                $(`[data-detail="${id}"]`).remove();
                await $(".siteDataTable").DataTable().ajax.reload(null, false);
                $('#detailItemModal').modal('toggle')
                Toast.fire({
                    icon: "success",
                    title: "Product removed successfully."
                })
            })
            .catch(error => {
                console.error(error)
                btn.html(`<i class="fas fa-times text-danger"></i>`)
                Toast.fire({
                    icon: 'error',
                    title: `Something went wrong.\nPlease try again later.\n${error}`
                })
            })
    } catch (error) {
        console.error(error)
        btn.html(`<i class="fas fa-times text-danger"></i>`)
    }
}

// ********* DELIVERY ORDER COMPLETE FUNCTIONS *********
const validateForm = (formId) => {
    var form_validated = true;
    var fields = document.getElementsByClassName('item-required');
    var message = "Form cannot be saved. Following required fields are empty:"
    $.each(fields, function (i, field) {
        if (!field.hidden && !field.value && !field.parentNode.hidden) {
            message += "\r\n" + field.attributes.errorlabel.value;
            form_validated = false;
        }

    });
    if (!form_validated) {
        $.notify(message, "error");
    }
    return form_validated;
}

$(document).on('change', '#delivery_status', function () {
    event.preventDefault();

    let status = $(this).val();

    if (status == 1) { // order is delivered
        $('.status_delivery').prop('hidden', false)
        $('.status_not_delivery').prop('hidden', true)
    } else if (status == 0) { // order is not delivered
        $('.status_delivery').prop('hidden', true)
        $('.status_not_delivery').prop('hidden', false)
    }
})

$(document).on('submit', '#completeDeliveryForm', function () {
    event.preventDefault();

    if (validateForm('completeDeliveryForm')) {
        let formData = new FormData($(event.target)[0])
            customerDeliveryDetail = $(event.target).attr('data-id'),
            form = $(event.target)[0];

        Swal2.fire({
            icon: 'question',
            title: 'Delivery Completion',
            html: `Are you sure to complete this delivery?`,
            confirmButtonText: 'Complete Delivery',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                await axios.post(route(`${path}.completeDeliveryOrder`, customerDeliveryDetail), formData)
                    .then(({ data }) => {
                        // hide popup
                        $('#completeDeliveryModal').modal('hide')
                        // reset form
                        form.reset();

                        $('#delivery_status').trigger('change')
                        // reload dataable
                        $(".siteDataTable").DataTable().ajax.reload(null, false);
                        // show toast
                        Swal2.fire({
                            icon: 'success',
                            title: 'Delivery Completed',
                            html: `${data.message}`,
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#2ecc71'
                        })
                        return data;
                    })
                    .catch(error => {
                        console.error(error)
                        if (error.response.status == 422) {
                            let messages = '';
                            $.each(error.response.data.errors, (k, v) => {
                                messages += `${v[0]} <br>`;
                            })
                            Swal2.showValidationMessage(
                                `${messages}`
                            )
                        } else {
                            Swal2.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        }
                    })
            }
        })
    }
})



// TODO: upadate schedule delivery header details
$(document).on('click', '.x-edit-schedule', function() {
    event.preventDefault();

    Dashmix.block('state_loading', '.siteBlock')

    let popup = $('#editScheduleDeliveryModal'),
        btn   = $(this),
        id    = btn.attr('data-id');


    // TODO: fetch schedule delivery details
    axios.get(route(`${path}.edit`, id))
        .then(({data}) => {

            $('#editScheduleDeliveryForm').attr('data-id', id)
            
            popup.modal('toggle')

            $('#helper_ids').empty().trigger('change')

            $('#dispatcher_id').append(new Option(data.dispatcher_user.name, data.dispatcher, true, true))
            $('#vehicle_id').append(new Option(`${data.vehicle.manufacturer} (${data.vehicle.plate_no})`, data.vehicle.id, true, true))

            let helpers = [];
            $.each(data.helper_users, (k, v) => {
                helpers[k] = new Option(v.name, v.id, true, true)
            })
            $('#helper_ids').append(helpers)

            $('.edit_normal_cap').text(data.vehicle.capacity)
            $('.edit_max_cap').text(data.vehicle.max_capacity)
            $('.edit_assigned_cap').text(data.items[0].total_qty)
            $('.edit_remaining_cap').text(data.vehicle.max_capacity - data.items[0].total_qty)
        })
        .catch(error => {
            console.error(error)
            Toast.fire({
                icon: "error",
                title: `Something went wrong.\nPlease try again later.\n${error}`
            })
        })
        .then(() => Dashmix.block('state_normal', '.siteBlock'))
})


$(document).on('change', '#vehicle_id', (event) => {
    event.preventDefault();

    Dashmix.block('state_loading', '.siteBlock')
    let vehicle = $(event.target).val();

    if (vehicle) {
        axios.get(route('api.getVehicleInfo', vehicle))
            .then(({ data }) => {
                let assigned = Number($('.edit_assigned_cap').text());
                $('.edit_normal_cap').text(data.capacity)
                $('.edit_max_cap').text(data.max_capacity)
                $('.edit_remaining_cap').text(data.max_capacity - assigned)

                if (data.max_capacity < assigned) {
                    $('.warnings').html(`
                        <div class="alert alert-warning d-flex align-items-center mb-0 p-2" role="alert">
                            <div class="flex-00-auto">
                                <i class="fa fa-fw fa-exclamation-triangle fa-3x" style="opacity: 0.5;"></i>
                            </div>
                            <div class="flex-fill ml-3">
                                <h3 class="alert-heading font-size-h6 m-0 font-w700">Warning</h3>
                                <p class="mb-0 font-sm">Assigned quantity <b class="font-w700">(${assigned})</b> is more then vehicle max capacity <b class="font-w700">(${data.max_capacity})</b>.<br>If continue, remaining customers will be removed.</p>
                            </div>
                        </div>
                    `)
                } else {
                    $('.warnings').empty();
                }
            })
            .catch(error => {
                console.error(error)
                Toast.fire({
                    icon: 'error',
                    title: `Something went wrong.\nPlease try again later.\n${error}`
                })
            })
            .then(() => Dashmix.block('state_normal', '.siteBlock'))
    }
})


// TODO: update editScheduleDeliveryForm 
$(document).on('submit', '#editScheduleDeliveryForm', function() {
    event.preventDefault();

    let form     = $(this),
        id       = form.attr('data-id');
        

    Swal2.fire({
        icon: 'question',
        title: 'Are you sure?',
        html: `
            <span>You won't be able to revert these changes?</span>
            <div class="form-group text-left mt-2">
                <label>Reason:<i class="text-danger">*</i></label>
                <textarea class="form-control form-update-reason" rows="4" placeholder="Required: Please enter reason why are you updating these fields?" required></textarea>
            </div>
        `,
        confirmButtonText: 'Yes, Continue',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            // TODO: add reason in payload
            let reason = $('.form-update-reason').val();
                if(!reason) {
                    Swal2.showValidationMessage(
                        `Please enter reason in order to update.`
                    )
                    return false;
                }
            let payload = {
                'dispatcher': form.find('#dispatcher_id').val(),
                'helpers': form.find('#helper_ids').val(),
                'vehicle': form.find('#vehicle_id').val(),
                "reason":  reason
            };

            // TODO: send payload to server
            await axios.put(route(`${path}.update`, id), payload)
                .then(({ data }) => {
                    // hide popup
                    $('#editScheduleDeliveryModal').modal('hide')                                                                     
                    // reset form
                    form[0].reset();

                    // reload dataable
                    $(".siteDataTable").DataTable().ajax.reload(null, false);
                    // show toast
                    Swal2.fire({
                        icon: 'success',
                        title: 'Action Status',
                        html: `${data.message}`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#2ecc71'
                    })
                    return data;
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.status == 422) {
                        let messages = '';
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        })
                        Swal2.showValidationMessage(
                            `${messages}`
                        )
                    } else {
                        Swal2.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    }
                })
        }
    })
})




const showMeterReadings = scheduleDelivery => {
    event.preventDefault();

    Dashmix.block('state_loading', '.siteBlock')

    axios.get(route(`api.getDeliveryScheduleInfo`, scheduleDelivery))
        .then(({data}) => {
            let startAttachment = data.attachments.filter(item => { // get lastest start object from attachments
                let json = JSON.parse(item.misc);
                return json.type == 'meter_reading_start';
            });
            startAttachment = startAttachment.slice(-1)[0];
            
            let endAttachment = data.attachments.filter(item => { // get lastest end object from attachments
                let json = JSON.parse(item.misc);
                return json.type == 'meter_reading_end';
            });
            endAttachment = endAttachment.slice(-1)[0] || null;
            
            Swal2.fire({
                html: `
                    <div class="form-group mt-3">
                        <div class="clearfix p-2 border mb-3">
                            <b class="float-left font-size-sm text-primary font-w700">Start Meter Reading:</b>
                            <b class="float-right">${data.meter_reading_start || 'N/A'}</b>
                            
                            <a href="/storage/${startAttachment ? startAttachment.path : 'default.png'}" target="_blank" class="float-none">
                                <img class="mt-3 img-fluid mw-100" src="/storage/${startAttachment ? startAttachment.path : 'default.png'}" style="cursor: zoom-in;" alt="Meter Reading Start"/>
                            </a>
                        </div>
                        
                        <div class="clearfix p-2 border mb-3">
                            <b class="float-left font-size-sm text-primary font-w700">End Meter Reading:</b>
                            <b class="float-right">${data.meter_reading_end || 'N/A'}</b>
                            <a href="/storage/${endAttachment ? endAttachment.path : 'default.png'}" target="_blank" class="float-none">
                                <img class="mt-3 img-fluid mw-100" src="/storage/${endAttachment ? endAttachment.path : 'default.png'}" style="cursor: zoom-in;" alt="Meter Reading End"/>
                            </a>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Close',
                confirmButtonColor: '#9b9b9b'

            })
        })
        .catch(error => {
            console.error(error)
            Toast.fire({
                icon: 'error',
                title: `Something went wrong.\nPlease try again later.\n${error}`
            })
        })
        .then(() => Dashmix.block('state_normal', '.siteBlock'))
}


const verifyScheduleDelivery = scheduleDelivery => {
    event.preventDefault();

    let bottlePercentage = parseFloat((scheduleData.items.filter(item => item.product_id == 8).reduce((carry, item) => carry = carry + item.returned_bottle_qty, 0) / scheduleData.items.filter(item => item.product_id == 8).reduce((carry, item) => carry = carry + item.bottle_qty, 0)) * 100).toFixed(2),
        cashPercentage = parseFloat((scheduleData.details.reduce((carry, item) => carry = carry + item.cash_received, 0) / scheduleData.items.reduce((carry, item) => carry = carry + (item.bottle_rate * item.bottle_qty), 0)) * 100).toFixed(2);

    Swal2.fire({
        title: '<h4 class="font-w700 mb-0">Verify & Complete Schedule</h4>',
        html: `
            <div class="form-row">

                <div class="col-md-12 clearfix mb-2">
                    <b class="float-left font-size-sm font-w700 text-primary">Bottle Percentage:</b>
                    <b class="float-right font-size-sm font-w700">${bottlePercentage || 'N/A'}%</b>
                </div>
                
                <div class="col-md-12 clearfix mb-2">
                    <b class="float-left font-size-sm font-w700 text-primary">Cash Percentage:</b>
                    <b class="float-right font-size-sm font-w700">${cashPercentage || 'N/A'}%</b>
                </div>
                
                <div class="col-md-12 clearfix mb-2">
                    <b class="float-left font-size-sm font-w700 text-primary">Delivered Orders:</b>
                    <b class="float-right font-size-sm font-w700">${scheduleData.details.filter(item => item.status == 4).length || 'N/A'}</b>
                </div>
                
                <div class="col-md-12 clearfix mb-2">
                    <b class="float-left font-size-sm font-w700 text-primary">Un-Delivered Orders:</b>
                    <b class="float-right font-size-sm font-w700">${scheduleData.details.filter(item => item.status == 5).length || 'N/A'}</b>
                </div>

                <hr class="my-2">

                <div class="col-md-12 text-left mt-2">
                    <label for="form_meter_reading_end" class="font-size-sm">End Meter Reading:<i class="text-danger">*</i></label>
                    <input type="number" id="form_meter_reading_end" class="form-control font-w700 text-dark" min="${scheduleData.meter_reading_start || ''}" placeholder="${scheduleData.meter_reading_start || ''}" required>
                </div>
                
                <div class="col-md-12 text-left mt-2">
                    <label for="form_arrival_time" class="font-size-sm">Arrival Time:<i class="text-danger">*</i></label>
                    <input type="time" id="form_arrival_time" class="form-control font-w700 text-dark" required>
                </div>
            
                <div class="text-left col-md-6 mt-2">
                    <label for="form_filled_bottle_returned" class="font-size-sm">Filled Bottle Returned:<i class="text-danger">*</i></label>
                    <input type="number" id="form_filled_bottle_returned" class="form-control font-w700 text-dark" required>
                </div>

                <div class="text-left col-md-6 mt-2">
                    <label for="form_empty_bottle_returned" class="font-size-sm">Empty Bottle Returned:<i class="text-danger">*</i></label>
                    <input type="number" id="form_empty_bottle_returned" class="form-control font-w700 text-dark" required>
                </div>
            
                <div class="col-md-12 text-left mt-2">
                    <label for="form_cash_deposited" class="font-size-sm">Cash Deposited:<i class="text-danger">*</i></label>
                    <input type="number" id="form_cash_deposited" class="form-control font-w700 text-dark" required>
                </div>
                
                <div class="col-md-12 text-left mt-2">
                    <label class="font-size-sm" for="form_remarks">Remarks:</label>
                    <textarea class="form-control" id="form_remarks" rows="4" placeholder="Optional: Please enter remarks for this delivery schedule..."></textarea>
                </div>

            </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            // TODO: add reason in payload
            let payload = {
                meter_reading_end: $('#form_meter_reading_end').val(),
                arrival_time: $('#form_arrival_time').val(),
                filled_bottle_returned: $('#form_filled_bottle_returned').val(),
                empty_bottle_returned: $('#form_empty_bottle_returned').val(),
                cash_deposited: $('#form_cash_deposited').val(),
            };
            
            await Swal2.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#2ecc71',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Verify',
                allowOutsideClick: false,
                backdrop: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal2.isLoading(),
                preConfirm: async () => {
                    await axios.post(route(`${path}.completeDeliverySchedule`, scheduleDelivery), payload)
                        .then(async ({ data }) => {
                            // show toast
                            await Swal2.fire({
                                icon: 'success',
                                title: 'Action Status',
                                html: `${data.message}`,
                                confirmButtonText: 'Continue',
                                allowOutsideClick: false,
                                confirmButtonColor: '#2ecc71'
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        })
                        .catch(error => {
                            console.error(error)
                            if (error.response.status == 422) {
                                let messages = '';
                                $.each(error.response.data.errors, (k, v) => {
                                    messages += `${v[0]} <br>`;
                                })
                                Swal2.showValidationMessage(
                                    `${messages}`
                                )
                            } else {
                                Swal2.showValidationMessage(
                                    `Request failed: ${error}`
                                )
                            }
                        })
                }
            })
            // TODO: send payload to server
            
        }
    })
}

const checkIfCustomerExist = (schedule, customer) => {
    return new Promise((resolve, reject) => {

        Snackbar.show({
            text: "Please wait while system verify customer details.",
            pos: "bottom-right",
            showAction: false
        });

        axios.post(route(`${path}.checkForCustomerInSchedule`, [schedule, customer]))
            .then(({ data }) => {
                if (!data.success) {
                    Swal2.fire({
                        title: 'Warning',
                        html: data.message,
                        icon: 'warning',
                        showCancelButton: true,
                        reverseButtons: true,
                        confirmButtonColor: '#2ecc71',
                        cancelButtonColor: '#e74c3c',
                        confirmButtonText: 'Yes, Continue'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            resolve(data);
                        }
                    })
                } else {
                    resolve(data.message);
                }
            })
            .catch(err => {
                reject(err);
            })
    });
}

$(document).on('click', '.btn-add-customer', function (event) {
    event.preventDefault();

    let filled_bottles = $(event.target).attr('data-filled');

    Swal2.fire({
        title: 'Add Customer',
        html: `
            <div class="container-fluid">
                <div class="form-row">
                    <div class="col-md-12 mb-1 customerScheduleInfo" hidden="true">
                        <div class="clearfix mb-1">
                            <b class="float-left font-size-sm font-w700 text-primary">Schedule Quantity:</b>
                            <b class="float-right font-size-sm font-w700 schedule_delivery"></b>
                        </div>
                        
                        <div class="clearfix mb-1">
                            <b class="float-left font-size-sm font-w700 text-primary">Last Delivery Date:</b>
                            <b class="float-right font-size-sm font-w700 last_delivery_date"></b>
                        </div>
                    </div>
                    
                    <div class="col-md-12 mb-1 text-left">
                        <label for="popup_customer_branch_id" class="font-sm mb-0">Customer:<i class="text-danger">*</i></label>
                        <select id="popup_customer_branch_id" class='form-control form-control-sm font-sm' style="width:100%"></select>
                    </div>

                    <div class="col-md-6 mb-1 text-left">
                        <label for="popup_actual_bottle_qty" class="font-sm mb-0">Bottle Quantity:<i class="text-danger">*</i></label>
                        <input type="number" id="popup_actual_bottle_qty" class="form-control form-control-sm item-required" min="0" max="${filled_bottles}" oninput="this.value = Math.abs(this.value)" errorlabel="Bottle Quantity">
                    </div>

                    <div class="col-md-6 mb-1 text-left">
                        <label for="popup_returned_bottle_qty" class="font-sm mb-0">Returned Bottle Quantity:<i class="text-danger">*</i></label>
                        <input type="number" id="popup_returned_bottle_qty" class="form-control form-control-sm item-required" min="0" oninput="this.value = Math.abs(this.value)" errorlabel="Returned Bottle Quantity">
                    </div>
    
                    <div class="col-md-12 mb-1 text-left">
                        <label for="popup_cash_received" class="font-sm mb-0">Cash Received:<i class="text-danger">*</i></label>
                        <input type="number" id="popup_cash_received" class="form-control form-control-sm item-required" min="0" oninput="this.value = Math.abs(this.value)" errorlabel="Cash Received">
                    </div>
                </div>
            </div>
        `,
        confirmButtonText: 'Add Customer',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        didOpen: () => {
            $('#popup_customer_branch_id').select2({
                placeholder: 'Select Customer',
                allowClear: true,
                minimumInputLength: 2,
                ajax: {
                    url: route('api.customers.index'),
                    dataType: 'json',
                    delay: 250,
                    cache: true,
                    data: function (params) {
                        return {
                            _token: $('meta[name="csrf-token"]').attr('content'),
                            q: params.term,
                            schedule: scheduleData ? JSON.stringify({
                                id: scheduleData.id,
                                source: scheduleData.delivery_source,
                                schedule: scheduleData.delivery_schedule
                            }) : null
                        };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;

                        return {
                            results: $.map(data, function (v, k) {
                                return {
                                    id: v.id,
                                    text: v.text,
                                    html: v.html,
                                    title: v.title,
                                }
                            }),
                            pagination: {
                                more: (params.page * 10) < data.count_filtered
                            }
                        };
                    },
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
                templateResult: function (data) {
                    return data.html;
                },
                templateSelection: function (data) {
                    return data.text;
                }
            });
        },
        preConfirm: async () => {
            let data = {
                customerBranch:      $('#popup_customer_branch_id').val(),
                actual_bottle_qty:   $('#popup_actual_bottle_qty').val(),
                returned_bottle_qty: $('#popup_returned_bottle_qty').val(),
                cash_received:       $('#popup_cash_received').val(),
            };

            // if (Number(data.actual_bottle_qty) > Number(filled_bottles)) {
            //     Swal2.showValidationMessage(`Actual bottle quantity (${data.actual_bottle_qty}) must be less than filled bottle quantity (${Number(filled_bottles)}).`)
            //     return;
            // }

            await checkIfCustomerExist(scheduleData.id, data.customerBranch)
                .then(async (message) => {
                    await axios.post(route(`${path}.addCustomerInDetailSchedule`, [scheduleData.id, Number(data.customerBranch)]), data)
                        .then(({ data }) => {
                            Swal2.fire({
                                title: 'Success',
                                icon: 'success',
                                html: data.message,
                                confirmButtonText: 'Done',
                                showCancelButton: false,
                                allowOutsideClick: false,
                                confirmButtonColor: '#2ecc71'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                })

                            return data;
                        })
                        .catch(error => {
                            if (error.response.status == 422) {
                                let messages = '';
                                $.each(error.response.data.errors, (k, v) => {
                                    messages += `${v[0]} <br>`;
                                })
                                Swal2.showValidationMessage(
                                    `${messages}`
                                )
                            } else {
                                Swal2.showValidationMessage(
                                    `Request failed: ${error}`
                                )
                            }
                        })
                })
                .catch(error => {
                    Swal2.showValidationMessage(
                        `Request failed: ${error}`
                    )
                    console.error(error)
                })            
        }
    })
})


$(document).on('change', '#popup_customer_branch_id', function (event) {
    event.preventDefault();

    let div = $('.customerScheduleInfo'),
        customer = event.target.value;

        div.prop('hidden', true);

        axios.get(route(`api.customers.customerLedgerInfo`, customer))
            .then(({data}) => {
                div.find('.schedule_delivery').text(data.schedule_delivery);
                div.find('.last_delivery_date').text(data.last_paid_date);
                div.prop('hidden', false);
            })
            .catch(error => {
                console.error(error)
                div.prop('hidden', true);
            })    
})


var map;

const initializeInvoiceMap = (cords) => {
    var marker = new google.maps.Marker({
        position: cords,
        animation: google.maps.Animation.DROP
    });

    let shopMarker = new google.maps.Marker({
        position: new google.maps.LatLng(31.4385223, 74.2832543),
        map,
        icon: '/assets/media/svg/store.png',
        animation: google.maps.Animation.DROP
    });

    var infowindow = new google.maps.InfoWindow({
        content: "Delivered Location",
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
        });
    });

    var mapProp = {
        center: cords,
        zoom: 15,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("invoiceMap"), mapProp);
    marker.setMap(map);
    shopMarker.setMap(map);
}


const invoiceLocation = async (latitude, longitude) => {
    var latlng = new google.maps.LatLng(latitude, longitude);
    initializeInvoiceMap(latlng);
    google.maps.event.trigger(map, 'resize');
    $('#invoiceCreationLocationModal').modal('toggle');
}