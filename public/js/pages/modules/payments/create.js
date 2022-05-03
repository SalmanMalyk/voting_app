var route_prefix = 'dashboard.payment.';

$("#roleForm").on("submit", function(event){
	event.preventDefault();
	
	let formData = new FormData(this);
	Dashmix.block('state_loading', '.siteBlock')

	axios.post(route(route_prefix+'store'), formData)
		.then((response) => {
			resetForm($(this), '#siteModal');
			Toast.fire({
				icon: 'success',
				title: response.data.message
			})
		})
		.catch(error => {
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
			console.error(error)
		})

		.then(() => Dashmix.block('state_ normal', '.siteBlock'))
});

$(document).on('change', '#payment_type_id', () => {
	event.preventDefault();

	let type = document.getElementById('payment_type_id').value;

	if(type == 1) {
		$('.payment_type_filter').prop('hidden', false);
		$('#bank').prop('required', true)
		$('#doc_num').prop('required', true)
	} else if (type == 3) {
		$('#bad_dept_reason').prop('required', true)
	} else {
		$('.payment_type_filter').prop('hidden', true);
		$('#bank').prop('required', false)
		$('#doc_num').prop('required', false)
	}
})
