$(document).on('change', '#edit_pay_type', function() {
	let type = document.getElementById('edit_pay_type').value;

	$('.payment_type_filter').prop('hidden', type == 1 ? false : true);
	$('.payment_type_filter input').prop('required', type == 1 ? true : false)
})

//Edit Designation 
function editPayment(id) {
	Dashmix.block('state_loading', '.siteBlock')

	axios.get(route(`${path}.edit`, id))
		.then(({data}) => {
			$("#editRoleForm").attr('data-id', data.id);
			$('#customer_name').val(data.customer_branch.customer_name);
			$('.payment_type_filter').prop('hidden', data.payment_type_id == 1 ? false : true)
			$('.payment_type_filter input').prop('required', data.payment_type_id == 1 ? true : false)

			$.each(data, function(index, value) {
				$(`#editRoleForm [name="${index}"]`).val(value);
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
$('#editRoleForm').submit(function(event) {
	event.preventDefault()
	let id = $(this).data('id') 
	$.ajax({
		url: route(path+'update', id),
		type: 'PATCH',
		data: $(this).serialize(),
		success: function(data) {
			$(event.target)[0].reset();
			$('#siteModalEdit').modal('toggle');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			swal('Update', data.message , 'success')
		},
		error: function (data) {

		}
	})
});