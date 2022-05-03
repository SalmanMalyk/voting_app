$(function() {
	$('[name="select_all"]').on('change', e => selectAllCheckboxes(e))
})



//Edit Designation 
function editTown(id) {
	
	Dashmix.block('state_loading', '.siteBlock')

	$.get(route(path+'edit', id), function( data ) {
		$("#editScheduleForm").attr('data-id', data.id);

		$.each(data, function(index, value) {
			$(`#editScheduleForm [name="${index}"]`).val(value);
		})

		$('#town_delivery_schedule').val(data.town_days).trigger('change');

		$(`#editScheduleForm #status`).prop('checked', data.status)
		
		Dashmix.block('state_normal', '.siteBlock')
		
		$("#siteModalEdit").modal('show');
	});
}

/**
 * update and show customers which are assigned in selected town
 * 
 * @param {int} id  town id
 */
const deliverySchedule = id => {
	Dashmix.block('state_loading', '.siteBlock')

	let popup = $('#deliveryScheduleModal'),
		table = $('.town_customers');

	$('#deliveryScheduleForm').attr('data-id', id)

	axios.get(route(`${path}show`, id))
		.then(({data}) => {
			// set title
			popup.find('.modal-title').html(`Delivery schedule for <b>"${data.town.name}"</b>`)
			// append customers into table
			if (data.town.customer_branches.length > 0) {
				let customers = '';
				data.town.customer_branches.forEach((item, indx) => {
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
/**
 * selects all child checkboxes within table 
 * 
 * @param {*} e event triggered by select all checkbox 
 */
const selectAllCheckboxes = e => {
	e.preventDefault();
	let selectAll = $(e.target).is(':checked');
	$('.town_customers tbody input[type="checkbox"]').prop('checked', selectAll)
}


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


$('#deliveryScheduleModal').on('hidden.bs.modal', function (e) {
	$('#deliveryScheduleForm')[0].reset();
	$('#deliveryScheduleForm .select2').val('').trigger('change');
})


$('#deliveryScheduleForm',).on('submit', function() {
	event.preventDefault();

	let formData = new FormData($(event.target)[0]),
		id  	 = $(event.target).attr('data-id'),
		btn 	 = $('.x-save-delivery');

	if ($('.town_customers tbody input:checked').length < 1) {
		Toast.fire({
			icon: "warning",
			title: "At least 1 customer required to update these changes!"
		})
		return;
	}

	btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Saving...').prop('disabled', true)

	// send axios
	axios.post(route(path + 'updateDeliverySchedule', id), formData)
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



//Update
$('#editScheduleForm').submit(function(event) {
	event.preventDefault()
	let id = $(this).attr('data-id') 
	Dashmix.block('state_loading', '.siteBlock')
	$.ajax({
		url: route(path+'update', id),
		method: 'PATCH',
		data: $(this).serialize(),
		success: function(data) {
			$(event.target)[0].reset();
			

			$(".siteDataTable").DataTable().ajax.reload(null, false);
			Toast.fire({
				title: data.message,
				icon: 'success'
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
		complete: () => Dashmix.block('state_normal', '.siteBlock')
	})
});

	
const add_blocks = id => {

	let popup = $('#createBlockModal');
	$('#createBlockModal').modal('toggle');
	$('#createBlockForm').attr('data-id', id)
}


$('#createBlockForm').submit(function() {
	event.preventDefault();

	let formData = new FormData(this),
	id  	 = $(event.target).attr('data-id');

	Swal2.fire({
		title: `Confirm`,
		text: "Are you sure to create this block?",
		icon: 'question',
		showCancelButton: true,
		reverseButtons: false,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes',
		showLoaderOnConfirm: true,
		preConfirm: async () => {
			await axios.post(route('dashboard.master.town.add_blocks',id), formData)
			.then(({data}) => {
				$('#createBlockForm')[0].reset();
				$('#createBlockModal').modal('toggle');
				$(".siteDataTable").DataTable().ajax.reload(null, false);
				Toast.fire({
					icon: "success",
					title: data.message
				})
				return data;
			})
			.catch(error => {
				if (error.response.status == 420) {
					let messages = '';
					$.each(error.response.data.errors, (k, v) => {
						messages += `${v[0]} <br>`;
					})
					Swal2.showValidationMessage(
						`${messages}`
						)
				} else {
					Swal2.showValidationMessage(
						`Request failed: ${error}`
						)
				}

			})
		},
		allowOutsideClick: () => !Swal2.isLoading()
	})
});