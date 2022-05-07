var path = "dashboard.config.promotion";

$(document).ready(function() {
	getPromotions();
})

const getPromotions = async () => {
    
    Dashmix.layout('header_loader_on')

    await axios.get(route(`${path}.show`, 1)) 
        .then(({data}) =>  {
            $('.promotion').html(data)
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => Dashmix.layout('header_loader_off'))
}


//create promotion
$('#createPromotion').submit(function(event) {
	event.preventDefault()
	let formData = new FormData(this);
	formData.append('promotion_image', $(this).find('#promotion_image').prop('files')[0] || null)
	formData.append('_method', 'post');

	axios.post(route(`${path}.store`), formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(({data}) => {
			$('#createPromotionModal').modal('toggle');
			$(event.target)[0].reset();
			Swal2.fire({
				icon: 'success',
				title: 'Action Status',
				html: `${data.message}`,
				confirmButtonText: 'OK',
				allowOutsideClick: false,
				backdrop: true,
				confirmButtonColor: '#2ecc71'
			});
			getPromotions();
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: `Something went wrong.\nPlease try again later.\n${error}`
			})
		})
});

//Edit Milestone 
function editPromotion(id) {
    $.get(route(path+'.edit', id), function( data ) {
        $("#editPromotion").attr('data-id', id);
        $.each(data, function(index, value) {
            if (index == 'status') {
                $(`#editPromotion #editstatus`).prop('checked', data.status)
            } else {
                $(`#editPromotion [name="${index}"]`).val(value);
            }
        })
        $('#previousImage').attr("href", `/uploads/${data.image}`);
        $("#editPromotionModal").modal('show');
    });
}

$('#editPromotion').submit(function(event) {
	event.preventDefault()
	let id = $('#editPromotion').attr('data-id') 

	let formData = new FormData(this);

	formData.append('promotion_image', $(this).find('#edit_promotion_image').prop('files')[0] || null)
	formData.append('_method', 'patch');

	axios.post(route(`${path}.update`, id), formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(({data}) => {
			$('#editPromotionModal').modal('toggle');
			$(event.target)[0].reset();
			Swal2.fire({
				icon: 'success',
				title: 'Action Status',
				html: `${data.message}`,
				confirmButtonText: 'OK',
				allowOutsideClick: false,
				backdrop: true,
				confirmButtonColor: '#2ecc71'
			});
			getPromotions();
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: `Something went wrong.\nPlease try again later.\n${error}`
			})
		})
});

//Delete Promotion

function deletePromotion(id) {
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
                        
                        getPromotions();
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
