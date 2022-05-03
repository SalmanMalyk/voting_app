
var path = 'dashboard.master.membershiptypes.';
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
				data: "name",
				name: "name",
				className: "text-center"
			},
			{
				data: "membership_code",
				name: "membership_code",
				className: "text-center"
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

function deleteMembership(id) {
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
				swal('Success', 'Membership deleted successfully.', 'success')
			})
			.catch(err => swal('Warning', 'Something went wrong.', 'error'))
		}
	});
}
  