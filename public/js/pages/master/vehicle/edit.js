

function editVehicle(id) {
	$.get( route(path+'edit', id), function(data) {
		$("#editVehicleForm").attr('data-id', data.id);
		$.each(data, function(index, value) {
		$(`#editVehicleForm [name="${index}"]`).val(value);
		})
		$("#siteModalEdit").modal('show');
	});
}


//Update
$('#editVehicleForm').submit(function(event) {
	event.preventDefault()
	let id = $(this).data('id') 
	var formData = new FormData(this);
	axios.patch(route(path+'update', id), formData)
		.then(({data}) => {
			console.log(data)
			$(event.target)[0].reset();
			$('#siteModalEdit').modal('toggle');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			Toast.fire({
				title: data.message,
				icon: 'success'
			})
		})
		
	})
