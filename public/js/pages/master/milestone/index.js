var path = 'dashboard.milestone';

$("#createMilestone").on("submit", function(event){
	event.preventDefault();
	var formData = new FormData(this);
	Swal2.fire({
		icon: 'question',
		title: 'Confirm',
		html: 'Are you sure to create this entry?',
		confirmButtonText: 'Yes, Continue',
		cancelButtonText: 'Cancel',
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#d33',
		showCancelButton: true,
		allowOutsideClick: false,
		backdrop: true,
		showLoaderOnConfirm: true,
		allowOutsideClick: () => !Swal2.isLoading(),
		preConfirm: async () => {
			await axios.post(route(`${path}.store`), formData)
			.then(({ data }) => {
				Swal2.fire({
					title: 'Success',
					icon: 'success',
					html: data.message,
					confirmButtonText: 'Done',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonColor: '#2ecc71'
				})
				.then((result) => {
					if (result.isConfirmed) {
						$('#createMilestoneModal').modal('toggle')
						$('.milestone').prepend(`
							<div class="col-xl-4">
								<a class="block block-rounded block-link-shadow" href="javascript:void(0)">
									<div class="block-content block-content-full ribbon ribbon-dark ribbon-modern ribbon-primary">
										<div class="ribbon-box">
											<div class="btn-group btn-group-sm mb-2" role="group" aria-label="Small Primary Third group">
												<button type="button" class="btn btn-primary"><i class="fa fa-pencil-alt" aria-hidden="true"></i></button>
												<button type="button" class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button>
											</div>
										</div>
										<div class="py-3 text-center">
											<i class="fa fa-flag fa-4x text-gray"></i>
											<p class="fs-lg text-dark mt-3 mb-0">
												${data.milestone.title}
											</p>
											<p class="text-muted mb-0">
												<strong>Reward</strong> ${data.milestone.reward}  $
											</p>
											<p class="fs-sm fw-bold text-muted mb-0">
												<strong>Vote Count</strong> ${data.milestone.vote_count}
											</p>
											
												<span class="badge badge-${data.milestone.status ? 'success' : 'danger'} badge-pill">
													<i class="fas fa-${data.milestone.status ? 'check' : 'times'}-circle fa-fw"></i> ${data.milestone.status ? 'Active' : 'In Active'}
												</span>
										</div>
									</div>
								<div class="block-content block-content-full block-content-sm text-center bg-body-light">
									<span class="fs-sm text-muted">Active for ${data.milestone.days} Days</span>
								</div>
							</a>
						</div>
							`);
						 $('#createMilestone').trigger("reset");
					}
				})
				return data;
			})
			.catch(error => {
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

});


//Delete milestone

function deleteMilestone(id){
	Swal2.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			axios.delete(route(`${path}.destroy`, id))
				.then(({ data }) => {
					if (data.success) {
						Toast.fire({
							title: data.message,
							icon: 'success'
						})

					} else {
						Swal2.fire({
							icon: 'warning',
							title: 'Warning',
							text: data.message,
							confirmButtonColor: '#e74c3c',
						})
					}
					 $(`.milestone-${id}`).remove();
				})
				.catch(error => {
					console.error(error)
					if (error.status == 403) {
						Toast.fire({
							title: error.response.message,
							icon: 'warning'
						})
					} else {
						Toast.fire({
							title: 'Something went wrong. Please try again!',
							icon: 'error'
						})
					}

				})
		}
	})
}