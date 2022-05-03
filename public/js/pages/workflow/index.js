var routePrefix = 'dashboard.config';


$(document).ready(function() {

	$('#user_group_ids').select2({
        ajax: {
            url: route(`${routePrefix}.roles.index`),
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                return {
                    results:  $.map(data, function (item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });


    $('#user_group_ids').on('select2:selecting', function (e) {
        var data = e.params.args.data;
        let div = $('.selectedUsers');

        // unhide div
        div.prop('hidden', false);


        let field = `
            <div class="col-md-2 text-center mb-3 mr-3" data-user="${data.id}">
                <div class="block block-rounded block-fx-pop">
                    <div class="block-header bg-primary-dark-op p-1">
                        <input type="hidden" name="user_group_orders[]" value="${data.id}" />
                        <h3 class="block-title text-white font-w400">${data.text}</h3>
                    </div>
                    <div class="block-content p-3">
                        <div class="mb-1">
                            <select class="form-control form-control-sm" onchange="selectUser(${data.id})" id="approval_by_${data.id}" name="approval_by_${data.id}" required>
                                <option value="1" selected>Any</option>
                                <option value="2">All</option>
                                <option value="3">Specific</option>
                            </select>
                        </div>

                        <button type="button" class="btn btn-secondary btn-sm btn-block mt-3" onclick="removeUserGroup(${data.id})">Remove</button>

                    </div>
                </div>
            </div>
        `;

        div.append(field);
    });

    $('#user_group_ids').on('select2:unselecting', function (e) {
        $(`[data-user="${e.params.args.data.id}"]`).remove();
    });

    $(".selectedUsers").sortable({
        cursor: "move",
        opacity: 0.9
    });
    $(".selectedUsers").disableSelection();


    var workflowForm = $("#workflowForm").validate({
        rules: {
            workflow_name: {
                required: true,
            },
            workflowable_model: {
                required: true
            },
            method: {
                required: true
            },
        },
        messages: {
            workflow_name: 'Please enter workflow name',
            workflowable_model: 'Please select workflow model',
            method: 'Please select workflow method',
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },

        submitHandler: function (form) {
            event.preventDefault();
            let user_group_order = [];
            
            $('[name="user_group_orders[]"]').each((i, v) => {
                let id = $(v).val();
                user_group_order[i] = {
                    role_id: id,
                    approval_type: $(`[name='approval_by_${id}']`).val(),
                    approval_users: $(`#specfic_user_field_${id}`).val() || null
                };
            })

            let obj = {
                workflow_name: $('#workflow_name').val() || null,
                workflowable_model: $('#workflowable_model').val() || null,
                method: $('#method').val() || null,
                description: $('#description').val() || null,
                role_ids: $('#user_group_ids').val() || null,
                approval_workflows: user_group_order || null,
            };


            axios.post(route(`${routePrefix}.workflows.store`), obj)
                .then(response => {
                    $('#siteModal').modal('hide');
                    $('#workflowForm')[0].reset();
                    $('.select2').each((i, option) => $(option).val('').trigger('change'));
                    $('.selectedUsers > *').remove();

                    Swal2.fire({
                        icon: 'success',
                        title: 'Action Status',
                        html: response.data.message,
                        confirmButtonColor: '#2ecc71',
                        confirmButtonText: 'Done',
                        allowOutsideClick: false,
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.replace(route(`${routePrefix}.workflows.index`)); // redirect back to index back
                        }
                    })
                })
                .catch(error => {
                    console.error(error)
                    Toast.fire({
                        icon: 'error',
                        title: `Something went wrong.\nPlease try again later.\n${error}`
                    })
                })  
        },
    });

    $(document).on("change", ".select2", function() {
       workflowForm.form();
    });
})

const getClassMethods = () => {
    let className = $('#workflowable_model').val();
    $('#method').empty();

    axios.post(route(`${routePrefix}.workflows.getClassMethods`), {
            className
        })
        .then(({data}) => {
            if(!data.success) {
                $.notify('No Controller defined in model class.', 'warning');
            }
            $.each(data.response, (i, d) => {
                $('#method').append(new Option(d, d, false, false)).trigger('change')
            })

        })
        .catch(error => {
            console.error(error)
        })

}



function removeUserGroup(user) {
    event.preventDefault();
    $(`#user_group_ids option[value="${user}"]`).prop('selected', false);
    $(`#user_group_ids`).trigger('change');
    $(`[data-user="${user}"]`).remove();
}


const selectUser = role => {
    
    // start loading
    let $field = $(event.target);

    $(`.specfic_user_${role}`).empty();

    if ($field.val() != 3) { // selection is not specific 
        return;
    }
    
    $field.addClass('loading');
    
    axios.get(route(`api.getUserByRole`, {
            "rmb": [role]
        }))
        .then(({data}) => {            
            let field = `
                <div class="mb-1 specfic_user_${role}">
                    <select class="form-control userSelect2 w-100" id="specfic_user_field_${role}" data-placeholder="Select user(s) for approval" multiple required></select>
                </div>
            `;

            $(field).insertAfter($field.parent())
            $.each(data, (k, v) => {
                $(`#specfic_user_field_${role}`).append(new Option(v, k, false, false))
            })
            $('.userSelect2').select2();
        })
        .catch(error => {
            console.error(error)

            Toast.fire({
                icon: "error",
                title: `Something went wrong. Please try again later. ${error}`
            })
        })
        .then(() => $field.removeClass('loading'))
}