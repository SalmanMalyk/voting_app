var routePath = "dashboard.users";

$(function() {
    'use strict';
    
    // update status when clicked
    
    $('table tbody').on('dblclick', '.x-btn-update', e => {
        e.preventDefault();
        Dashmix.block('state_loading', '.siteBlock')
        let payload = $(e.target).data('payload');

        axios.patch(route(`${routePath}.updateStatus`), {
            payload: payload
        })
        .then(({data}) => {
            Toast.fire({
                title: "User status updated successfully! Please wait...",
                icon: 'success'
            })
            window.location.reload();
        })
        .catch(error => {
            Toast.fire({
                icon: 'error',
                title: `Something went wrong. \nPlease try again.\n(${error})`
            })
        })
        .then(() => Dashmix.block('state_normal', '.siteBlock'))
    })
    

    $('.x-filter-logs').on('click', e => {
        e.preventDefault();

        let hash = $(event.target).attr('data-hash')


        window.open(route('dashboard.users.activityLogs', {
            hash: hash,
            date_from: $('#date_from').val(),
            date_to: $('#date_to').val()
        }),
        "_self")
        
    })
    
    

});