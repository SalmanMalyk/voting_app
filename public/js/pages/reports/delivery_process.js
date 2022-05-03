var path = 'dashboard.reports.delivery-process';

$(async () => {
    'use strict';

    // $('.siteDataTable thead tr')
    //     .clone(true)
    //     .addClass('filters')
    //     .appendTo('.siteDataTable thead');

    await $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        // orderCellsTop: true,
        scrollCollapse: true,
        select: true,
        ajax: route(`${path}.index`, {
            "dstr": getUrlVars()['dstr'] || null
        }),
        order: [
            [10, 'asc'],
            [1, 'asc'],
            [3, 'asc'],
        ],
        colReorder: true,
        fixedHeader: {
            header: true,
            headerOffset: $('.content-header').height() - 8
        },
        // initComplete: function () {
        //     var api = this.api();

        //     // For each column
        //     api
        //         .columns()
        //         .eq(0)
        //         .each(function (colIdx) {
        //             // Set the header cell to contain the input element
        //             var cell = $('.filters th').eq(
        //                 $(api.column(colIdx).header()).index()
        //             );
        //             var title = $(cell).text();
        //             $(cell).html('<input type="text" class="form-control rounded-0" placeholder="' + title + '" />');

        //             // On every keypress in this input
        //             $('input', $('.filters th').eq($(api.column(colIdx).header()).index()))
        //                 .off('input')
        //                 .on('input', function (e) {
        //                     e.stopPropagation();

        //                     // Get the search value
        //                     $(this).attr('title', $(this).val());
        //                     var regexr = '({search})'; //$(this).parents('th').find('select').val();

        //                     var cursorPosition = this.selectionStart;
        //                     // Search the column for that value
        //                     api
        //                         .column(colIdx)
        //                         .search(
        //                             this.value != ''
        //                                 ? regexr.replace('{search}', '(((' + this.value + ')))')
        //                                 : '',
        //                             this.value != '',
        //                             this.value == ''
        //                         )
        //                         .draw();

        //                     $(this)
        //                         .focus()[0]
        //                         .setSelectionRange(cursorPosition, cursorPosition);
        //                 });
        //         });
        // },
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
                searchable: false
            },
            {
                data: "trip_no",
                name: "trip_no",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "delivery_source",
                name: "delivery_source",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'status'
                },
                defaultContent: "—"
            },
            {
                data: "delivery_schedule",
                name: "delivery_schedule",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            {
                data: "dispatcher",
                name: "dispatcherUser.name",
                className: "text-center",
                defaultContent: "—"
            },
            {
                data: "helpers",
                name: "helpers.name",
                className: "text-center",
                defaultContent: "—",
                searchable: false,
                orderable: false
            },
            {
                data: "customers_count",
                name: "customers_count",
                className: "text-center",
                defaultContent: 0,
                searchable: false
            },
            {
                data: "schedule_quantity",
                name: "schedule_quantity",
                className: "text-center",
                defaultContent: "—",
                searchable: false,
                orderable: false,
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
                data: "vehicle.plate_no",
                name: "vehicle.plate_no",
                className: "text-center",
                defaultContent: "—",
            },
            {
                data: "created_by.name",
                name: "createdBy.name",
                className: "text-center",
                defaultContent: 0,
                searchable: false
            },
            {
                data: "assignment_date",
                name: "assignment_date",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            {
                data: "dispatch_date",
                name: "dispatch_date",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            {
                data: "source_type",
                name: "source_type",
                className: "text-center text-capitalize",
                defaultContent: "—"
            },
            {
                data: "completed_percentage",
                name: "completed_percentage",
                className: "text-center text-capitalize",
                defaultContent: "—",
                orderable: false,
                searchable: false
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
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page
            let total_customers = api
                .column(6, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            let total_schedule = api
                .column(7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(6).footer()).html(numeral(total_customers).format('0,0'))
            $(api.column(7).footer()).html(numeral(total_schedule).format('0,0'))
        }
    });

    await getHeaderDetails();
});

const changeDate = () => {
    Swal2.fire({
        title: 'Change Schedule Date',
        html: `
            <div class="form-group col-md-12">
                <input type="date" id="filter_date" class="form-control" value="${new Date(current_server_date).toLocaleDateString("en-US")}" required>
            </div>
        `,
        focusConfirm: false,
        confirmButtonColor: '#2ecc71',
        confirmButtonText: 'Change Date',
        preConfirm: () => {
            let date = document.getElementById('filter_date').value;
            if (!date) {
                Swal2.showValidationMessage(
                    `Please select date.`
                )
                return; 
            }
            date = (new Date(date).getTime() / 1000)
            window.location.replace(route(`${path}.index`, {
                'dstr': date
            }));
        }
    })
}

