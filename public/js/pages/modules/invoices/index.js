var path = 'dashboard.invoices';

$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		// responsive: true,
		processing: true,
		serverSide: true,
		order: [ [1, 'desc'] ],
		stateSave: true,
		select: true,
		buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" }, 
            { extend: "copy", className: "btn btn-sm btn-primary" }, 
            { extend: "csv", className: "btn btn-sm btn-primary" }, 
            { extend: "pdf", className: "btn btn-sm btn-primary" }, 
            { extend: "print", className: "btn btn-sm btn-primary" },
			{
				text: 'Refresh',
				action: function ( e, dt, node, config ) {
					dt.ajax.reload();
				},
				className: "btn btn-sm btn-primary"
			}
        ],
		lengthMenu: [
            [ 25, 50, 100, -1 ],
            [ '25 rows', '50 rows', '100 rows', 'Show all' ]
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
				data: "order_date",
				name: "order_date",
				className: "text-right",
				render: {
					_: 'display',
					sort: 'timestamp'
				},
				defaultContent: "—"
			},
			
			{
				data: 'schedule_datetime',
				name: 'schedule_datetime',
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
			    },
				defaultContent: "—"
			},
			{
				data: "invoice_no",
				name: "invoice_no",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "customer_branch.customer.customer_type.name",
				name: "customerBranch.customer.customerType.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.customer.name",
				name: "customerBranch.customer.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.short_address",
				name: "customerBranch.address",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.block.name",
				name: "customerBranch.block_id",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_branch.town.name",
				name: "customerBranch.town_id",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: 'invoice_type',
				name: 'invoice_type_id',
				type: 'num',
				defaultContent: "—",
				render: {
					_: 'display',
					sort: 'type'
			   }
			},
			{
				data: "total_amount",
				name: "total_amount",
				className: "text-right",
				defaultContent: "—"
			},
			{
				data: "paid_amount",
				name: "paid_amount",
				className: "text-right",
				defaultContent: "—"
			},
			{
				data: 'assignment_date',
				name: 'assignment_date',
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
			    },
				defaultContent: "—"
			},
			{
				data: 'dispatch_date',
				name: 'dispatch_date',
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
			    },
				defaultContent: "—"
			},
			{
				data: 'delivery_date',
				name: 'delivery_date',
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
			    },
				defaultContent: "—"
			},
			{
				data: 'dispatcher_user.name',
				name: 'dispatcherUser.name',
				defaultContent: "—"
			},
			{
				data: 'status',
				name: 'status',
				className: "text-center",
				type: 'html-num-fmt',
				render: {
					display: 'display',
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
		"footerCallback": function (row, data, start, end, display) {
			var api = this.api(), data;
			// Remove the formatting to get integer data for summation
			var intVal = function (i) {
				return typeof i === 'string' ?
					i.replace(/[\$,]/g, '') * 1 :
					typeof i === 'number' ?
						i : 0;
			};

			// Total over this page
			let pageTotal = api
				.column(10, { page: 'current' })
				.data()
				.reduce(function (a, b) {
					return intVal(a) + intVal(b);
				}, 0);
				
			let paidTotal = api
				.column(11, { page: 'current' })
				.data()
				.reduce(function (a, b) {
					return intVal(a) + intVal(b);
				}, 0);
			// Update footer
			$(api.column(10).footer()).html(numeral(pageTotal).format('0,0'))
			$(api.column(11).footer()).html(numeral(paidTotal).format('0,0'))
		}
	});
});

function updateInvoiceDelivery(invoice, qty = 0) {
	event.preventDefault();
	let popup = $('#updateDeliveryModal');
	$('#updateDeliveryForm').attr({
		'data-id': invoice,
		'data-qty': qty
	});
	popup.modal('show')
}

// $('#cash').change(function(){
// 	document.querySelector('#cash_received').hidden = !$(this).prop("checked");
// 	// document.querySelector('.amount').required = !$(this).prop("checked");
// });


$(document).on('submit', '#updateDeliveryForm', event => {
	event.preventDefault();

	let formData = $(event.target).serialize();
		id = $(event.target).attr('data-id'),
		qty = $(event.target).attr('data-qty'),
		btn = $('.checkout-btn');

	btn.html('<i class="fas fa-sync fa-spin mr-1"></i> Processing...')

	axios.put(route(`${path}.updateDeliveryStatus`, id), formData)
		.then(response => {
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			$('#updateDeliveryModal').modal('hide');
			$('#updateDeliveryForm')[0].reset();
			$('#cash').trigger('change');
			swal('Success', 'Delivery status updated successfully.' , 'success');
		})
		.catch(error => {
			swal('Warning', 'Something went wrong.' , 'error');
			console.log(error)
		})
		.then(() => btn.html('<i class="fas fa-cloud-upload-alt mr-1"></i> Submit'))

})


const orderAssignmentStatus = id => {
	event.preventDefault();
	$('#invoice_id').val(id),
	$('#invoice_no').val($(event.target).closest('tr').find("td:eq(1)").text())
	$('#orderAssignmentStatus').modal('show')
}


$(document).on('submit', '#orderAssignmentForm', () => {
	event.preventDefault();

	let obj = {
		invoice: $('#invoice_id').val(),
		dispatcher: $('#dispatcher').val(),
		assignment_date: $('#assignment_date').val(),
		dispatch_date: $('#dispatch_date').val()
	};

	Swal2.fire({
		title: 'Are you sure?',
		html: `Assign <b>${$('#dispatcher :selected').text()}</b> to dispatch order#<b>${$('#invoice_no').val()}</b>`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#30497C',
		cancelButtonColor: '#9b9ca0',
		showLoaderOnConfirm: true,
		confirmButtonText: 'Assign Dispatcher',
		reverseButtons: true,
		preConfirm: async (data) => {
			return axios.put(route(`${path}.assignDispatcher`), obj)
				.then(response => console.log(response))
				.catch(error => {
					Swal2.showValidationMessage(
						`Request failed: ${error}`
					)
				})
		  },
		  allowOutsideClick: () => !Swal2.isLoading()
	}).then((result) => {
		if (result.isConfirmed) {
			Toast.fire({
				icon: 'success',
				title: 'Dispatcher assigned successfully!'
			})

			$(".siteDataTable").DataTable().ajax.reload(null, false);
			$('#dispatcher').val('').trigger('change');
			$('#assignment_date').val('');
			$('#dispatch_date').val('');
			$('#orderAssignmentStatus').modal('hide')
		}
	})
	
})

const printDeliveryInvoice = (id) => {
	event.preventDefault();

	let popup = $('#deliveryInvoicePrintModal');

	Dashmix.block('state_loading', '.siteBlock');

	axios.post(route(`dashboard.invoices.deliveryInvoicePrint`, id))
		.then(response => {
			printInvoice(response.data.view)
		})
		.catch(error => {
			console.error(error)
		})
		.then(() => {
			Dashmix.block('state_normal', '.siteBlock');
		})

}

const printInvoice = (invoice) => {
	var popup = window.open('', '', 'width=360,height=565');
	popup.document.write(invoice);
}