$("#blockForm").on("submit", function(event){
	event.preventDefault();
	var formData = new FormData(this);

	$.ajax({
		type: 'POST',
		url: route(path+'store'),
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			$(event.target)[0].reset();
			$('#createBlockModal').modal('toggle');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			swal('Success', data.message , 'success')
		},
		error: function (data) {

        }
	});
});
