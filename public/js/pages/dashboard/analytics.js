var path = 'dashboard.analytics';

// get schedule plan analytics report
const getQuickAnalytics = () => {
    let div = $('.quick-report');

    // loading state
    div.html(`<div class="ph-item bg-transparent p-2">
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>

                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                        
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                        
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>
                    </div>
                </div>`)

    var date_range = {
        "date_from": $('#date_from').val(),
        "date_to": $('#date_to').val(),
    };

    return axios.post(route(`${path}.getQuickAnalytics`), date_range)
        .then(({ data }) => {
            div.html(atob(data.view))
            Dashmix.helpers(['sparkline'])
        })
        .catch(error => {
            console.error(error)
            div.html(sayAlert())
            Toast.fire({
                icon: 'error',
                title: `Something went wrong.\nPlease try again.\n${error}`
            })
        })
}

const schedulePlanAnalytics = () => {
    let div = $('.schedule-report');

    // loading state
    div.html(`<div class="ph-item p-2">
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>


                    </div>
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>


                    </div>
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>


                    </div>
                    <div class="col-md-3">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>


                    </div>
                    <div class="col-md-12">
                        <div class="ph-col-4 mb-2">
                            <div class="ph-picture"></div>
                        </div>

                        <div class="ph-row">
                            <div class="ph-col-12 mx-auto"></div>
                            <div class="ph-col-6"></div>
                            <div class="ph-col-2 ml-auto"></div>
                            <div class="ph-col-12"></div>
                        </div>
                    </div>
                </div>`)

    var date_range = {
        "date_from": $('#date_from').val(),
        "date_to": $('#date_to').val(),
    };

    return axios.post(route(`${path}.getSchedulePlanAnalytics`), date_range)
        .then(({ data }) => {
            div.html(atob(data.view))
        })
        .catch(error => {
            console.error(error)
            div.html(sayAlert)
            Toast.fire({
                icon: 'error',
                title: `Something went wrong.\nPlease try again.\n${error}`
            })
        })
}



const sayAlert = (type, message) => {
    let html = `
        <div class="alert alert-${type || 'warning'} d-flex align-items-center justify-content-between" role="alert">
            <div class="flex-00-auto">
                <i class="fa fa-fw fa-exclamation-circle"></i>
            </div>
            <div class="flex-fill mr-3">
                <p class="mb-0">${message || 'No Data Found'}</p>
            </div>
        </div>
    `;
}




/**
 * Resolving all promises 
 * with async models.
 */
async function resolveAllPromises() {
    await getQuickAnalytics();

    await schedulePlanAnalytics();
}

// * Calling method to resolve all promises
resolveAllPromises();