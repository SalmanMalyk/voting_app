
//Edit Designation 
function editCustomerDiscount(id) {
	Dashmix.block('state_loading', '.siteBlock')

	axios.get(route(`${path}.edit`, id))
		.then(({data}) => {
			$("#editCustomerDiscountForm").attr('data-id',data.id)
			$("#customer_id_edit").html(`<option value="${data.customer_id}" selected>${data.customer.name}</option>`);
            $("#product_id_edit").html(`<option value="${data.product_id}" selected>${data.product.name}</option>`);
            $.each(data, function(index, value) {
		$(`#editCustomerDiscountForm [name="${index}"]`).val(value);
		})
			$("#siteModalEdit").modal('show');

		})
		.catch(error => {
			console.error('Something went wrong: '+error)
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
		})

		.then(() => Dashmix.block('state_normal', '.siteBlock'))
}


//Update
$(document).on('submit', '#editCustomerDiscountForm', function(event) {
	event.preventDefault()
	Dashmix.block('state_loading', '.siteBlock')
	let id = $(this).data('id') 
	axios.patch(route(`${path}.update`, id), $(this).serialize())
		.then(({data}) => {
			$("#siteModalEdit").modal('hide');
			Toast.fire({
				icon: 'success',
				title: data.message
			})
		})
		.catch(error => {
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
		})
		.then(() => Dashmix.block('state_normal', '.siteBlock'))

});

