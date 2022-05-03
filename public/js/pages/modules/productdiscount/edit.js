function editProductdiscount(id) {
	$.get( route(route_prefix+'.edit', id), function( data ) {
		$("#editRoleForm").attr('data-id', data.id);
		// $('#customer_name').val(data.customer_branch.customer_name);
		$.each(data, function(index, value) {
				$(`#editRoleForm [name="${index}"]`).val(value);
		})
		$("#siteModalEdit").modal('show');
	});
}


//Update
$('#editRoleForm').submit(function(event) {
	event.preventDefault()
	let id = $(this).data('id') 
	$.ajax({
		url: route(route_prefix+'.update', id),
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