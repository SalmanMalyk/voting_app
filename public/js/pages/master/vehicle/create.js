$("#vehicleForm").on("submit", function(event){
	event.preventDefault();
	var formData = new FormData(this);
	Dashmix.block('state_loading', '.siteBlock')

	axios.post(route(path+'store'), formData)
		.then(({data}) => {
			$(event.target)[0].reset();
			$('#siteModal').modal('toggle');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
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
		.then(() => Dashmix.block('state_normal', '.siteBlock'))
});