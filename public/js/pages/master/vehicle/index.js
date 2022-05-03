var path = 'dashboard.master.vehicle.';

$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		dom: 'Bfrtip',
		colReorder: true,
        buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
		ajax: route(`${path}index`),
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center"
			},
			{
				data: "registration_number",
				name: "registration_number",
				className: "text-center"
			},
			{
				data: "engine_number",
				name: "engine_number",
				className: "text-center text-capitalize"
			},
			{
				data: "make",
				name: "make",
				className: "text-center"
			},
			{
				data: "model_year",
				name: "model_year",
				className: "text-center text-capitalize"
			},
			{
				data: "bottle_capacity",
				name: "bottle_capacity",
				className: "text-center text-capitalize"
			},
			{
				data:"token_expiry_date",
				name:"token_expiry_date",
				className:"text-center text-capitalize" 
			},
			{
				data:"vehicle_image",
				name:"vehicle_image",
				className: "text-center",
   				 "render": function (data) {
       return '<img src="/uploads/vehicles/images/' + data + '" class="avatar float-center" width="70" height="70" />';
       }
			},
			{
				data: "action",
				name: "action",
				className: "text-center"
			}
			
		],
		order: [],
	});
});

function deleteVehicle(id) {
	swal({
		title: "Warning",
		text: "Are you sure to delete this data?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			axios.delete(route(`${path}destroy`, id))
			.then(resp => {
				$(".siteDataTable").DataTable().ajax.reload(null, false);
				swal('Success', 'Vehicle deleted successfully.', 'success')
			})
			.catch(err => swal('Warning', 'Something went wrong.', 'error'))
		}
	});
}
$(document).ready(function(){  

	var count_rows = 1; 

    $("#addAttachmentRow").click(function(){
        $(".vehicle_attachments").append(`
        	<div class="col-md-12 row_${count_rows}">
				<div class="form-row border p-2 mb-2">
					<div class="col-md-6">
						<label class="font-sm mb-0">Title:</label>
						<input type="text" placeholder="Attachment title" id="title_${count_rows}" name="title[${count_rows}]" class="form-control form-control-sm" required>
					</div>

					<div class="col-md-5">
						<label class="font-sm mb-0">File:</label>
						<input type="file" class="form-control form-control-sm" id="attach_${count_rows}" name="attach[${count_rows}]" required>
					</div>

					<div class="col-md-1">
						<button type="button" class="btn btn-block btn-square btn-sm btn-danger mt-4" onclick="removeRow(${count_rows})">
							<i class="fas fa-times"></i>
						</button>
					</div>
				</div>
			</div>
		`);
		count_rows++;  
    });  
});

function removeRow(count){
       $('.row_'+count).remove();
}

function showVehicle(id) {

			axios.get( route(path+'show', id))
			 .then(({data}) => {
			 	$('.registration_number').html(data.registration_number)
			 	$('.engine_number').html(data.engine_number)
			 	$('.make').html(data.make)
			 	$('.bottle_capacity').html(data.bottle_capacity)
			 	$('.model_year').html(data.model_year)
			 	$('.token_expiry_date').html(data.token_expiry_date)
			 	$('.vehicle_image').prop('src', '/uploads/vehicles/images/'+data.vehicle_image)
			 	let table=$('.attachment-table tbody')
			 	table.empty()
			 	$.each(data.attachments, (k, v) => {
					table.append(`
						<tr>
							<td align="center">${++k}</td>
							<td>${v.title}</td>
							<td>
								<a href="/uploads/vehicles/attachments/${v.attach}" target="_blank">Download</a>
							</td>
						</tr>
					`)
				})
			$('#showModal').modal('show');
            })
			
}


