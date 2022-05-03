
var path = 'dashboard.products.';
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
			data: "category",
			name: "category",
			className: "text-center"
		},
		{
			data: "stock",
			name: "stock",
			className: "text-center"
		},
		{
			data: "average_cost",
			name: "average_cost",
			className: "text-center"
		},
		{
			data: "price",
			name: "price",
			className: "text-center"
		},
		{
			data: "price_corporate",
			name: "price_corporate",
			className: "text-center"
		},
		{
			data: "price_home",
			name: "price_home",
			className: "text-center"
		},
		{
			data: "price_retailer",
			name: "price_retailer",
			className: "text-center"
		},
		{
			data: "opening_balance",
			name: "opening_balance",
			className: "text-center"
		},
		{
		
			data: "product_image",
			name: "product_image",
			className: "text-center",
			
		    
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

function deleteProduct(id) {
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
				swal('Success', 'Product deleted successfully.', 'success')
			})
			.catch(err => swal('Warning', 'Something went wrong.', 'error'))
		}
	});
}
  
