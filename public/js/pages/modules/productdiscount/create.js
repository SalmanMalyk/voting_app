var route_prefix='dashboard.master.discounts.product-discount';
$("#customerDiscountForm").on("submit", function(event){
	event.preventDefault();
	let formData = new FormData(this);
	let form = $(this)[0];

	axios.post(route(route_prefix+'store'), formData)
		.then((response) => {
			form.reset();
			$('.select2').val('').trigger('change');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			$('#siteModal').modal('toggle');
			swal('Success', response.data.message , 'success')
		})
		.catch(error => {
			swal('Warning', 'Something went wrong.' , 'error')
			console.log(error)
		})
});