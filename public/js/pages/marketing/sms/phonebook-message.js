$(function() {
    'use strict';

    $(document).on('change', '#schedule_message', function (event) {
        event.preventDefault();

        let status = $(event.target)

        if (status.is(':checked')) {
            $('.schedule_date_div').prop('hidden', false)
            $('#schedule_date').prop('required', true)
        } else {
            $('.schedule_date_div').prop('hidden', true)
            $('#schedule_date').prop('required', false)
        }
    })


    $(document).on('click', '.btn-fetch-customers', function (event) {
        event.preventDefault();

        let filters = {
            "customer_type_id" : $('#customer_type_id').val(),
            "status" : $('#status').val(),
            "town_id" : $('#town_id').val(),
            "block_id" : $('#block_id').val()
        };

        let multiSelect = $('#customer_branch_ids'); 

        let btn = $(event.target);
            btn.html('<div class="spinner-border spinner-border-sm text-light" role="status"></div>').prop("disabled", true)

        multiSelect.empty();
        multiSelect.multiSelect('refresh');
        
        axios.post(route(`${path}.fetchCustomers`), {
                filters: filters
            })
            .then(({data}) => {
                data.forEach(item => {
                    multiSelect.append(new Option(`${item.complete_name} (${item.customer.membership_no})`, item.id, false, false))
                })
                
                multiSelect.multiSelect('refresh');
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

    $(document).on('click', '.selectAll', function (event) {
        event.preventDefault();
        $('#customer_branch_ids').multiSelect('select_all');
        return false;
    })

    $(document).on('click', '.deselectAll', function (event) {
        event.preventDefault();
        $('#customer_branch_ids').multiSelect('deselect_all');
        return false;
    })

    $(document).on('submit', '#sendPhonebookMessage', function (event) {
        event.preventDefault();

        let formData = new FormData(this),
            form = $(event.target)[0];

        Swal2.fire({
            title: `Are you sure?`,
            text: "Do you agree to send this message to selected customers?",
            icon: 'question',
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            showCancelButton: true,
            confirmButtonText: 'Send Message',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            backdrop: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal2.isLoading(),
            preConfirm: async () => {
                await axios.post(route(`${path}.storePhonebookMessage`), formData)
                    .then(({ data }) => {
                        Swal2.fire({
                            icon: 'success',
                            title: 'Action Status',
                            html: `${data.message}`,
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            backdrop: true,
                            confirmButtonColor: '#2ecc71'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.reset();
                                $('.select2').val(null).trigger('change');
                            }
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
    
    
    
    
})