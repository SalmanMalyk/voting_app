var path = 'dashboard.master.town.';

$(() => {
	'use strict';

	$('.siteDataTable thead tr')
		.clone(true)
		.addClass('filters')
		.appendTo('.siteDataTable thead');
	
	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		orderCellsTop: true,
		scrollCollapse: true,
		select: true,
		ajax: route(`${path}index`),
		order: [[1, 'asc']],
		fixedHeader: {
			header: true,
			headerOffset: $('.content-header').height() - 8
		},
		initComplete: function () {
			var api = this.api();

			// For each column
			api
				.columns()
				.eq(0)
				.each(function (colIdx) {
					// Set the header cell to contain the input element
					var cell = $('.filters th').eq(
						$(api.column(colIdx).header()).index()
					);
					var title = $(cell).text();
					$(cell).html('<input type="text" class="form-control form-control-sm" placeholder="' + title + '" />');

					// On every keypress in this input
					$('input', $('.filters th').eq($(api.column(colIdx).header()).index()))
						.off('input')
						.on('input', function (e) {
							e.stopPropagation();

							// Get the search value
							$(this).attr('title', $(this).val());
							var regexr = '({search})'; //$(this).parents('th').find('select').val();

							var cursorPosition = this.selectionStart;
							// Search the column for that value
							api
								.column(colIdx)
								.search(
									this.value != ''
										? regexr.replace('{search}', '(((' + this.value + ')))')
										: '',
									this.value != '',
									this.value == ''
								)
								.draw();

							$(this)
								.focus()[0]
								.setSelectionRange(cursorPosition, cursorPosition);
						});
				});
		},
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
		dom: `<'row'
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
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center",
				orderable: false,
				searchable: false
			},
			{
				data: "name",
				name: "towns.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "zone.name",
				name: "zone.name",
				className: "text-left text-capitalize",
				defaultContent: "<b><i class='fas fa-exclamation-triangle text-warning mr-1'></i> No zone selected</b>",
			},

			{
				data: "blocks",
				name: "blocks",
				className: "text-left text-capitalize",
				defaultContent: "<b><i class='fas fa-exclamation-triangle text-info mr-1'></i> No blocks added</b>",
				orderable: false
			},
			{
				data: "customer_branches_count",
				name: "customer_branches_count",
				className: "text-center",
				defaultContent: 0,
				searchable: false
			},
			{
				data: "active_customers",
				name: "active_customers",
				className: "text-center",
				defaultContent: 0,
				searchable: false
			},
			{
				data: "delivery_source",
				name: "delivery_source",
				className: "text-center",
				render: {
					_: 'display',
					sort: 'status'
				},
				defaultContent: "—" 	
			},
			{
				data: "DeliverySchedule",
				name: "DeliverySchedule",
				className: "text-center",
				defaultContent: "—" 	
			},
			{
				data: "status",
				name: "towns.status",
				className: "text-center",
				render: {
					_: 'display',
					sort: 'status'
				},
				defaultContent: "—" 	
			},
			{
				data: "action",
				name: "action",
				className: "text-center",
				orderable: false,
				searchable: false
			},
		],
		createdRow: function( row, data, dataIndex ) {			
			if(!data.blocks) {
				$( row ).find('td:eq(3)').addClass('table-info');
			}

			if (!data.status.status) {
				$(row).find('td:eq(8)').addClass('table-danger');
			}

		},
		language: {
			"processing": `<div class="v-middle">
							<i class='fas fa-circle-notch fa-spin fa-3x text-muted mb-2'></i> 
							<br> 
							Processing
						  </div>`,
		}
	});


});


 function deleteTown(id) {
	Swal2.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		reverseButtons: true,	
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes, delete it!'
	  }).then((result) => {
		if (result.isConfirmed) {
			Dashmix.block('state_loading', '.siteBlock')
			axios.delete(route(`${path}destroy`, id))
			.then(({data}) => {
				if(data.success) {
					$(".siteDataTable").DataTable().ajax.reload(null, false);
					Toast.fire({
						title: data.message,
						icon: 'success'
					})
				} else {
					Swal2.fire({
						icon: 'warning',
						title: 'Warning',
						text: data.message,
						confirmButtonColor: '#e74c3c',

					})
				}
			})
			.catch(error => {
				console.error(error)
				Toast.fire({
					title: 'Something went wrong. Please try again!',
					icon: 'error'
				})
			})
			.then(() => Dashmix.block('state_normal', '.siteBlock'))
		}
	})
}
      