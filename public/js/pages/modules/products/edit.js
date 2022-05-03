


//Edit Designation 
function editProduct(id) {
	$.get( route(path +'edit', id), function( data ) {
		console.log(data)
		$("#editRoleForm").attr('data-id', data.id);
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