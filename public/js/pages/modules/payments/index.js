var path = 'dashboard.payment';

$(() => {
	'use strict';
	                                          
	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		bStateSave: true,
		order: [[1, 'desc']],
		buttons: [
			{ extend: "pageLength", className: "btn btn-sm btn-primary" },
			{ extend: "copy", className: "btn btn-sm btn-primary" },
			{ extend: "csv", className: "btn btn-sm btn-primary" },
			{ extend: "pdf", className: "btn btn-sm btn-primary" },
			{ extend: "print", className: "btn btn-sm btn-primary" },
			{
				text: 'Refresh',
				action: function (e, dt, node, config) {
					dt.ajax.reload();
				},
				className: "btn btn-sm btn-primary"
			}
		],
		lengthMenu: [
			[25, 50, 100, -1],
			['25 rows', '50 rows', '100 rows', 'Show all']
		],
		bLengthChange: false,
		dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left                                                                                                                                                                                        'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
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
				data: 'payment_date',
				name: 'payment_date',
				className: "text-right",
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
				},
				defaultContent: "—"
			},
			{
				data: "customer_branch.complete_name",
				name: "customerBranch.customer.name",
				className: "text-left text-capitalize",
				defaultContent: "—"
			},
			{
				data: "customer_branch.short_address",
				name: "customerBranch.address",
				className: "text-left text-capitalize",
				defaultContent: "—"
			},
			{
				data: "customer_branch.block.name",
				name: "customerBranch.block_id",
				className: "text-center text-capitalize",
				defaultContent: "—"
			},
			{
				data: "customer_branch.town.name",
				name: "customerBranch.town_id",
				className: "text-left text-capitalize",
				defaultContent: "—"
			},
			{
				data: "bank_name",
				name: "bank_name",
				className: "text-left text-capitalize",
				defaultContent: "—"
			},
			{
				data: "payment_type.title",
				name: "paymentType.title",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "document_number",
				name: "document_number",
				className: "text-right",
				defaultContent: "—"
			},
			{
				data: "amount",
				name: "amount",
				className: "text-right",
				type: 'num',
				render: $.fn.dataTable.render.number(','),
				defaultContent: null
				
			},
			{
				data: "created_by.name",
				name: "createdBy.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "updated_by.name",
				name: "updatedBy.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "action",
				name: "action",
				className: "text-center",
				orderable: false,
				searchable: false
			}
		],
		"footerCallback": function (row, data, start, end, display) {
			var api = this.api(), data;
			// Remove the formatting to get integer data for summation
			var intVal = function (i) {
				return typeof i === 'string' ?
					i.replace(/[\$,]/g, '') * 1 :
					typeof i === 'number' ?
						i : 0;
			};

			// Total over all pages
			let total = api.ajax.json().total;
			// Total over this page
			let pageTotal = api
				.column(9, { page: 'current' })
				.data()
				.reduce(function (a, b) {
					return intVal(a) + intVal(b);
				}, 0);
			// Update footer
			$(api.column(9).footer()).html(
				numeral(pageTotal).format('0,0') + ' ( ' + numeral(total).format('0,0') + ' Grand Total)'
			).addClass('font-w700 text-right');
		}

	});


	$('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row( this ).data();
        viewCustomerDetails(data.customer_branch.id, (data.customer_branch.complete_name || null));
    });
});


const resetForm = (form, modal) => {
	form[0].reset();
	$(".siteDataTable").DataTable().ajax.reload(null, false);
	form.find('[name="payment_type_id"]').trigger('change');
	$('.select2').val('').trigger('change');
	$(modal).modal('hide');
}


const removePayment = (id) => {
	event.preventDefault();

	Swal2.fire({
		title: 'Are you sure?',
		text: "This payment will be removed entirely!",
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
						title: data.message
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