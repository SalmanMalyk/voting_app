
var path = 'dashboard.master.discounts.customer-discount';
$(() => {
	'use strict';
		
	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" }, 
            { extend: "copy", className: "btn btn-sm btn-primary" }, 
            { extend: "csv", className: "btn btn-sm btn-primary" }, 
            { extend: "pdf", className: "btn btn-sm btn-primary" }, 
            { extend: "print", className: "btn btn-sm btn-primary" }
        ],
		lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
        ],
		bLengthChange: false,
        dom: 	`<'row'
					<'col-sm-12 col-md-6' <'text-left bg-body-light'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
		colReorder: true,
		select: true,
		ajax: route(`${path}.index`),
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center",
				orderable: false, 
				searchable: false
			},
			{
				data: "customer.name",
				name: "customer.name",
				defaultContent: "—",

			},
			{
				data: "action",
				name: "action",
				defaultContent: "—"
			}
		],
		order: [],
	});
});









// $(() => {
// 	'use strict';

// 	var dataTable = $(".siteDataTable").DataTable({
// 		responsive: true,
// 		processing: true,
// 		serverSide: true,
// 		dom: 'Bfrtip',
// 		colReorder: true,
//         buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
// 		ajax: route(`${path}.index`),
// 		columns: [
// 			{
// 				data: "DT_RowIndex",
// 				name: "DT_RowIndex",
// 				className: "text-center"
// 			},
// 			{
// 				data: 'customer',
// 				name: 'custome.name',
// 				className: "text-right",
// 				type: 'num',
// 				render: {
// 					_: 'display',
// 					sort: 'value'
// 				},
// 				defaultContent: "—"
// 			},
// 			{
// 				data: 'product',
// 				name: 'product.name',
// 				className: "text-right",
// 				type: 'num',
// 				render: {
// 					_: 'display',
// 					sort: 'value'
// 				},
// 				defaultContent: "—"
// 			},
// 			{
// 				data: "action",
// 				name: "action",
// 				className: "text-center"
// 			}
// 		],
// 		order: [],
// 	});


// });
// $('.datepicker').datepicker();







 const deleteCustomerDiscount= (id) => {
	event.preventDefault();

	Swal2.fire({
		title: 'Are you sure?',
		text: "This Customer will be removed entirely!",
		icon: 'warning',
		reverseButtons: true,
		showCancelButton: true,
		confirmButtonColor: '#e74c3c',
		cancelButtonColor: '#bdc3c7',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			Dashmix.block('state_loading', '.siteBlock')

			axios.delete(route(`${path}.destroy`, id))
				.then(({ data }) => {
					$(".siteDataTable").DataTable().ajax.reload(null, false);
					Toast.fire({
						icon: 'success',
						title: 'Customer Discount deleted. Sucessfully!'
						
					})
				})
				.catch(error => {
					Toast.fire({
						icon: 'error',
						title: 'Something went wrong. Please try again!'
					})
				})
				.then(() => Dashmix.block('state_normal', '.siteBlock'))
		} else {
			Toast.fire({
				icon: 'info',
				title: 'Action canceled!'
			})
		}
	})

}

 