/**
 * dispatch select schedule for app
 * 
 * @param {int} scheduleDelivery schedule delivery id which needs to be dispatched  
 */
const approveDeliverySchedule = (scheduleDelivery) => {
    event.preventDefault();
    let row  = $(event.target).parents('tr'),
        table = $('.siteDataTable').DataTable().row(row).data();
        
    Swal2.fire({
        title: 'Approve Order',
        html: `
            <form action="javascript:void(0)" class="mt-2">
                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Vehicle</b>
                    <span class="float-right font-w600 text-muted">${table.vehicle.manufacturer || null} ${table.vehicle.plate_no || null}</span>
                </div>
                
                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Vehicle Dispatcher</b>
                    <span class="float-right font-w600 text-muted">${table.dispatcher_user.name || 'N/A'}</span>
                </div>

                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Last Meter Reading</b>
                    <span class="float-right font-w600 text-muted">${table.last_meter_reading || 'N/A'}</span>
                </div>
            </form>
        `,
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            let new_meter_reading = $('#meter_reading_start').val(); 
            
            await axios.post(route(`${path}.dispatchDeliverySchedule`, scheduleDelivery), {
                    meter_reading: new_meter_reading
                })
                .then(async ({ data }) => {
                    Swal2.fire({
                        icon: 'success',
                        title: 'Action Status',
                        html: `${data.message}`,
                        confirmButtonColor: '#2ecc71',
                        confirmButtonText: 'OK'
                    })

                    await $('.siteDataTable').DataTable().ajax.reload(null, false);
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
        },
    })
}



/**
 * dispatch select schedule for web
 * 
 * @param {int} scheduleDelivery schedule delivery id which needs to be dispatched  
 */
const dispatchDeliverySchedule = (scheduleDelivery) => {
    event.preventDefault();
    let row = $(event.target).parents('tr'),
        table = $('.siteDataTable').DataTable().row(row).data()
        quantity = table.details.map(detail => detail.items.reduce((total, item) => total += item.bottle_qty, 0)).reduce((total, val) => total += val, 0);

    Swal2.fire({
        title: 'Dispatch Route',
        html: `
            <form action="javascript:void(0)" class="mt-2">
                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Vehicle</b>
                    <span class="float-right font-w600 text-muted">${table.vehicle.manufacturer || null} ${table.vehicle.plate_no || null}</span>
                </div>
                
                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Vehicle Dispatcher</b>
                    <span class="float-right font-w600 text-muted">${table.dispatcher_user.name || 'N/A'}</span>
                </div>

                <div class="clearfix mb-2 font-size-sm border-bottom">
                    <b class="float-left text-primary font-w700">Last Meter Reading</b>
                    <span class="float-right font-w600 text-muted">${table.last_meter_reading || 'N/A'}</span>
                </div>

                <div class="text-left mt-3">
                    <label for="meter_reading_start" class="font-size-sm">Current Meter Reading:<i class="text-danger">*</i></label>
                    <input type="number" id="meter_reading_start" class="form-control form-control-lg font-w700 text-dark" min="${table.last_meter_reading || ''}" placeholder="${table.last_meter_reading || ''}" required>
                </div>
                
                <div class="text-left mt-3">
                    <label for="depature_time" class="font-size-sm">Depature Time:<i class="text-danger">*</i></label>
                    <input type="time" id="depature_time" class="form-control form-control-lg font-w700 text-dark" required>
                </div>
                
                <div class="text-left mt-3">
                    <label for="bottle_taken" class="font-size-sm">Bottle Taken:<i class="text-danger">*</i></label>
                    <input type="number" id="bottle_taken" class="form-control form-control-lg font-w700 text-dark" min="${quantity}" max="${table.vehicle.max_capacity}" onchange="limiter(this)" required>
                    <small class="text-muted">Min: ${quantity} and Max: ${table.vehicle.max_capacity}</small>
                </div>
            </form>
        `,
        confirmButtonText: 'Dispatch Now',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            let payload = {
                new_meter_reading: $('#meter_reading_start').val(),
                depature_time: $('#depature_time').val(),
                bottle_taken: $('#bottle_taken').val()
            }; 

            if (!payload.new_meter_reading) {
                Swal2.showValidationMessage(
                    `Please enter meter reading.`
                )
                return;
            } else if (!payload.depature_time) {
                Swal2.showValidationMessage(
                    `Please enter depature time.`
                )
                return;
            } else if (!payload.bottle_taken) {
                Swal2.showValidationMessage(
                    `Please enter bottle loaded.`
                )
                return;
            }

            await axios.post(route(`${path}.dispatchDeliverySchedule`, scheduleDelivery), payload)
                .then(async ({ data }) => {
                    Swal2.fire({
                        icon: 'success',
                        title: 'Action Status',
                        html: `${data.message}`,
                        confirmButtonColor: '#2ecc71',
                        confirmButtonText: 'OK'
                    })

                    await $('.siteDataTable').DataTable().ajax.reload(null, false);
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
        },
    })
}


/**
 * delete schedule delivery
 * 
 * @param {int} scheduleDelivery id of schedule delivery 
 *                               which needed to be deleted 
 */
const deleteDeliveryProcess = scheduleDelivery => {
    event.preventDefault();

    Swal2.fire({
        html: `
            <h4 class="font-w700 text-muted">Are you sure to remove this delivery schedule?</h4>
            <div class="text-left">
                <label for="schedule_reason" class="font-size-sm">Reason:<i class="text-danger">*</i></label>
                <textarea id="schedule_reason" class="form-control" rows="5" placeholder="Why are you removing this schedule?"></textarea>
            </div>
        `,
        confirmButtonText: 'Remove Schedule',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {

            let reason = $('#schedule_reason').val();

            if(!reason) {
                Swal2.showValidationMessage(`Please enter your reason.`)
                return;
            }
            
            await axios.delete(route(`${path}.destroy`, scheduleDelivery), {
                data: {
                    reason: reason
                }
            })
            .then(({ data }) => {
                // reload dataable
                $(".siteDataTable").DataTable().ajax.reload(null, false);
                // show toast
                Swal2.fire({
                    icon: 'success',
                    title: 'Success',
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

/**
 * generate header details for schedule delivery
 * 
 */
const getHeaderDetails = () => {
    Snackbar.show({
        text: 'System is fetching schedule details.',
        pos: 'bottom-left',
    });

    let html = ``,
        $event = event, 
        btn = $('.sync-data');

    if($event !== undefined) {
        btn.html('<i class="fas fa-sync-alt text-info fa-lg fa-spin mr-1"></i> Syncing...')
    }
        
    for(let i = 0; i < 12; i++) {
        html += `
            <div class="col-md-2">
                <div class="ph-item p-2">
                    <div class="col-md-12">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>

                        <div class="ph-row">
                            <div class="ph-col-10 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    $('.header_details').html(html)

    return new Promise((resolve, reject) => {
        axios.get(route(`${path}.getHeaderDetails`, {
                "dstr": getUrlVars()['dstr'] || null
            }))
            .then(({ data }) => {
                $('.header_details').html(atob(data))
                Dashmix.helpers(['easy-pie-chart'])
                resolve(data);
            })
            .catch(error => {
                $('.header_details').html(null)
                reject(error)
            })
            .then(() => {
                Snackbar.close();
                if ($event !== undefined) {
                    btn.html('<i class="fas fa-check text-success mr-1 fa-lg animate__animated animate__jackInTheBox"></i> Synced')
                }
            });
    })
}


// const scheduleApproval = (scheduleDelivery, from, to) => {
//     event.preventDefault();

//     Swal2.fire({
//         icon: 'question',
//         title: 'Confirm',
//         html: `Are you sure to continue?`,
//         confirmButtonText: 'Yes, Continue',
//         cancelButtonText: 'No',
//         confirmButtonColor: '#2ecc71',
//         cancelButtonColor: '#d33',
//         showCancelButton: true,
//         allowOutsideClick: false,
//         backdrop: true,
//         showLoaderOnConfirm: true,
//         allowOutsideClick: () => !Swal2.isLoading(),
//         preConfirm: async () => {
//             await axios.post(route(`${path}.approvalRequest`, [scheduleDelivery, from, to]))
//                 .then(({ data }) => {
//                     $(".siteDataTable").DataTable().ajax.reload(null, false);
//                     // show toast
//                     Swal2.fire({
//                         icon: 'success',
//                         title: 'Action Status',
//                         html: `${data.message}`,
//                         confirmButtonText: 'OK',
//                         confirmButtonColor: '#2ecc71'
//                     })
//                     return data;
//                 })
//                 .catch(error => {
//                     console.error(error)
//                     if (error.response.status == 422) {
//                         let messages = '';
//                         $.each(error.response.data.errors, (k, v) => {
//                             messages += `${v[0]} <br>`;
//                         })
//                         Swal2.showValidationMessage(
//                             `${messages}`
//                         )
//                     } else {
//                         Swal2.showValidationMessage(
//                             `Request failed: ${error}`
//                         )
//                     }
//                 })
//         }
//     })
// }