var path = 'dashboard.reports.dailyScheduleDelivery';

$(() => {
    'use strict'

    fetchDailyScheduleDeliveryDetails();
})



const fetchDailyScheduleDeliveryDetails = async () => {

    let filters = {
        delivery_source: $('#delivery_source').val(),
        delivery_date: $('#delivery_date').val(),
        variance_type: $('#variance_type').val(),
        status: $('#status').val()
    };

    if (!$('#delivery_source').length && !$('#delivery_date').length) {
        $.notify("Please select proper filters first", "error")
        return;
    }

    $('.header-info').empty()
    $('.dynamicc-div').empty()
    $('.open-dynamic-div').empty()
    $('.grand-total-div').prop('hidden', true)

    Dashmix.layout('header_loader_on');

    // send ajax
    await axios.get(route(`${path}.index`), {
        params: {
            filters: filters
        }
    })
    .then(async ({ data }) => {
        $('.dynamic-div').html(data)
        $('.delivery_details_table').DataTable({
            select: true,
            buttons: [
                { extend: "pageLength", className: "btn btn-sm btn-primary" },
                // { extend: "colvis", className: "btn btn-sm btn-primary" },
                { extend: "copy", className: "btn btn-sm btn-primary" },
                {
                    text: 'Excel',
                    action: function (e, dt, node, config) {
                        exportTableToExcel('delivery_details_table', 'xlsx', 'Actual Schedule');
                    },
                    className: "btn btn-sm btn-primary"
                },
                {
                    text: 'PDF',
                    action: function (e, dt, node, config) {
                        exportTableToPdf();
                    },
                    className: "btn btn-sm btn-primary"
                },
                // { extend: "print", className: "btn btn-sm btn-primary" },
                {
                    text: 'Refresh',
                    action: function (e, dt, node, config) {
                        fetchDailyScheduleDeliveryDetails();
                    },
                    className: "btn btn-sm btn-primary"
                }
            ],
            lengthMenu: [
                [10, 25, 50, -1],
                ['10 rows', '25 rows', '50 rows', 'Show all']
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
        })

        
        fetchOpenDeliveryDetails();
        $('[data-toggle="popover"]').popover();
    })
    .catch(error => {
        console.log(error)
        Toast.fire({
            icon: 'error',
            title: `Something went wrong. \nPlease try again! \n${error}`
        })
    })
}


const fetchOpenDeliveryDetails = async () => {
    let filters = {
        delivery_source: $('#delivery_source').val(),
        delivery_date: $('#delivery_date').val(),
        status: $('#status').val(),
        variance_type: $('#variance_type').val(),
        invoice_ids: $('input[name="invoice_ids[]"]').val()
    };
    
    Dashmix.layout('header_loader_on');

    await axios.post(route(`${path}.getDeliveryWithoutTown`), filters)
            .then(({data}) => {
                $('.open-dynamic-div').html(data)
                $('.open_delivery_details_table ').DataTable({
                    select: true,
                    buttons: [
                        { extend: "pageLength", className: "btn btn-sm btn-primary" },
                        { extend: "copy", className: "btn btn-sm btn-primary" },
                        {
                            text: 'Excel',
                            action: function (e, dt, node, config) {
                                exportTableToExcel('open_delivery_details_table', 'xlsx', 'On Call Schedule');
                            },
                            className: "btn btn-sm btn-primary"
                        },
                        {
                            extend: 'pdf',
                            className: "btn btn-sm btn-primary"
                        },
                        {
                            text: 'Refresh',
                            action: function (e, dt, node, config) {
                                fetchOpenDeliveryDetails();
                            },
                            className: "btn btn-sm btn-primary"
                        }
                    ],
                    lengthMenu: [
                        [10, 25, 50, -1],
                        ['10 rows', '25 rows', '50 rows', 'Show all']
                    ],
                    bLengthChange: false,
                    dom: `
                        <'row'
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
                })
                $('[data-toggle="popover"]').popover();
                generateBothTotal();
            })
            .catch(error => {
                console.log(error)
                Toast.fire({
                    icon: 'error',
                    title: `Something went wrong. \nPlease try again! \n${error}`
                })
            })
            .then(() => Dashmix.layout('header_loader_off'))

    fetchHeaderInfo();
}


const generateBothTotal = () => {
    let totals = [];
    $('.actual-report table.siteDataTable tfoot').each((k, el) => {
        $(el).find('td').each((key, val) => {
            if($(val).attr('data-name')) {
                totals[$(val).attr('data-name')] = (numeral($(val).text()).value() + (totals[$(val).attr('data-name')] || 0))
                $('.grandTotalTable tfoot').find(`[data-name="${$(val).attr('data-name')}"]`).html(numeral(totals[$(val).attr('data-name')]).format('0,0'))
            }
        })
    })
    $('.grand-total-div').prop('hidden', false)

}



/**
 * Export report to pdf format
 * @param Int  delivery_source (source type)
 * @param String delivery_date (data of delivery)
 * @return Open PDF Export Popup
 */
const exportTableToPdf = () => {
    if (!$('#delivery_source').length && !$('#delivery_date').length) {
        $.notify("Please select proper filters first", "error")
        return;
    }

    // open in new tab
    let url = route(`${path}.exportToPDF`, {
        delivery_source: $('#delivery_source').val(),
        delivery_date: $('#delivery_date').val(),
        variance_type: $('#variance_type').val()
    });

    window.open(url, '_blank').focus();

}



const fetchHeaderInfo = () => {
    let filters = {
        delivery_source: $('#delivery_source').val(),
        delivery_date: $('#delivery_date').val(),
        variance_type: $('#variance_type').val(),
        status: $('#status').val()
    };
    
    let $target = $('.header-info'),
        html = '';

    for (let i = 0; i < 4; i++) {
        html += `
            <div class="col-md-3">
                <div class="ph-item p-2">
                    <div class="col-md-12">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>

                        
                        <div class="ph-row mb-2">
                            <div class="ph-col-4 big"></div>
                            <div class="ph-col-4 empty big"></div>
                            <div class="ph-col-4 big"></div>
                        </div>

                        <div class="ph-row">
                            <div class="ph-col-2"></div>
                            <div class="ph-col-8 empty"></div>
                            <div class="ph-col-2 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    $target.html(html)

    // send request & fetch html
    axios.post(route(`${path}.headerDetails`), filters)
                .then(({data}) => {
                    $target.html(atob(data));
                })
                .catch(error => {
                    $target.empty();
                    console.error(error)
                    Toast.fire({
                        icon: 'error',
                        title: `Something went wrong.\nPlease try again later.\n${error}`
                    })
                })
}