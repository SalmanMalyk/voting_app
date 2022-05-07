var path = "dashboard.config.milestone";

$(document).ready(function() {

getMilestones();

})

const getMilestones = async () => {
    
    Dashmix.layout('header_loader_on')

    await axios.get(route(`${path}.show`, 1)) 
        .then(({data}) =>  {
            $('.milestone').html(data)
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => Dashmix.layout('header_loader_off'))
}

$("#createMilestone").on("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    Swal2.fire({
        icon: "question",
        title: "Confirm",
        html: "Are you sure to create this entry?",
        confirmButtonText: "Yes, Continue",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        allowOutsideClick: false,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal2.isLoading(),
        preConfirm: async () => {
            await axios
                .post(route(`${path}.store`), formData)
                .then(({ data }) => {
                    Toast.fire({
                        title: data.message,
                        icon: "success",
                    });
                    $("#createMilestoneModal").modal("toggle");
                    getMilestones();
                    $("#createMilestone").trigger("reset");
                    return data;
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        let messages = "";
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        });
                        Swal2.showValidationMessage(`${messages}`);
                    } else {
                        Swal2.showValidationMessage(`Request failed: ${error}`);
                    }
                });
        },
    });
});

//Delete milestone

function deleteMilestone(id) {
    Swal2.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#2ecc71",
        cancelButtonColor: "#e74c3c",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(route(`${path}.destroy`, id))
                .then(({ data }) => {
                    if (data.success) {
                        Toast.fire({
                            title: data.message,
                            icon: "success",
                        });
                        
                        getMilestones();
                    } else {
                        Swal2.fire({
                            icon: "warning",
                            title: "Warning",
                            text: data.message,
                            confirmButtonColor: "#e74c3c",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (error.status == 403) {
                        Toast.fire({
                            title: error.response.message,
                            icon: "warning",
                        });
                    } else {
                        Toast.fire({
                            title: "Something went wrong. Please try again!",
                            icon: "error",
                        });
                    }
                });
        }
    });
}


//Edit Milestone 
function editMilestone(id) {
    $.get(route(path+'.edit', id), function( data ) {
        $("#updateMilestone").attr('data-id', id);
        $.each(data.milestone, function(index, value) {
            if (index == 'status') {
                $(`#updateMilestone #editstatus`).prop('checked', data.milestone.status)
            } else {
                $(`#updateMilestone [name="${index}"]`).val(value);
            }
        })
        $("#editMilestoneModal").modal('show');
    });
}

//Update Milestone
$('#updateMilestone').submit(function(event) {
    event.preventDefault()
    let id = $(this).attr('data-id') 
    $.ajax({
        url: route(path+'.update', id),
        method: 'PATCH',
        data: $(this).serialize(),
        success: function(data) {
            $(event.target)[0].reset();

            getMilestones();

            $("#editMilestoneModal").modal('hide');
            Toast.fire({
                title: data.message,
                icon: 'success'
            })
        },
        error: function (error) {
            if(error.status) {
                Toast.fire({
                    title: error.responseJSON.message,
                    icon: 'warning'
                })
            } else {
                Toast.fire({
                    title: 'Somthing went wrong. Please try again!',
                    icon: 'error'
                })
            }
        },
    })
});
