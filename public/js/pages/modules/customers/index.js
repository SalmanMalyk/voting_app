var path = 'dashboard.customers';

$(() => {
	'use strict';

	$('.siteDataTable thead tr')
		.clone(true)
		.addClass('filters')
		.appendTo('.siteDataTable tfoot');

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		orderCellsTop: true,
		scrollCollapse: true,
		order: [[11, 'desc']],
		colReorder: true,
		select: true,
		ajax: route(`${path}.index`),
		fixedHeader: {
			header: true,
			headerOffset: $('.content-header').height() - 8
		},
		columnDefs: [
			{
				targets: [1],
				orderable: false,
				searchable: false,
				visible: false
			}
		],
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
		lengthMenu: [
			[25, 50, 100, -1],
			['25 rows', '50 rows', '100 rows', 'Show all']
		],
		dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
		
		columns: [
			{
				data: "DT_RowIndex",
				name: "DT_RowIndex",
				className: "text-center",
				orderable: false,
				searchable: false
			},
			{
				data: "id",
				name: "id",
				className: "d-none",
				orderable: false,
				searchable: false
			},
			{
				data: "customer.customer_type.name",
				name: "customer.customerType.name",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "customer.membership_no",
				name: "customer.membership_no",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "name",
				name: "customer.name",
				render: {
					_: 'display',
					sort: 'value'
				},
				defaultContent: "—"
			},
			{
				data: "short_address",
				name: "address",
				defaultContent: "—"
			},
			{
				data: "block.name",
				name: "block.name",
				defaultContent: "—",
				className: "text-left",
			},
			{
				data: "town.name",
				name: "town.name",
				defaultContent: "—",
				className: "text-left",
			},
			{
				data: "contact_person",
				name: "contact_person",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "contact_no",
				name: "contact_no",
				className: "text-right",
				defaultContent: "—"
			},
			{
				data: "delivery_source",
				name: "delivery_source",
				className: "text-center",
				render: {
					_: 'display',
					filter: 'display',
					sort: 'sort'
				},
				defaultContent: "—"
			},
			{
				data: "created_at",
				name: "customer_branches.created_at",
				className: "text-right",
				render: {
					_: 'display',
					sort: 'timestamp'
				},
				defaultContent: "—"
			},
			{
				data: "status",
				name: "status",
				className: "text-center",
				searchable: false
			},
			{
				data: "action",
				name: "action",
				className: "text-center",
				searchable: false,
				orderable: false
			}
		],
		language: {
			"processing": `<div class="v-middle">
				<i class='fas fa-circle-notch fa-spin fa-3x text-primary mb-2'></i> 
				<br> 
				Processing
			</div>`,
		}
	});


	$('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row( this ).data();
        viewCustomerDetails(data.id, data.customer.name);
    });

	$('#quickTownForm').submit(function() {
		event.preventDefault();

		let formData = new FormData(this);

		Swal2.fire({
			title: `Confirm`,
			text: "Are you sure to create this town?",
			icon: 'question',
			showCancelButton: true,
			reverseButtons: false,
			confirmButtonColor: '#2ecc71',
			cancelButtonColor: '#e74c3c',
			confirmButtonText: 'Yes',
			showLoaderOnConfirm: true,
			preConfirm: async () => {
				await axios.post(route('dashboard.master.town.createQuickTown'), formData)
					.then(({data}) => {
						$('#town_id').append(new Option(data.town_name, data.town_id, true, true)).trigger('change');
						$('#quickTownForm')[0].reset();
						$('#quickTownForm select').val(null).trigger('change')
						$('#createTownModal').modal('toggle');
						
						Toast.fire({
							icon: "success",
							title: data.message
						})
						return data;
					})
					.catch(error => {
						if (error.response.status == 422) {
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
	})
	
	$('.x-add-block').on('click', e => {
		e.preventDefault();

		try {
			let townClass = $(e.target).attr('data-town'),
				town = $(townClass).select2('data');

			if (!town.length) {
				$('.x-add-block').notify('Please select town first in order to create block.', {
					position: 'left middle',
					className: 'warn'
				});
				return false;
			}

			$('#createBlockModal #quickBlockForm_town_id').html(new Option(town[0].text, town[0].id, true, true)).prop('readonly', true)
			$('#createBlockForm').attr('data-block', $(e.target).attr('data-block'))
			$('#createBlockModal').modal('show')
		} catch (error) {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: `Something went wrong.\nPlease try again.\n${error}`
			})
		}
	})
	
	
	$('#createBlockForm').submit(function() {
		event.preventDefault();

		let formData = new FormData(this),
			blockInput = $(event.target).attr('data-block');

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
				await axios.post(route('dashboard.master.block.createQuickBlock'), formData)
					.then(({data}) => {
						$(blockInput).append(new Option(data.block_name, data.block_id, true, true)).trigger('change');
						$('#createBlockForm')[0].reset();
						$('#createBlockModal').modal('toggle');
						
						Toast.fire({
							icon: "success",
							title: data.message
						})
						return data;
					})
					.catch(error => {
						if (error.response.status == 422) {
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
	})

});


$(document).on('change.select2', '#town_id', e => {
	e.preventDefault();
	$("#block_id").empty();
})


$(document).on('change.select2', '#create_customer_type_id', e => {
	e.preventDefault();

	let customerType = e.target.value,
		corporateDiv = $('.corporateDiv');

	if (customerType == 1) {
		corporateDiv.prop('hidden', false)
		$('#branch_name').parent('div').prop('hidden', false)
		$('#branch_name').prop('required', true)
	} else {
		corporateDiv.prop('hidden', true)
		$('#branch_name').parent('div').prop('hidden', true)
		$('#branch_name').prop('required', false)
	}
})


$(document).on('change.select2', '#branch_town_id', e => {
	e.preventDefault();

	let town = e.target.value;
	$(".branch_block_id").empty();
	if (town) {
		axios.get(route(`api.getTownBlocks`), {
			params: {
				town_id: town
			}
		})
		.then(response => {
			let options = [];
			$.each(response.data, (k, v) => {
				options[k] = new Option(v, k, true, true);
			})
			$(".branch_block_id").append(options);
		})
		.catch(error => {
			console.error(error)
			$.notify('Something went wrong. Please try again!')
		})
	}
})


const checkForNumberExistence = () => {
	event.preventDefault();

	let phone = event.target.value,
		field = $(event.target);

	if (phone) {
		$(field).addClass('loading').removeClass('is-valid is-invalid');
		axios.get(route(`dashboard.invoices.checkCustomerByPhone`, phone))
			.then(response => {
				if (!response.data.status) {
					field.val('')
					$(field).addClass('is-invalid')
					$(field).notify('Customer already exists against this number.')
				} else {
					$(field).addClass('is-valid')
				}
			})
			.catch(error => {
				console.error(error)
				$.notify('Something went wrong. Please try again!')
			})
			.then(() => $(field).removeClass('loading'))
	}

}


$('#createCustomerModal').on('hide.bs.modal', function (e) {
	resetCustomerCreationForm();
})


// submit customer form
$(document).on('submit', '#createCustomerForm', function (e) {
	e.preventDefault();

	let formData = new FormData(this);
	let branchesFormData = new FormData($('#branchForm')[0]);

	// send ajax to server
	axios.post(route(`${path}.store`), formData)
		.then(response => {
			$.notify(response.data.message, 'success')
			// RESET FORM
			$('#createCustomerForm')[0].reset();
			$(`#createCustomerForm .select2`).val('').trigger('change');
			// remove branches
			$('.corporateDiv .form-row').empty();
			$('.corporateDiv .form-row').append(`
				<div class="col-md-12 empty-alert">
					<div class="alert alert-warning mb-0 p-1 px-2 rounded-0 font-sm" role="alert">
						<i class="fas fa-exclamation-triangle"></i> No branch added
					</div>
				</div>
			`)
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			// hide modal
			$('#siteModal').modal('hide')
		})
		.catch(error => {
			console.error(error)
			if (error.response) {
				$.notify(`Something went wrong! (${error.response.data.message})`, 'error')
			} else if (error.request) {
				$.notify('Something went wrong. Please try again!')
			} else {
				$.notify('Something went wrong. Please try again!')

			}
		})
})


const resetCustomerCreationForm = () => {
	// reset customer create form
	$('#branchForm')[0].reset();
	$('#branchForm .select2').val('').trigger('change');
	$('#branchForm #contact_no, #createCustomerForm #phone_office').removeClass('loading is-valid is-invalid');
}


branch_count = 1;


$(document).on('submit', '#branchForm', event => {
	event.preventDefault();

	let formData = $(event.target).serializeArray(),
		corporateDiv = $('.corporateDiv .form-row');

	corporateDiv.find('.empty-alert').remove();

	let inputs = ``;

	$(formData).each(function (index, obj) {
		inputs += `<input type="hidden" data-name="${obj.name}" name="${obj.name}[${branch_count}]" value="${obj.value}" />`;
	});

	inputs += `<input type="hidden" data-name="count-id" name="count-id[${branch_count}]" value="${branch_count}" />`;

	let html = `
		<div class="col-md-12 mb-2" id="customer_branch_${branch_count}">
			<div class="bg-light mb-0 p-2 px-2 rounded-0 font-sm hvr-icon-wobble-horizontal w-100 clearfix" role="alert">
				<div class="float-left">
					<i class="fas fa-arrow-right mr-2 hvr-icon mr-2"></i>${$('#branch_address').val()}
				</div>
				${inputs}
				<div class="float-right">
					<a href="javascript:void(0)" class="mr-1" title="Edit Branch" onclick="editCustomerBranch(${branch_count})" style="cursor: pointer;">
						<i class="fas fa-pencil-alt text-warning mt-1"></i>
					</a>
					
					<a href="javascript:void(0)" title="Remove Branch" onclick="removeCustomerBranch(${branch_count})" style="cursor: pointer;">
						<i class="fas fa-times text-danger mt-1"></i>
					</a>
				</div>
			</div>
		</div>
	`;

	corporateDiv.append(html);

	branch_count++;

	// TODO: remove old div which is updating
	let previousCount = $(`#branchForm [data-name="count-id"]`).val();

	if (previousCount) {
		$(`#customer_branch_${previousCount}`).remove();
		$.notify('Branch Updated', 'message')
	} else {
		$.notify('New Branch Added', 'message')
	}

	$('#branchModal').modal('hide')
})


$('#branchModal').on('hidden.bs.modal', function (e) {
	resetCustomerCreationForm();
})

/**
 * Check for branch status and customer status
 * TODO: if left then ask to activate master customer first
 * * Update customer too if status is selected from left to active or in-active
*/
$('#editBranchForm input[name="branch_status"]').on('change', function (e) {
	e.preventDefault();

	let branch_status = $(e.target).val(),
		customer_status = $('#edit_company_status').is(':checked') ? true : false;


	// TODO: check if customer_status is in-active
	if(customer_status == 0 && branch_status != 0) { // * customer is in-active and selected status is not Left

		Swal2.fire({
			icon: 'warning',
			title: 'Warning',
			text: 'Customer is currently in-active so you must \nactivate customer first in order \nto change status!',
			confirmButtonColor: '#f4ad73',
			confirmButtonText: 'OK',
		})

		$(e.target).find(`[value="0"]`).prop('checked', true)

	}
	
})





const editCustomerBranch = (id) => {
	event.preventDefault();

	$(`#customer_branch_${id} input[type="hidden"]`).each(async (k, el) => {
		if ($(el).attr('data-name') == 'branch_town_id') {
			await new Promise(town => {
				$('#branchModal').find(`[name="${$(el).attr('data-name')}"]`).val($(el).val()).trigger('change')
			})
		} else if ($(el).attr('data-name') == 'branch_block_id') {
			await new Promise(r => setTimeout(r, 1000));
			$('#branchModal').find('#branch_block_id').val($(el).val()).trigger('change');
		} else {
			$('#branchModal').find(`[name="${$(el).attr('data-name')}"]`).val($(el).val())
		}
	});

	$('#branchModal').modal('show')


}

const removeCustomerBranch = async (id) => {
	event.preventDefault();

	$(`#customer_branch_${id}`).remove();

	if ($('.corporateDiv .form-row .col-md-12').length <= 0) {
		$('.corporateDiv .form-row').append(`
			<div class="col-md-12 empty-alert">
				<div class="alert alert-warning mb-0 p-1 px-2 rounded-0 font-sm" role="alert">
					<i class="fas fa-exclamation-triangle"></i> No branch added
				</div>
			</div>
		`)
	}

	Toast.fire({
		icon: 'success',
		title: 'Branch removed successfully!'
	})
}

const onCompanyStatusChange = () => {
	$('#close_reason').prop('required', !$(event.target).is(':checked')).closest('.col-md-12').prop('hidden', $(event.target).is(':checked'))
};

// UPDATE CREATED CUSTOMER
const editCustomer = (customer = null) => {
	event.preventDefault();

	let popup = $('#editCustomer'),
		id = customer || $(event.target).closest('tr').attr('id');

	Dashmix.block('state_loading', '.siteBlock')

	axios.get(route(`${path}.edit`, id))
		.then(({ data }) => {
			popup.find('.modal-body').html(data)
			popup.modal('show');
		})
		.catch(error => {
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
		})
		.then(() => Dashmix.block('state_normal', '.siteBlock'))



}


const updateCustomerBranch = async (id) => {
	event.preventDefault();

	$.notify('Fetching data. Please Wait...', 'message')

	axios.get(route(`${path}.branchEdit`, id))
		.then(async ({ data }) => {
			$.each(data, (k, v) => {
				$('#editBranchModal #editBranchForm').find(`[name="${k}"]`).val(v)
			})

			$(`#editBranchForm`).find(`input[name="branch_status"][value="${data.status}"]`).prop('checked', true)

			$('#editBranchForm #branch_town_id').val(data.town_id).trigger('change')

			await new Promise(r => setTimeout(r, 1000));

			$('#editBranchForm .branch_block_id').val(data.block_id).trigger('change')

			$('.select2').select2();

			$('#editBranchModal').modal('show')
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
		})
}


$(document).on('submit', '#editBranchForm', function (e) {
	e.preventDefault();

	let formData = $(e.target).serialize(),
		btn = $('#editBranchModal').find('button[type="submit"]');

	// send new updates to server but confirm first
	Swal2.fire({
		title: 'Confirm',
		text: "Are you sure to update this customer branch?",
		icon: 'question',
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes, Update'
	})
		.then(result => {
			if (result.isConfirmed) {
				$.notify('Updating data. Please wait...', 'message')
				btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Updating...');
				// send ajax
				axios.patch(route(`${path}.branchUpdate`), formData)
					.then(response => {
						$('#editBranchModal').modal('hide')
						btn.html('<i class="fas fa-cloud-download-alt mr-1"></i> Update Branch');
						// reload customer edit form
						editCustomer(response.data.id);
						// reload datatables
						$(".siteDataTable").DataTable().ajax.reload(null, false);
						Toast.fire({
							icon: 'success',
							title: 'Customer branch updated successfully!'
						})
					})
					.catch(error => {
						console.error(error)
						Toast.fire({
							icon: 'error',
							title: 'Something went wrong. Please try again!'
						})
					})
			} else {
				Toast.fire({
					icon: 'info',
					title: 'Action canceled successfully.'
				})
			}
		})



})


// UPDATE CUSTOMER MASTER FORM
$(document).on('submit', '#updateCustomerForm', function (e) {
	e.preventDefault();

	Swal2.fire({
		title: 'Confirm',
		text: "Are you sure to delete this customer branch?",
		icon: 'warning',
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes, Update'
	})
		.then(result => {
			if (result.isConfirmed) {
				$.notify('Updating customer details. Please wait...', 'message')

				let formData = {
					'name': $('#edit_name').val(),
					'customer_type_id': $('#edit_customer_type_id').val(),
					'membership_type_id': $('#edit_customer_membership_id').val(),
					'status': $('#edit_company_status').is(':checked') ? true : false,
					'close_reason': !$('#edit_company_status').is(':checked') ? $('#close_reason').val() : null,
					'primary_referrer': $('#edit_primary_referrer').val(),
					'secondary_referrer': $('#edit_secondary_referrer').val(),
					'notes': $('#edit_notes').val(),
					'special_customer': $('#edit_special_customer').is(':checked') ? true : false,
				},
					id = $('#updateCustomerForm').attr('data-id'),
					btn = $('#updateCustomerForm').find('button[type="submit"]');

				btn.html('<i class="fas fa-sync-alt fa-spin mr-1"></i> Updating...');

				axios.patch(route(`${path}.update`, id), formData)
					.then(() => {
						btn.html('<i class="fas fa-cloud-download-alt mr-1"></i> Update Customer');
						$('#editCustomer').modal('hide')
						$('#editCustomer').modal('hide')
						Toast.fire({
							icon: 'success',
							title: 'Customer details updated successfully!'
						})
						$(".siteDataTable").DataTable().ajax.reload(null, false);
						$('#editCustomer').modal('show')
					})
					.catch(error => {
						console.error(error)
						Toast.fire({
							icon: 'error',
							title: 'Something went wrong. Please try again!'
						})
					})
			}
		})
})

/**
 * Delete customer branch
 * @param INT id customer branch id
 * TODO: Remove branch row from front end and delete from database
*/

const deleteCustomerBranch = async (id) => {
	event.preventDefault();

	await Swal2.fire({
		title: 'Confirm',
		text: "Are you sure to delete this customer branch?",
		icon: 'warning',
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		confirmButtonText: 'Yes, Delete',
		showLoaderOnConfirm: true,
		preConfirm: async () => {
			axios.delete(route(`${path}.deleteCustomerBranch`, id))
				.then(response => {
					$(`#customer_branch_${id}`).remove();
					if ($('.corporateDiv .form-row .col-md-12').length <= 0) {
						$('.corporateDiv .form-row').append(`
						<div class="col-md-12 empty-alert">
							<div class="alert alert-warning mb-0 p-1 px-2 rounded-0 font-sm" role="alert">
								<i class="fas fa-exclamation-triangle"></i> No branch added
							</div>
						</div>
					`)
					}
					$(".siteDataTable").DataTable().ajax.reload(null, false);
					return response;
				})
				.catch(error => {
					Swal2.showValidationMessage(
						`Request failed: ${error}`
					)
				})
		},
		allowOutsideClick: () => !Swal2.isLoading()
	})
	.then(result => {
		if (result.isConfirmed) {
			Swal2.fire(
				'Action Status',
				'Customer branch removed successfully.',
				'success'
			)
		}
	})
}
const deliverySchedule = (id) => {
	Dashmix.block('state_loading', '.siteBlock')

	$('#editScheduleForm').attr('data-id', id)

	axios.get(route(`${path}.deliveryScheduleEdit`, id))
		.then(({data}) => {
			$('.delivery_source').val(data.delivery_source)
			$('.delivery_schedule').val(data.delivery_schedule).trigger('change')
			$("#editScheduleModal").modal('show');
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: "error",
				title: `Something went wrong.\nPlease try again.\n${error}`
			})
		})
		.then(() => Dashmix.block('state_normal', '.siteBlock'))
}



$(document).on('submit', '#editScheduleForm', function(event) {
	event.preventDefault()
	
	Dashmix.block('state_loading', '.siteBlock')

	let formData = new FormData($('#editScheduleForm')[0]),
	 	id = $('#editScheduleForm').attr('data-id'); 
	
	axios.patch(route(`${path}.deliveryScheduleUpdate`,id),$(this).serialize())
		.then(({data}) => {
			$("#editScheduleModal").modal('hide');
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

})

