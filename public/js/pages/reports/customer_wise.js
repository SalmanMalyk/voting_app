$(() => {
	'use strict';

	getCustomerReportTable();
	

	$(document).on('click', '.btn-filter', () => {
		getCustomerReportTable();
	})

});



const getCustomerReportTable = () => {
	let filters = {
		customerBranches: $('#customer_id').val(),
		products: $('#product_id').val(),
		date_range: {
			from: $('#date_from').val(),
			to: $('#date_to').val()
		}
	};

	let table = $('.table-responsive');

	$.notify('Generating Customer Report', 'message')
	Dashmix.block('state_loading', '.table-block')

	axios.get(route(`dashboard.reports.customer.index`), {
			params: {
				filters: JSON.stringify(filters)
			}
		})
		.then(({data}) => {
			table.html(data.view)
		})
		.catch(error => {
			console.error(error)
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
		})
		.then(() => Dashmix.block('state_normal', '.table-block'))
	
}