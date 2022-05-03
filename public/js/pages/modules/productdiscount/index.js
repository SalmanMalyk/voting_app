var route_prefix='dashboard.master.discounts.product-discount';
var path = 'dashboard.master.discounts.product-discount';
$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		dom: 'Bfrtip',
		colReorder: true,
        buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
		ajax: route(`${path}.index`),
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center"
			},
			{
				data: "price_discount",
				name: "price_discount",
				className: "text-right"
			},
			{
				data: "date_from",
				name: "date_from",
				className: "text-left text-capitalize"
			},
			{
				data: "date_to",
				name: "date_to",
				className: "text-left text-capitalize"
			}
		],
		order: [],
	});


});
$('.datepicker').datepicker();





function deleteProductdiscount(id) {
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
				swal('Success', 'Product discount deleted successfully.', 'success')
			})
			.catch(err => swal('Warning', 'Something went wrong.', 'error'))
		}
	});
}
  