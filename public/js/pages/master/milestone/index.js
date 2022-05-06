var path = 'dashboard.milestone.';
$("#createMilestone").on("submit", function(event){
	event.preventDefault();
	alert();
	var formData = new FormData(this);
console.log(formData);
	axios.post(route(path+'store'), formData)
		.then(({data}) => {
			$(event.target)[0].reset();
			$('#createMilestoneModal').modal('toggle');
			Toast.fire({
				title: data.message,
				icon: 'success'
			})
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				title: 'Somthing went wrong. Please try again!',
				icon: 'error'
			})
		})
});





