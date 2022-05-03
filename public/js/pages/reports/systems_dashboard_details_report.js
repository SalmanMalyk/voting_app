var routePath = `dashboard.reports.system-dashboard-details`;

const fetchDashoboardData = (from, to) => {
    Dashmix.block('state_loading', '.detailsBlock')
    $('.siteData tbody').empty();
    return axios.post(route(`${routePath}.getDashboardDetails`), {
            params: {
                date_from: from,
                date_to: to
            }
        })
        .then(response => {
            $('.siteData tbody').html(response.data);
            calculateTotalSales();
        })
        .catch(error => {
            console.error(error)
            $.notify('Something went wrong.');
        })
        .then(() => {
            Dashmix.block('state_normal', '.detailsBlock')
        })
}

const cashierReportDetails = (from, to) => {
    Dashmix.block('state_loading', '.fdoBlock')
    $('.fdoTableData tbody').empty();
    return axios.post(route(`${routePath}.getCashierReportDetails`), {
            params: {
                date_from: from,
                date_to: to
            }
        })
        .then(response => {
            $('.fdoTableData tbody').html(response.data);
        })
        .catch(error => {
            console.error(error)
            $.notify('Something went wrong.');
        })
        .then(() => {
            Dashmix.block('state_normal', '.fdoBlock')
        })
}


const calculateTotalSales = () => {
    for (var i = 1; i < 6; i++) {
        var sumQty = 0, sumAmount = 0,
            sumQtyElements = document.querySelectorAll('.sum_qty_' + i),
            sumAmountElements = document.querySelectorAll('.sum_amount_' + i);
        Array.prototype.forEach.call(sumQtyElements, function (el) {
            if ($.isNumeric(el.innerText.replace(/\,/g, ''))) {
                sumQty += parseFloat(el.innerText.replace(/\,/g, ''));
            }
        });
        $('.total_qty_' + i).html(numeral(sumQty).format('0,0'));

        Array.prototype.forEach.call(sumAmountElements, function (el) {
            if ($.isNumeric(el.innerText.replace(/\,/g, ''))) {
                sumAmount += parseFloat(el.innerText.replace(/\,/g, ''));
            }
        });

        $('.total_amount_' + i).html(numeral(sumAmount).format('0,0'));
    }
}

const deliveredNotPaid = (from, to) => {
    Dashmix.block('state_loading', '.nonPaidBlock')
    $('.nonPaidTableData tbody').empty();
    return axios.post(route(`${routePath}.deliveredNotPaidCompletely`), {
        params: {
            date_from: from,
            date_to: to
        }
    })
    .then(response => {
        $('.nonPaidTableData tbody').html(response.data);
    })
    .catch(error => {
        console.error(error)
        $.notify('Something went wrong.');
    })
    .then(() => {
        Dashmix.block('state_normal', '.nonPaidBlock')
    })

}



const extraPaymentByCustomer = (from, to) => {
    Dashmix.block('state_loading', '.extraPaymentBlock')
    $('.extraPaymentTable tbody').empty();
    return axios.post(route(`${routePath}.extraPaymentByCustomer`), {
        params: {
            date_from: from,
            date_to: to
        }
    })
    .then(response => {
        $('.extraPaymentTable tbody').html(response.data);
    })
    .catch(error => {
        console.error(error)
        $.notify('Something went wrong.');
    })
    .then(() => {
        Dashmix.block('state_normal', '.extraPaymentBlock')
    })
}


const pendingDelivery = (from, to) => {
    Dashmix.block('state_loading', '.pendingDeliveryBlock')
    $('.pendingDeliveryTableData tbody').empty();
    return axios.post(route(`${routePath}.pendingDeliveries`), {
            params: {
                date_from: from,
                date_to: to
            }
        })
        .then(response => {
            $('.pendingDeliveryTableData tbody').html(response.data);
        })
        .catch(error => {
            console.error(error)
            $.notify('Something went wrong.');
        })
        .then(() => {
            Dashmix.block('state_normal', '.pendingDeliveryBlock')
        })

}


// TODO: Fetch Data of dispatchers from given dates
const getDeliveryRecords = (from, to) => {
    Dashmix.block('state_loading', '.deliveryRecordBlock')
    $('.deliveryRecordTableData tbody').empty();
    return axios.post(route(`${routePath}.deliveryRecords`), {
        params: {
            date_from: from,
            date_to: to
        }
    })
    .then(response => {
        $('.deliveryRecordTableData tbody').html(response.data);
    })
    .catch(error => {
        console.error(error)
        $.notify('Something went wrong.');
    })
    .then(() => {
        Dashmix.block('state_normal', '.deliveryRecordBlock')
    })
}

const extraBottleReturn = (from, to) => {
    Dashmix.block('state_loading', '.extraBottleReturnBlock')
    $('.extraBottleTableData tbody').empty();
    return axios.post(route(`${routePath}.extraBottleReturn`), {
        params: {
            date_from: from,
            date_to: to
        }
    })
    .then(response => {
        $('.extraBottleTableData tbody').html(response.data);
    })
    .catch(error => {
        console.error(error)
        $.notify('Something went wrong.');
    })
    .then(() => {
        Dashmix.block('state_normal', '.extraBottleReturnBlock')
    })
}



async function resolveAllPromises() {
    await fetchDashoboardData(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await cashierReportDetails(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await getDeliveryRecords(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await deliveredNotPaid(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await extraPaymentByCustomer(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await pendingDelivery(
        $('#date_from').val(),
        $('#date_to').val()
    );

    await extraBottleReturn(
        $('#date_from').val(),
        $('#date_to').val()
    );
}

$(document).ready(function() {
    $(document).on('click', '.btn-filter', function () {
        event.preventDefault();

        let date_from = $('#date_from').val(),
            date_to = $('#date_to').val();

        if (date_from && date_to) {
            resolveAllPromises();
        } else {
            $.notify('Please select proper date range.', 'error')
        }
    });
    
    // CALL Resolving method
    resolveAllPromises();
})