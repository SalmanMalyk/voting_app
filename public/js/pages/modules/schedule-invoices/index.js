var path = 'dashboard.schedule-invoices';

$(() => {
	'use strict';

	var dataTable = $(".siteDataTable").DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		bStateSave: true,
		select: true,
		bLengthChange: false,
		order: [ [1, 'desc'] ],
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
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
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
		ajax: route(`${path}.index`),
		columns: [
			// {
			// 	data: "DT_RowIndex",
			// 	name: "DT_RowIndex",
			// 	className: "text-center",
			// 	orderable: false, 
			// 	searchable: false
			// },
			{
				data: "invoice_no",
				name: "invoice_no",
				className: "text-center",
				defaultContent: "—"
			},
			{
				data: "order_date",
				name: "order_date",
				className: "text-right",
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
				},
				defaultContent: "—"
			},
			{
				data: "customer_branch.customer.membership_no",
				name: "customerBranch.customer.membership_no",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "customer_name",
				name: "customerBranch.customer.name",
				className: "text-left",
				render: {
					_: 'display',
					sort: 'value'
				},
				defaultContent: "—"
			},
			// {
			// 	data: "customer_branch.customer.name",
			// 	name: "customerBranch.customer.name",
			// 	className: "text-left",
			// 	defaultContent: "—"
			// },
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
				data: "order_taken_by.name",
				name: "orderTakenBy.name",
				className: "text-left",
				defaultContent: "—"
			},
			{
				data: "order_qty",
				name: "order_qty",
				className: "text-center",
				defaultContent: "—",
				searchable: false,
				render: {
					_: "display",
					sort: "data"
				}

			},
			{
				data: "total_amount",
				name: "total_amount",
				className: "text-right",
				defaultContent: "—"
			},
			
			{
				data: 'schedule_datetime',
				name: 'schedule_datetime',
				className: "text-right",
				type: 'num',
				render: {
					_: 'display',
					sort: 'timestamp'
			    },
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
				data: 'dispatcher_user.name',
				name: 'dispatcherUser.name',
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
			let qtyTotal = api
				.column(8, { page: 'current' })
				.data()
				.reduce(function (a, b) {
					return intVal(a) + intVal(b.data);
				}, 0);
				
			let pageTotal = api
				.column(9, { page: 'current' })
				.data()
				.reduce(function (a, b) {
					return intVal(a) + intVal(b);
				}, 0);
			// Update footer
			$(api.column(8).footer()).html(numeral(qtyTotal).format('0,0'))
			$(api.column(9).footer()).html(numeral(pageTotal).format('0,0'))
		}
	});
});

const validateForm = () => {
	var form_validated = true;
	var fields = document.getElementsByClassName('item-required');
	var message = "Form cannot be saved. Following required fields are empty:"
	$.each(fields, function(i, field) {
		if (!field.hidden && !field.value && !field.parentNode.hidden) {
			message += "\r\n" + field.attributes.errorlabel.value;
			form_validated = false;
		}

	});
	if (!form_validated) {
		$.notify(message, "error");
	}
	return form_validated;
}

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
// });


$(document).on('submit', '#updateDeliveryForm', event => {
	event.preventDefault();

	let formData = $(event.target).serialize();
		id   	 = $(event.target).attr('data-id'),
		InvoiceQty 	= Number($(event.target).attr('data-qty')),
		returnedQty = Number($(event.target).find('[name="bottle_return"]').val()),
		btn 	 = $('.checkout-btn');

	if(validateForm()) {

		if (returnedQty > InvoiceQty) {
			Swal2.fire({
				title: 'Warning',
				html: `Invoice bottle quantity was <b class="text-primary font-w700">"${InvoiceQty}"</b> and you're adding <b class="text-primary font-w700">"${returnedQty}"</b> as bottle return.	<br>Are you save these changes?`,
				icon: 'warning',
				showCancelButton: true,
				reverseButtons: true,
				confirmButtonColor: '#2ecc71',
				cancelButtonColor: '#e74c3c',
				confirmButtonText: 'Yes, Update'
			}).then((result) => {
				if (result.isConfirmed) {
					updateDeliveryCompleteForm(id, formData, btn)
				}
			})
		} else {
			updateDeliveryCompleteForm(id, formData, btn)
		}

		
	}
})


const updateDeliveryCompleteForm = (id, formData, btn) => {

	btn.html('<i class="fas fa-sync fa-spin mr-1"></i> Processing...')

	axios.put(route(`dashboard.invoices.updateDeliveryStatus`, id), formData)
		.then(response => {
			$(".siteDataTable").DataTable().ajax.reload(null, false);
			$('#updateDeliveryModal').modal('hide');
			$('#updateDeliveryForm')[0].reset();
			$('#cash').prop('checked', false).trigger('change')
			$('#delivery_status').trigger('change');
			swal('Success', 'Delivery status updated successfully.', 'success');
		})
		.catch(error => {
			swal('Warning', 'Something went wrong.', 'error');
			console.log(error)
		})
		.then(() => btn.html('<i class="fas fa-cloud-upload-alt mr-1"></i> Submit'))
}


const orderAssignmentStatus = id => {
	event.preventDefault();
	$('#invoice_id').val(id),
	$('#invoice_no').val($(event.target).closest('tr').find("td:eq(1)").text())
	$('#orderAssignmentStatus').modal('show')
}

/**
 * @action Change delivery form field on changing order status
*/
$(document).on('change', '#delivery_status', () => {
	event.preventDefault();

	let status = event.target.value,
		delivered_fields = $('.delivered_fields');

	if(status == 2) {
		delivered_fields.prop('hidden', false)
	} else {
		delivered_fields.prop('hidden', true)
		$('#cash').prop('checked', false).trigger('change')
	}
	
});



$(document).on('submit', '#orderAssignmentForm', () => {
	event.preventDefault();

	let obj = {
		invoice: $('#invoice_id').val(),
		payment_method_id: $('#payment_method_id').val(),
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
			return axios.put(route(`dashboard.invoices.assignDispatcher`), obj)
				.then(response => console.log(response))
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