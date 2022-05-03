var path = 'dashboard.reports.delivery-process',
    routePath = 'dashboard.reports.scheduleDelivery';

var dataTable;


jQuery.fn.dataTable.Api.register('sum()', function () {
    return this.flatten().reduce(function (a, b) {
        if (typeof a === 'string') {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if (typeof b === 'string') {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }

        return a + b;
    }, 0);
});

$(document).ready(function () {
    // filter data
    $('.x-btn-filter').on('click', (e) => {
        e.preventDefault();

        if (!$('#vehicle_id').val()) {
            $('.vehicle_div').notify('Please select vehicle first.', {
                position: 'bottom middle',
                className: 'warn'
            });
            return false;
        }

        let btn = $(e.target),
            filters = {
                'delivery_source': $('#delivery_source').val(),
                'delivery_date': $('#delivery_date').val(),
                'status': $('#status').val()
            },
            popup = $('#printPdf');

        $('.dynamic-div').empty();
        btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Processing...').prop('disabled', true)

        axios.post(route(`${path}.fetchScheduleCustomer`), filters)
            .then(({ data }) => {

                renderQuickInfo((data.counts.customers || 0), data.counts.quantity || 0);
                
                $('#customer_id').prop('disabled', false)
                $('.dynamic-div').html(atob(data.view))
                $('.siteDataTable thead tr')
                    .clone(true)
                    .addClass('filters bg-gray-light')
                    .appendTo('.siteDataTable tfoot');

                dataTable = $(".siteDataTable").DataTable({
                    responsive: true,
                    colReorder: true,
                    rowReorder: {
                        selector: '.reorder',
                        snapX: 10
                    },
                    orderMulti: true,
                    select: {
                        style: 'os',
                        blurable: false,
                        selector: 'td:first-child',
                        style: 'multi'
                    },
                    order: [
                        [7, 'asc'],
                        [6, 'asc'],
                        [5, 'asc'],
                    ],
                    fixedHeader: {
                        header: true,
                        headerOffset: $('.content-header').height() - 8
                    },
                    colResize: {
                        isEnabled: true,
                        hoverClass: 'dt-colresizable-hover',
                        hasBoundCheck: true,
                        minBoundClass: 'dt-colresizable-bound-min',
                        maxBoundClass: 'dt-colresizable-bound-max',
                    },
                    columnDefs: [
                        {
                            targets: [12],
                            render: $.fn.dataTable.render.number(',')
                        },
                        {
                            targets: 0,
                            orderable: false,
                            searchable: false,
                            className: 'select-checkbox',
                        },
                        {
                            targets: 1,
                            orderable: false,
                            searchable: false,
                            visible: false
                        },
                        {
                            targets: 17,
                            orderable: false,
                            searchable: false,
                            visible: false
                        },
                        {
                            targets: [13],
                            type: 'date-dd-mmm-yyyy'
                        },
                    ],
                    buttons: [
                        { extend: "pageLength", className: "btn btn-sm btn-primary" },
                        { extend: "colvis", className: "btn btn-sm btn-primary" },
                        {
                            text: "Select All",
                            className: "btn btn-sm btn-primary",
                            exportOptions: {
                                columns: ':visible'
                            },
                            action: function (e, dt, node, config) {
                                $.notify('Please wait...', 'message');

                                let max = Number($('.max_cap').text());
                                    dt.rows().select();
                                // ! FIXME: this is a commented in order to add customers outside the range
                                    // qty = 0,
                                    // data = dt.rows({ search: 'applied' }).every(function (i) {
                                    //     let invoiceQty = numeral(dt.cell(i, 10).data()).value();
                                    //     if ((max > qty) && invoiceQty != 0) {
                                    //         this.select();
                                    //         qty = qty + invoiceQty;
                                    //     } else {
                                    //         return false;
                                    //     }
                                    // });

                                let selected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0),
                                    remaining = max - selected;

                                if (remaining > 0) {
                                    updateTitleCapacity(selected, (max - selected));
                                } else {
                                    updateTitleCapacity(selected, 0);
                                }
                            }
                        },
                        {
                            extend: "selectNone",
                            className: "btn btn-sm btn-primary",
                            exportOptions: {
                                columns: ':visible'
                            }
                        }
                    ],
                    lengthMenu: [
                        [25, 50, 100, -1],
                        ['25 rows', '50 rows', '100 rows', 'Show all']
                    ],
                    bLengthChange: false,
                    dom: `
                    <'row'
                        <'col-sm-12 col-md-6' <'text-left 'B>>
                        <'col-sm-12 col-md-6'f>
                    >
                    <'row'
                        <'col-sm-12'tr>
                    >
                    <'row'
                        <'col-sm-12 col-md-5'i>
                        <'col-sm-12 col-md-7'p>
                    >`,

                    footerCallback: function (row, data, start, end, display) {
                        var api = this.api(), data;
                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };


                        let bottleCap = api.column(9, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0);
                        $(api.column(9).footer()).html(numeral(bottleCap).format('0,0'));


                        let scheduleDelivery = api.column(10, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0);
                        $(api.column(10).footer()).html(numeral(scheduleDelivery).format('0,0'));


                        let receivable = api.column(12, { page: 'current' }).data().filter(k => numeral(k).value() > -1).reduce((a, b) => intVal(a) + intVal(numeral(b).value()), 0);
                        $(api.column(12).footer()).html(numeral(receivable).format('0,0'));
                    },
                    fnRowCallback: function (nRow, aData, iDisplayIndex) {
                        $("td:eq(1)", nRow).html(iDisplayIndex + 1);
                        return nRow;
                    },
                    initComplete: function () {
                        var api = this.api(),
                            intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };
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
                    }

                });
                // redraw datatable
                dataTable.draw()
                // * LIMIT DATATABLE SELECTION TO
                // * VEHICLE MAX AND NORMAL CAPACIYU
                // ! FIXME: this is a commented in order to add customers outside the range
                // dataTable
                //     .on('select', function (e, dt, type, ix) {
                //         var selected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0),
                //             cap = Number($('.normal_cap').text()),
                //             max = Number($('.max_cap').text()),
                //             remaining = max - selected;

                //         if (selected >= cap && selected <= max) {
                //             Toast.fire({
                //                 icon: 'warning',
                //                 title: `Optimum vehicle capacity reached. Max capacity is ${max}. \nYou can add ${remaining} more.`
                //             })
                //         } else if (selected >= max) {
                //             dt.rows(ix).deselect();
                //             let newSelected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0);
                //             Swal2.fire({
                //                 icon: 'warning',
                //                 title: `Capacity Reached`,
                //                 html: `Max vehicle capacity reached. \nTotal selected schedule quantity is (${newSelected}).`
                //             })
                //         }

                //         selected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0),
                //         remaining = max - selected;

                //         if (remaining > 0) {
                //             updateTitleCapacity(selected, remaining);
                //         } else {
                //             updateTitleCapacity(selected, 0);
                //         }
                //         renderQuickInfo(dt.rows().data().toArray().length, max, dt.rows({ selected: true }).data().toArray().length, selected)

                        
                //     })

                //     .on('deselect', function (e, dt, type, ix) {
                //         var selected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0),
                //             cap = Number($('.normal_cap').text()),
                //             max = Number($('.max_cap').text()),
                //             remaining = max - selected;

                //         if (selected >= cap && selected <= max) {
                //             Toast.fire({
                //                 icon: 'warning',
                //                 title: `Optimum vehicle capacity reached. Max capacity is ${max}. \nYou can add ${remaining} more.`
                //             })
                //         } else if (selected >= max) {
                //             dt.rows(ix).deselect();
                //             let newSelected = dt.rows({ selected: true }).data().toArray().reduce((a, b) => Number(a) + Number(b[10]), 0);
                //             Swal2.fire({
                //                 icon: 'warning',
                //                 title: `Capacity Reached`,
                //                 html: `Max vehicle capacity reached. \nTotal selected schedule quantity is (${newSelected}).`
                //             })
                //         }
                //         if (remaining > 0) {
                //             updateTitleCapacity(selected, remaining);
                //         } else {
                //             updateTitleCapacity(selected, 0);
                //         }
                //         renderQuickInfo(dt.rows().data().toArray().length, max, dt.rows({ selected: true }).data().toArray().length, selected)

                //     });
            })
            .catch(error => {
                console.log(error)
                Toast.fire({
                    icon: "error",
                    title: `Something went wrong.\nPlease try again.\n${error}`
                })
            })
            .then(() => btn.html('Fetch Customer(s)').prop('disabled', false))
    })


    // action to fetch vehicle info when vehicle is selected
    $(document).on('change', '#vehicle_id', (event) => {
        event.preventDefault();

        Dashmix.block('state_loading', '.siteBlock')
        $('.dynamic-div').empty();
        updateTitleCapacity(0, 0);
        let vehicle = $(event.target).val();

        if (vehicle) {
            axios.get(route('api.getVehicleInfo', vehicle))
                .then(({ data }) => {
                    countAnimate($('.normal_cap'), 0, data.capacity)
                    countAnimate($('.max_cap'), 0, data.max_capacity)
                    countAnimate($('.remaining_cap'), 0, data.max_capacity)
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


    // action when customer is selected
    $(document).on('change', '#customer_id', (event) => {
        event.preventDefault();

        let customer = $(event.target).val(),
            selection = $(event.target);

        if (customer) {
            $('#customer_id').notify('Please wait while system fetch customer...', {
                position: 'bottom center',
                className: 'info'
            });

            axios.post(route(`${path}.addCustomerInSchedule`, customer))
                .then(({ data }) => {
                    let node = dataTable.row.add([
                        '',
                        data.id,
                        1,
                        data.customer_name,
                        data.membership_no,
                        data.address,
                        data.block,
                        data.town,
                        data.rate,
                        data.bottle_cap,
                        data.schedule_delivery,
                        '',
                        data.arrear,
                        data.payment_type,
                        data.last_delivery_date,
                        data.last_quantity,
                        ''
                    ]).draw().node();

                    $(node).find('td').each((k, el) => {
                        $(el).addClass('v-middle')
                    })
                    $(node).find('td:eq(1)').addClass("text-center reorder")
                    $(node).find('td:eq(0), td:eq(3), td:eq(5), td:eq(6), td:eq(7), td:eq(8), td:eq(9), td:eq(10), td:eq(12), td:eq(13), td:eq(14)').addClass('text-center')
                    $(node).find('td:eq(11)').addClass(data.arrear < 0 ? 'text-danger font-w600' : 'text-right')
                    // fire toast
                    Toast.fire({
                        icon: 'success',
                        title: `${data.customer_name} added and selected successfully!`
                    })
                })
                .catch(error => {
                    console.error(error)
                    Toast.fire({
                        icon: 'error',
                        title: `Something went wrong.\nPlease try again later.\n${error}.`
                    })
                })
                .then(() => selection.val(null).trigger('change'));
        }


    })




    // * Store delivery schedule
    $(document).on('click', '.x-store-schedule', e => {
        e.preventDefault();
        let btn = $(e.target);
        // btn.html(`<i class="fas fa-sync-alt fa-spin fa-lg mr-1"></i> Processing...`).prop('disabled', true)

        let details = dataTable.rows({ 'search': 'applied', selected: true }).data().toArray().map(el => {
            return {
                id: numeral(el[1]).value(),
                rate: numeral(el[8]).value(),
                bottleCap: numeral(el[9]).value(),
                scheduleDelivery: numeral(el[10]).value(),
                schedule_time: el[11],
                receivable: numeral(el[12]).value(),
                last_delivery_date: el[14],
                last_quantity: numeral(el[15]).value(),
                special_instructions: el[16],
                invoice_id: el[17]
            };
        });

        let data = {
            'delivery_source': $('#delivery_source').val() || null,
            'delivery_date': $('#delivery_date').val() || null,
            'status': $('#status').val() || null,
            'vehicle_id': $('#vehicle_id').val() || null,
            'dispatcher': $('#dispatcher_id').val() || null,
            'helpers': $('#helper_ids').val() || null,
            'details': details
        };

        if (!data.dispatcher) {
            $.notify('Please select dispatcher first.', {
                className: 'error',
                position: 'bottom center'
            });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        }
        
        Swal2.fire({
            title: 'Are you sure to continue?',
            html: `
                <div class="form-group text-left">
                    <label for="source_type" class="font-sm font-w600">Select Source:</label>
                    <select class="form-control" id="source_type" required>
                        <option value="app" selected>App</option>
                    </select>
                </div>
            `,
            // <option value="web" >Web</option>
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                data.source_type = $('#source_type').val()
                // data.push({
                //     source_type: $('#source_type').val()
                // })
                Dashmix.block('state_loading', '.siteBlock')
                axios.post(route(`${path}.store`), data)
                    .then(({ data }) => {
                        if (!data.success) {
                            Swal2.fire({
                                title: 'Warning',
                                html: data.message,
                                icon: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#e74c3c',
                                confirmButtonText: 'Close'
                            })
                            return;
                        }

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
                                window.location.replace(route(`${path}.index`)); // redirect back to index back
                            }
                        })
                    })
                    .catch(error => {
                        console.error(error)
                        Toast.fire({
                            icon: 'error',
                            title: `Something went wrong.\nPlease try again.\n${error}`
                        })
                    })
                .then(() => Dashmix.block('state_normal', '.siteBlock'))
            }
        })
    })

    $(document).on('click', '.btn-previous-schedule', function (event) {
        event.preventDefault();

        let btn = $(this),
            popup = $('#previousScheduleHistory'),
            list = $('.previous-schedule-list'),
            filters = {
                'delivery_source': $('#delivery_source').val(),
                'delivery_date': $('#delivery_date').val()
            };

        list.empty();

        axios.get(route(`${path}.previousSchedule`, {
            params: JSON.stringify(filters)
        }))
        .then(({data}) => {
            console.log(data)
            debugger;
            $.each(data, (i, el) => {
                list.append(`
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" onclick="selectScheduleHistory(${el.id})">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${el.trip_no}</h5>
                        <small>Customers: ${el.details_count}</small>
                        </div>
                        <small>${moment(el.delivery_schedule).format('dddd, DD-MMM-YYYY')}</small>
                    </a>
                `)
            })
            popup.modal('show');
        })
        .catch(error => {
            console.error(error)
            Toast.fire({
                icon: 'error',
                title: `Something went wrong.\nPlease try again.\n${error}`
            })
        })
    })
    
})

/**
 * This function will update the header capacity title
 * 
 * @param {Int} selected 
 * @param {Int} remaining 
 */
const updateTitleCapacity = (selected, remaining) => {
    event.preventDefault();
    $('.selected_cap').text(selected);
    $('.remaining_cap').text(remaining);
}


/**
 * renders quick header info
 * 
 * @param {int} customers total customers count
 * @param {int} quantity total available quantity
 * @param {int} remaining_customer  selected customers quantity
 * @param {int} remaining_qty remaining quantity after selection 
 */
const renderQuickInfo = (customers, quantity, remaining_customer = 0, remaining_qty = 0) => {
    let pie = {
        "remaining": $('.chart-remaining'),
        "quantity": $('.chart-quantity')
    };
    pie.remaining.data('easyPieChart').update(Math.floor(remaining_customer / customers * 100))
    pie.quantity.data('easyPieChart').update(Math.floor(remaining_qty / quantity * 100))

    pie.remaining.find('span').html(`${remaining_customer}/${numeral(customers).value()}`)
    pie.quantity.find('span').html(`${remaining_qty}/${numeral(quantity).value()}`)
}



