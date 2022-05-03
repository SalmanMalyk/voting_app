var path = 'dashboard.master.block.';

$(function () {
	$('[name="select_all"]').on('change', e => selectAllCheckboxes(e))
})

$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		select: true,
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
		ajax: route(`${path}index`),
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center",
				searchable: false,
				orderable: false
			},
			{
				data: "name",
				name: "name",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "town.name",
				name: "town.name",
				className: "text-left text-capitalize",
				defaultContent: "<b><i class='fas fa-exclamation-triangle text-warning mr-1'></i> No Town Selected</b>",
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
				data: "delivery_schedule",
				name: "delivery_schedule",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "status",
				name: "status",
				className: "text-center",
				render: {
					_: 'display',
					sort: 'status'
				},
				defaultContent: "—"
			},
			{
				data: "on_call_delivery",
				name: "on_call_delivery",
				className: "text-center",
				render: {
					_: 'display',
					sort: 'status'
				},
				defaultContent: "—",
				"visible": false
			},

			{
				data: "action",
				name: "action",
				className: "text-center"
			}

		],
		order: [[1, 'asc'], [2, 'asc']],
		createdRow: function (row, data, dataIndex) {
			if (!data.status.status) {
				$(row).find('td:eq(7)').addClass('table-danger');
			}

		}
	});


});


/**
 * create block from popup modal
 */
$("#blockForm").on("submit", function (e) {
	e.preventDefault();

	var formData = new FormData(this);
	Dashmix.block('state_loading', '.siteBlock')
	axios.post(route(path + 'store'), formData)
		.then(({ data }) => {
			$(e.target)[0].reset();
			$('#createBlockModal').modal('toggle');
			$("#blockForm .select2").val(null).trigger('change')
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			Toast.fire({
				title: data.message,
				icon: 'success'
			})
		})
		.catch(err => {
			console.error(err)
			Toast.fire({
				icon: 'error',
				title: `Something went wrong.\nPlease try again.\n${err}`
			})
		})
		.then(() => Dashmix.block('state_normal', '.siteBlock'))
});




//Edit Designation 
const editBlock = id => {
	Dashmix.block('state_loading', '.siteBlock')

	$.get(route(path + 'edit', id), function (data) {

		$("#editBlockForm").attr('data-id', data.id);

		$.each(data, function (index, value) {
			$(`#editBlockForm [name="${index}"]`).val(value).trigger('change');
		})

		$('#edit_delivery_schedule').val(data.block_days).trigger('change'); 

		$(`#editBlockForm #status`).prop('checked', data.status)

		Dashmix.block('state_normal', '.siteBlock')

		$("#siteModalEdit").modal('show');
	});
}


//Update
$('#editBlockForm').submit(function (event) {
	event.preventDefault()
	let id = $(this).attr('data-id')
	$.ajax({
		url: route(path + 'update', id),
		type: 'PATCH',
		data: $(this).serialize(),
		success: function (data) {
			$(event.target)[0].reset();
			$('#siteModalEdit').modal('toggle');
			$('#editBlockForm .select2').val('').trigger('change');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			Toast.fire({
				title: data.message,
				icon: "success"
			})
		},
		error: function (error) {
			if(error.status) {
				Toast.fire({
					title: error.responseJSON.message,
					icon: 'warning'
				})
			} else {
				Toast.fire({
					title: 'Somthing went wrong. Please try again!',
					icon: 'error'
				})
			}
		},
	})
});


function deleteBlock(id) {
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
				.then(({ data }) => {
					if (data.success) {
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
					if (error.status == 403) {
						Toast.fire({
							title: error.response.message,
							icon: 'warning'
						})
					} else {
						Toast.fire({
							title: 'Something went wrong. Please try again!',
							icon: 'error'
						})
					}

				})
				.then(() => Dashmix.block('state_normal', '.siteBlock'))
		}
	})
}
const deliverySchedule = id => {
	Dashmix.block('state_loading', '.siteBlock')

	let popup = $('#deliveryScheduleModal'),
		table = $('.block_customers');

	$('#deliveryScheduleForm').attr('data-id', id)

	axios.get(route(`${path}show`, id))
		.then(({data}) => {
			// set title
			popup.find('.modal-title').html(`Delivery schedule for <b>"${data.block.name}"</b>`)
			// append customers into table
			if (data.block.customer_branches.length > 0) {
				let customers = '';
				data.block.customer_branches.forEach((item, indx) => {
					customers += `
						<tr>
							<td align="center" style="vertical-align: middle;">
								<input type="checkbox" name="customers[]" value="${item.id}" class="customer_checkbox" onchange="checkForSelection()">
							</td>
							<td style="vertical-align: middle;">${item.complete_name || '—'}</td>
							<td style="vertical-align: middle;">${item.short_address || '—'}</td>
							<td style="vertical-align: middle;">${item.block.name || '—'}</td>
							<td style="vertical-align: middle;">${item.town.name || '—'}</td>
							<td style="vertical-align: middle;">${constants.delivery_sources[item.delivery_source] || '—'}</td>
							<td style="vertical-align: middle;">${item.delivery_schedule || '—'}</td>
						</tr>
					`;
				})
				table.find('tbody').html(customers)
			} else {
				table.find('tbody').html(`
					<tr>
						<td colspan="4" align="center" style="vertical-align: middle;">
							<i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i> No Customer(s) Found
						</td>
					</tr>
				`)
			}

			popup.modal('toggle')
		})
		.catch(error => console.error(error))
		.then(() => Dashmix.block('state_normal', '.siteBlock'))
}
$('#deliveryScheduleForm',).on('submit', function() {
	event.preventDefault();

	let formData = new FormData($(event.target)[0]),
		id  	 = $(event.target).attr('data-id'),
		btn 	 = $('.x-save-delivery');

	if ($('.block_customers tbody input:checked').length < 1) {
		Toast.fire({
			icon: "warning",
			title: "At least 1 customer required to update these changes!"
		})
		return;
	}

	btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Saving...').prop('disabled', true)

	// send axios
	axios.post(route(path + 'updateDeliveryScheduleBlock', id), formData)
		.then(response => {
			console.log(response)
			Toast.fire({
				icon: "success",
				title: response.data.message
			})
			$('#deliveryScheduleForm')[0].reset();
			$('#deliveryScheduleForm .select2').val('').trigger('change');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			$('#deliveryScheduleModal').modal('toggle');
			
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: "error",
				title: `Something went wrong.\nPlease try again.\n${error}`
			})
		})
		.then(() => btn.html('<i class="fas fa-cloud-upload-alt mr-1"></i> Submit').prop('disabled', false))
	
	
})
const checkForSelection = () => {
	let checked   = $('input.customer_checkbox:checked').length, unchecked = $('input.customer_checkbox').length;

	if (checked == unchecked) {
		$('[name="select_all"]').prop({
			indeterminate: false,
			checked: true
		});
	} else if (checked > 0){
		$('[name="select_all"]').prop({
			indeterminate: true,
			checked: false
		});
	} else {
		$('[name="select_all"]').prop({
			indeterminate: false,
			checked: false
		});
	}
}
const selectAllCheckboxes = e => {
	e.preventDefault();
	let selectAll = $(e.target).is(':checked');
	$('.block_customers tbody input[type="checkbox"]').prop('checked', selectAll)
}