var path = 'dashboard.master.zone';


$(function() {
	'use strict';

	// update zone day status
	$('.x-status-check').on('dblclick', function(e) {
		e.preventDefault();

		const id = $(e.target).data('id'),
			  day = $(e.target).data('day');

		let field = $(e.target);
		field.empty();
		field.html(`<i class="fas fa-circle-notch fa-lg fa-spin"></i>`)

		// SEND AJAX REQUEST TO UPDATE STATUS
		axios.patch(route(`${path}.updateDayStatus`, id), {
				day: day
			})
			.then(({data}) => {
				field.empty()
				Toast.fire({
					title: `"${day.charAt(0).toUpperCase() + day.slice(1)}" status set to ${data ? 'active' : 'in-active'} successfully!`,
					icon: 'success'
				})
				let icon = data ? `<i class="fas fa-check text-success fa-lg"></i>`
								   : `<i class="fas fa-times text-danger  fa-lg"></i>`;
				field.html(icon)
			})
			.catch(error => {
				console.error(error)
				Toast.fire({
					title: `Something went wrong. Please try again!`,
					icon: 'error'
				})
			})
	})
	
	// Update zone status
	$('.x-zone-status').on('dblclick', function(e) {
		e.preventDefault();

		const id  = $(e.currentTarget).data('id')		
		let field = $(e.currentTarget)
		
		field.empty()
		field.html(`<i class="fas fa-circle-notch fa-lg fa-spin"></i>`)

		// SEND AJAX REQUEST TO UPDATE STATUS
		axios.patch(route(`${path}.updateStatus`, id))
			.then(({data}) => {
				field.empty()

				Toast.fire({
					title: `"${data.name} status set to ${data.status ? 'active' : 'in-active'} successfully!`,
					icon: 'success'
				})

				let icon = data.status ? `<span class="badge badge-success"><i class="fas fa-check-circle fa-fw"></i> Active</span>`
								: `<span class="badge badge-danger"><i class="fas fa-times-circle fa-fw"></i> InActive</span>`;
				field.html(icon)
			})
			.catch(error => {
				console.error(error)
				Toast.fire({
					title: `Something went wrong. Please try again!`,
					icon: 'error'
				})
			})
	})
	
	$('#create_towns').multiSelect({
		selectableHeader: "<div class='text-center bg-info-light font-w400 p-1 text-white font-sm mb-0'>Available Town(s)</div>",
		selectionHeader: "<div class='text-center bg-success-light font-w400 p-1 text-white font-sm mb-0'>Selected Town(s)</div>",
		keepOrder: true
	});

	// Create Zone Modal
	$('.x-create-zone-button').on('click', function(e) {
		e.preventDefault();

		let popup  = $('#createZoneModal'),
			select = $('#create_towns');

		Dashmix.block('state_loading', '.siteBlock')

		// empty select options
		select.empty();

		// send request and fetch avaiable towns
		axios.get(route(`${path}.create`))
			.then(({data}) => {
				// append options
				$.each(data, (k, v) => {
					select.append(new Option(v, k))
				})
				// show modal
				popup.modal('show')
			})
			.catch(error => {
				Toast.fire({
					title: `Something went wrong.\nPlease try again!\n(${error})`,
					icon: 'error'
				})
			})
			.then(() => {
				select.multiSelect('refresh')
				Dashmix.block('state_normal', '.siteBlock')
			})

		
		
	})

	// store new zone
	$('#zoneCreateForm').on('submit', function(e) {
		e.preventDefault();

		let popup 	 = $('#createZoneModal'),
			form 	 = $(e.target)[0],
			formData = new FormData(this);

		Swal2.fire({
			title: 'Are you sure?',
			html: `You agree to create this zone with selected towns?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#2ecc71',
			cancelButtonColor: '#e74c3c',
			showLoaderOnConfirm: true,
			confirmButtonText: 'Create',
			reverseButtons: true,
			backdrop: true,
			preConfirm: async () => axios.post(route(`${path}.store`), formData)
				.then(({ data }) => data)
				.catch(error => {
					if(error.response.status == 422) {
                        let messages = '';
                        $.each(error.response.data.errors, (k, v) => {
                            messages += `${v[0]} <br>`;
                        })
                        Swal2.showValidationMessage(
                            `${messages}`
                        )
                    } else {
                        Toast.fire({
							title: `Something went wrong.\nPlease try again!\n(${error})`,
							icon: 'error'
						})
                    }
				}),
				allowOutsideClick: () => !Swal2.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Toast.fire({
					title: 'Zone created successfully!',
					icon: 'success'
				})

				window.location.reload();
				
			}
		})	

	})
	

	// Update zone changes
	$('#editZoneForm').on('submit', function(e) {
		e.preventDefault();

		let popup = $('#editZoneModal'),
			form = $('#editZoneForm'),
			btn = $('.x-submit-btn'),
			id = $('#zone_id').val();

		btn.prop('disabled', true).html('<i class="fas fa-sync-alt fa-spin"></i> Saving...');

		// send axios request
		axios.patch(route(`${path}.update`, id), form.serialize())
			.then(({data}) => {
				Toast.fire({
					icon: 'success',
					title: data.message
				})
				$(`.zone_${id}`).find('td:eq(0)').text(data.name)
				popup.modal('hide')
			})
			.catch(error => {
				Toast.fire({
					icon: 'error',
					title: `Something went wrong. \nPlease try again! \n(${error})`
				})
			})
			.then(() => btn.prop('disabled', false).html('<i class="fas fa-plus mr-1"></i> Update Zone'))
		
	})
	
})


/**
 * @param int ID (Zone ID)
 * @return show available towns 
 * 		   and selected towns within
 * 		   opened zone.
*/
const editZone = (id) => {
	event.preventDefault();	

	let popup = $('#editZoneModal'),
		select = $('#editZoneTowns');

	select.empty();

	// show loading
	Dashmix.block('state_loading', '.siteBlock')
	
	// send ajax
	axios.get(route(`${path}.edit`, id))
		.then(({data}) => {

			$('#zone_id').val(data.zone.id)
			$('#zone_name').val(data.zone.name)
			
			data.towns.forEach((town, indx) => {
				select.append(new Option(town.name, town.id, null, town.selected))
			});

			select.multiSelect({
				selectableHeader: "<div class='text-center bg-info-light font-w400 p-1 text-white font-sm mb-0'>Available Town(s)</div>",
				selectionHeader: "<div class='text-center bg-success-light font-w400 p-1 text-white font-sm mb-0'>Selected Town(s)</div>",
				keepOrder: true
			});
			
			popup.modal('show')
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: `Something went wrong. Please try again! \n (${error})`
			})
		})
		.then(() => {
			select.multiSelect('refresh')
			Dashmix.block('state_normal', '.siteBlock')
		})
}




/**
 * @param int id (zone id)
 * @return delete zone and empty
 * 		   town zone_id
*/
const deleteZone = (id) => {
	event.preventDefault();

	Swal2.fire({
		title: 'Are you sure?',
		html: `You won't be able to revert this!`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#2ecc71',
		cancelButtonColor: '#e74c3c',
		showLoaderOnConfirm: true,
		confirmButtonText: 'Yes, delete it!',
		reverseButtons: true,
		backdrop: true,
		preConfirm: async () => axios.delete(route(`${path}.destroy`, id))
			.then(({ data }) => data)
			.catch(error => {
				Toast.fire({
					title: `Something went wrong.\nPlease try again!\n(${error})`,
					icon: 'error'
				})
			}),
			allowOutsideClick: () => !Swal2.isLoading()
	}).then((result) => {
		if (result.isConfirmed) {
			if(result.value.success) {

				$(`.zone_${id}`).remove()
				
				Toast.fire({
					title: result.value.message,
					icon: 'success'
				})
			} else {
				Swal2.fire({
					icon: 'warning',
					title: 'Warning',
					text: result.value.message,
					confirmButtonColor: '#e74c3c'
				})
			}
		}
	})	
}