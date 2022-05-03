$(function () {

    // CREATE CUSTOMER
    $('#invoiceCreateForm').on('click', '.btn-add-customer', e => {
        e.preventDefault();        
        $('#createCustomerModal').modal('show')
    })

    /**
     * get blocks when town is selected
     * ! Function is depricated as we are using 
     * ! select2 custom component which handles selective choice 
     * @param {Int} town selected town id
     */
    // $(document).on('change.select2', '#town_id', e => {
    //     e.preventDefault();

    //     let town = e.target.value;
    //     $("#block_id").empty();
    //     if (town) {
    //         axios.get(route(`${routePrefix}.getBlocks`, town))
    //             .then(response => {
    //                 let options = [];
    //                 $.each(response.data.blocks, (k, v) => {
    //                     options[k] = new Option(v, k, true, true);
    //                 })
    //                 $("#block_id").append(options);
    //             })
    //             .catch(error => {
    //                 console.error(error)
    //                 $.notify('Something went wrong. Please try again!')
    //             })
    //     }
    // })


    $('#createCustomerModal').on('hide.bs.modal', function (e) {
        resetCustomerCreationForm();
    })


    // submit customer form
    $(document).on('submit', '#createCustomerForm', function(e){
        e.preventDefault();

        let formData = new FormData(this);
        
        // send ajax to server
        axios.post(route(`dashboard.customers.createCustomerFromInvoice`), formData)
            .then(response => {
                populateExistingUserFromNumber(response.data.customerBranch)
                $.notify(response.data.message, 'success')
                $('#createCustomerModal').modal('hide')
            })
            .catch(error => {
                console.error(error)
                $.notify('Something went wrong. Please try again!')
            })
    })


})



/**
 * checks if theres a customer already registered with the same number
 * @author Salman
 * @param {int} phone phone number field value
 * @param {element} field input field
 * @return Void
 */
const checkForNumberExistence = () => {
    event.preventDefault();

    let phone = event.target.value,
        field = $(event.target);

    if (phone) {
        $(field).addClass('loading').removeClass('is-valid is-invalid');
        axios.get(route(`${routePrefix}.checkCustomerByPhone`, phone))
            .then(response => {
                if (!response.data.status) {
                    field.val('')
                    $(field).addClass('is-invalid')
                    swal({
                        title: "Are you sure?",
                        text: `Customer "${response.data.customerBranch.customer.contact_person}" already exists with this contact number.`,
                        icon: "warning",
                        buttons: {
                            cancel: "OK",
                            catch: {
                                text: "Select this customer",
                                value: "catch",
                            },
                        },
                    })
                    .then(value => {
                        if (value == 'catch') {
                            populateExistingUserFromNumber(response.data.customerBranch)
                            $('#createCustomerModal').modal('hide')
                        }
                    });
                } else {
                    $(field).addClass('is-valid')
                }
            })
            .catch(error => {
                console.error(error)
                $.notify('Something went wrong. Please try again!')
            })
            .then(() => $(field).removeClass('loading'))
    }

}



/**
 * populates customer branch information in form
 * @author Salman
 * @param {Int} customerBranch id of found customer branch
 * @return void 
 */
const populateExistingUserFromNumber = customerBranch => {
    $('#customer_type_id').val(customerBranch.customer.customer_type_id).trigger('change').prop('readonly', true);
    $('#customer_id').append(new Option(customerBranch.customer_name, customerBranch.id, true, true)).trigger('change');
    $('#customer_id').prop('readonly', true)
    // hide create customer btn
    $('#invoiceCreateForm .btn-add-customer').prop('hidden', true);
}

/**
 * reset form fields
 * @return void
 */
const resetCustomerCreationForm = () => {
    // reset customer create form
    $('#createCustomerForm')[0].reset();
    $('#createCustomerForm .select2').val('').trigger('change');
    $('#createCustomerForm #contact_no, #createCustomerForm #phone_office').removeClass('loading is-valid is-invalid');
}


