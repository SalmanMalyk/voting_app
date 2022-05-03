var routePath = 'dashboard.reports.scheduleDelivery';


$(document).ready(function () {

    // filter data
    $('.x-btn-filter').on('click', (e) => {
        e.preventDefault();

        let btn = $(e.target),
            filters = {
                'delivery_source': $('#delivery_source').val(),
                'delivery_date': $('#delivery_date').val(),
                'status': $('#status').val()
            },
            popup = $('#printPdf');

        $('.dynamic-div').empty();
        btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Processing...').prop('disabled', true)

        axios.post(route(`${routePath}.fetchScheduleDeliveryReport`), filters)
            .then(({ data }) => {
                $('.dynamic-div').html(data.view)
                if (data.customer_count > 0) {
                    var dataTable = $(".siteDataTable").DataTable({
                        responsive: true,
                        colReorder: true,
                        rowReorder: true,
                        orderMulti: true,
                        select: true,
                        order: [
                            [5, 'asc'],
                            [4, 'asc'],
                            [3, 'asc'],
                        ],
                        colResize: {
                            isEnabled: true,
                            hoverClass: 'dt-colresizable-hover',
                            hasBoundCheck: true,
                            minBoundClass: 'dt-colresizable-bound-min',
                            maxBoundClass: 'dt-colresizable-bound-max',
                        },
                        columnDefs: [
                            { 
                                targets: [10], 
                                render: $.fn.dataTable.render.number(',')
                            },
                            { 
                                targets: [12], 
                                type: 'date-dd-mmm-yyyy'
                            },
                        ],
                        buttons: [
                            { extend: "pageLength", className: "btn btn-sm btn-primary" },
                            { extend: "colvis", className: "btn btn-sm btn-primary" },
                            {
                                extend: "copy",
                                className: `btn btn-sm btn-primary ${print_permission ? null : 'd-none'}`,
                                exportOptions: {
                                    columns: ':visible'
                                }
                            },
                            {
                                text: "Excel",
                                className: `btn btn-sm btn-primary ${print_permission ? null : 'd-none'}`,
                                action: function (e, dt, node, config) {
                                    // start loading
                                    Dashmix.block('state_loading', '.siteBlock')

                                    let thead = [];
                                    let tfoot = [];
                                    let data = dt.rows({ search: 'applied' }).data().toArray();
                                    $('.siteDataTable thead tr th').each((k, el) => {
                                        thead[k] = {
                                            title: $(el).text(),
                                            tab_index: $(el).attr('data-column-index'),
                                            align: $(el).attr('data-align'),
                                            width: el.style.width
                                        }
                                    })

                                    $('.siteDataTable tfoot tr td').each((k, el) => {
                                        tfoot[k] = {
                                            col_span: $(el).attr('colspan'),
                                            align: $(el).attr('align'),
                                            value: $(el).text()
                                        }
                                    })

                                    $.ajax({
                                        xhrFields: {
                                            responseType: 'blob',
                                        },
                                        type: 'POST',
                                        url: route(`${routePath}.generateExcelExport`),
                                        headers: {
                                            "X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')
                                        },
                                        data: {
                                            head: thead,
                                            body: data,
                                            tfoot: tfoot,
                                            filter: {
                                                source: $('#delivery_source').val(),
                                                date: $('#delivery_date').val(),
                                            }
                                        },
                                        success: function (result, status, xhr) {

                                            var disposition = xhr.getResponseHeader('content-disposition');
                                            var matches = /"([^"]*)"/.exec(disposition);
                                            var filename = (matches != null && matches[1] ? matches[1] : 'schedule-delivery.xlsx');

                                            // The actual download
                                            var blob = new Blob([result], {
                                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                            });
                                            var link = document.createElement('a');
                                            link.href = window.URL.createObjectURL(blob);
                                            link.download = filename;

                                            document.body.appendChild(link);

                                            link.click();
                                            document.body.removeChild(link);
                                        },
                                        error: error => {
                                            Toast.fire({
                                                icon: 'error',
                                                title: `Something went wrong.\nPlease try again late.\n${error}`
                                            })
                                        },
                                    }).done(() => Dashmix.block('state_normal', '.siteBlock'));
                                }

                            },
                            {
                                text: 'PDF',
                                className: `btn btn-sm btn-primary ${print_permission ? null : 'd-none'}`,
                                action: function (e, dt, node, config) {
                                    // start loading
                                    Dashmix.block('state_loading', '.siteBlock')

                                    let thead = [];
                                    let tfoot = [];
                                    let data = dt.rows({ search: 'applied' }).data().toArray();

                                    $('.siteDataTable thead tr th').each((k, el) => {
                                        thead[k] = {
                                            title: $(el).text(),
                                            tab_index: $(el).attr('data-column-index'),
                                            align: $(el).attr('data-align'),
                                            width: el.style.width
                                        }
                                    })

                                    $('.siteDataTable tfoot tr td').each((k, el) => {
                                        tfoot[k] = {
                                            col_span: $(el).attr('colspan'),
                                            align: $(el).attr('align'),
                                            value: numeral($(el).text()).value()
                                        }
                                    })

                                    axios
                                        .post(route(`${routePath}.generatePdfExport`), {
                                            head: thead,
                                            body: data,
                                            tfoot: tfoot,
                                            filter: {
                                                source: $('#delivery_source').val(),
                                                date: $('#delivery_date').val(),
                                            }
                                        })
                                        .then(({ data }) => {
                                            popup.find('.report-pdf').attr('src', `data:application/pdf;base64, ${data}`);
                                            popup.modal('show');
                                        })
                                        .catch(error => {
                                            console.error(error)
                                            Toast.fire({
                                                icon: 'error',
                                                title: `Something went wrong.\nPlease try again late.\n${error}`
                                            })
                                        })
                                        .then(() => Dashmix.block('state_normal', '.siteBlock'))
                                }
                            },
                            {
                                extend: "print",
                                className: `btn btn-sm btn-primary ${print_permission ? null : 'd-none'}`,
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

                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;
                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            $('.totat_customers').html(api.column(1).data().length)

                            let bottleCap = api.column(7, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0),
                                total_bottle_cap = api.column(7).data().reduce((a, b) => intVal(a) + intVal(b), 0);
                                
                            $(api.column(7).footer()).html(numeral(bottleCap).format('0,0'));
                            $('.total_capacity').html(numeral(total_bottle_cap).format('0,0'))


                            let scheduleDelivery = api.column(8, { page: 'current' }).data().reduce((a, b) => intVal(a) + intVal(b), 0),
                                total_schedule_delivery = api.column(8).data().reduce((a, b) => intVal(a) + intVal(b), 0);

                            $(api.column(8).footer()).html(numeral(scheduleDelivery).format('0,0'));
                            $('.totat_schedule').html(numeral(total_schedule_delivery).format('0,0'))


                            let receivable       = api.column(10, { page: 'current' }).data().filter(k => numeral(k).value() > -1).reduce((a, b) => intVal(a) + intVal(b), 0),
                                total_receivable = api.column(10).data().filter(k => numeral(k).value() > -1).reduce((a, b) => intVal(a) + intVal(b), 0);
                            
                            $(api.column(10).footer()).html(numeral(receivable).format('0,0'));
                            $('.total_receivable').html(numeral(total_receivable).format('0,0'))

                            const total_product_sale = api.rows({ search: 'applied' })
                                                        .data()
                                                        .toArray()
                                                        .reduce((res, cols) => res += cols[6] * cols[8], 0);

                            $('.total_sale').html(numeral(total_product_sale).format('0,0'))

                            const total_cash_sale = api.rows({ search: 'applied' })
                                            .data()
                                            .toArray()
                                            .filter(cols => cols[11] == "Cash")
                                            .reduce((res, cols) => res += numeral(cols[6]).value() * numeral(cols[8]).value(), 0);

                            $('.total_cash_sale').html(numeral(total_cash_sale).format('0,0'))

                            $('.total_percentage').html(Math.floor((total_cash_sale / total_product_sale) * 100)+"%")

                            // $('.total_percentage').html()
                            let paymentWiseSale = [
                                {
                                    'class': 'total_cash_sale_value',
                                    'type': 'Cash'
                                },
                                {
                                    'class': 'total_credit_sale_value',
                                    'type': 'Credit'
                                },
                            ];                

                            
                            // * iterate through created array
                            paymentWiseSale.forEach((data, indx) => {
                                const sale = api.rows({ search: 'applied' })
                                                            .data()
                                                            .toArray()
                                                            .filter(cols => numeral(cols[10]).value() > -1)
                                                            .filter(cols => cols[11] == data.type)
                                                            .reduce((res, cols) => res += numeral(cols[10]).value(), 0);

                                $(`.${data.class}`).html(numeral(sale).format('0,0'))
                            })
                        }

                    });
                    dataTable.draw()


                    
                    // update chart data
                    // scheduleDeliveryChart.data.labels = data.chart.dates;
                    // scheduleDeliveryChart.data.datasets[0].data = data.chart.capacity;
                    // scheduleDeliveryChart.data.datasets[1].data = data.chart.schedule;
                    // scheduleDeliveryChart.update();
                } else {
                    // $('.info-grid h4').each((indx, el) => $(el).html('N/A'))
                    // scheduleDeliveryChart.data.labels = [];
                    // scheduleDeliveryChart.data.datasets[0].data = [];
                    // scheduleDeliveryChart.data.datasets[1].data = [];
                    // scheduleDeliveryChart.update();
                }
                
                
                
            })
            .catch(error => {
                console.log(error)
                Toast.fire({
                    icon: "error",
                    title: `Something went wrong.\nPlease try again.\n${error}`
                })
            })
            .then(async () => {
                btn.html('<i class="fas fa-filter mr-1"></i> Filter Data').prop('disabled', false)
                await generateChart();
            })
    })



    // create schedule plan
    $(document).on('click', '.x-create-plan', (e) => {
        e.preventDefault();

        let data = {
            source: $('#delivery_source').val(),
            date: $('#delivery_date').val(),
            status: $('#status').val(),
        };

        Swal2.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                Dashmix.block('state_loading', '.siteBlock')
                axios.post(route(`${routePath}.storeScheduleDelivery`), data)
                    .then(({data}) => {
                        if(!data.success) {
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


                        Toast.fire({
                            title: data.message,
                            icon: 'success'
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


    // * store delivery schedule
    $(document).on('click', '.x-btn-save', event => {
        event.preventDefault();

        let btn = $(event.target),
            filter = {
                source: $('#delivery_source').val(),
                date: $('#delivery_date').val(),
                status: $('#status').val()
            };

        Swal2.fire({
            icon: 'question',
            title: 'Confirm',
            html: 'Are you sure to store schedule?',
            confirmButtonText: 'Yes, Store',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                btn.html('<i class="fas fa-cog fa-lg fa-spin mr-1"></i> Saving...')

                await axios.post(route(`${routePath}.store`), filter)
                    .then(({ data }) => {
                        Swal2.fire({
                            icon: 'success',
                            title: 'Action Status',
                            html: data.message,
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#2ecc71'
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
                    .then(() => btn.html('<i class="fas fa-cloud-download-alt mr-1"></i> Store Schedule'))

            }
        })
    })


    const generateChart = () => {
        event.preventDefault();

        $('#scheduleChart').notify('Generating chart...', 'message')
        
        axios.post(route(`${routePath}.generateChartData`), {
            delivery_date: $('#delivery_date').val(),
            delivery_source: $('#delivery_source').val(),
            status: $('#status').val(),
        })
        .then(({data}) => {
            scheduleDeliveryChart.data.labels = data.map(e => e.date);
            scheduleDeliveryChart.data.datasets[0].data = data.map(e => e.invoice);
            // scheduleDeliveryChart.data.datasets[1].data = data.chart.schedule;
            scheduleDeliveryChart.update();
        })
        .catch(error => {
            console.error(error)
        })
    }
    
})

