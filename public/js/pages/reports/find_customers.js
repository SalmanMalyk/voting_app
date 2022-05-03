var path = "dashboard.reports.findCustomers";


$(function() {
    'use strict';

    
    $(document).on('click', '.btn-fetch-customers', function (event) {
        event.preventDefault();

        let filters = {};

        $('#findCustomerForm').find('.form-control').each((index, element) => {
            let name = $(element).attr('name');
            filters[name] = $(element).val() || null;
        })

        let btn = $(event.target);
        btn.html('<div class="spinner-border spinner-border-sm text-light" role="status"></div>').prop("disabled", true)

        axios.post(route(`${path}.find`), {
            filters: filters
        })
            .then(({ data }) => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
                if (error.response.status == 422) {
                    let messages = '';
                    $.each(error.response.data.errors, (k, v) => {
                        messages += `${v[0]} <br>`;
                    })
                    Toast.fire({
                        icon: "error",
                        title: `${messages}`
                    })
                } else {
                    Toast.fire({
                        icon: "error",
                        title: `Request failed: ${error}`
                    })
                }
            })
            .then(() => btn.html('<i class="fas fa-filter mr-1"></i> Filter Customers').prop("disabled", false))
    })
    
})