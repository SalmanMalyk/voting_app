var customerDataFields = {
	member: 	$('.member_id span'),
	customer: 	$('.customer span'),
	address: 	$('.address span'),
	contact_no: $('.contact_no span'),
	zone: 		$('.zone span'),
	delivery_source: $('.delivery_source span'),
	delivery_schedule: $('.delivery_schedule span'),
	last_delivery_date: $('.last_delivery_date span'),
	last_delivered_bottle: $('.last_delivered_bottle span'),
	last_paid_amount: $('.last_paid_amount span'),
	voucher_bottles: $('.voucher_bottles'),
};

var ramadanOffer = true;

var cartTable = $('.cart-table');

var selectedCustomer;

var routePrefix = 'dashboard.invoices';

var disableProducts = [7, 11]; // product whic needs to be mutated on invoice type selection


$(document).ready(function () {

	// get customers listing according to selected customer type
	$(document).on('change', '#customer_type_id', e => {
		e.preventDefault();
		let customerType = e.target.value;
		$("#customer_id").empty();
		// reset customer details
		resetCustomerDetails();

		// check if value is valid 
		if (customerType) {
			e.target.disabled = true;

			$("#customer_id").val(38).trigger('change');

			if (customerType == 3) {
				$('#invoice_type_id').val(0).prop('disabled', true);
			}
		}
	})

	/*-------------------- CUSTOMER SELECTION ----------------*/
	$(document).on('change', '#customer_id', e => {
		e.preventDefault();

		let customer = e.target.value;
		// reset customer details
		resetCustomerDetails();

		// check if value is valid 
		if (customer) {
			Dashmix.block('state_loading', '.siteBlock')

			axios.get(route('api.customers.show', customer))
				.then(response => {
					let data = response.data;

					$('#customer_type_id').val(data.customer.customer_type_id || null).prop('disabled', true)
					
					customerDataFields.member.text(data.customer.membership_no)
					customerDataFields.customer.text(data.customer.name)
					customerDataFields.address.text(data.new_address)
					customerDataFields.zone.text(data.town.name)
					customerDataFields.contact_no.text(data.contact_no)
					customerDataFields.last_delivery_date.text(moment(data.last_paid_date).format('DD-MMM-YYYY'))
					customerDataFields.last_paid_amount.text(numeral(data.last_paid_amount).format('0,0'))
					customerDataFields.last_delivered_bottle.text(data.last_delivered_bottle)
					customerDataFields.delivery_source.text(data.delivery_source_name)
					customerDataFields.delivery_schedule.text(data.delivery_schedule_name)
					customerDataFields.voucher_bottles.text(data.earned_bottle_count)
					customerDataFields.voucher_bottles.attr('data-value', data.earned_bottle_count)
					selectedCustomer = data;

					// TODO: if delivery source is null=> disable order option from invoice type
					if (data.delivery_source_name == null) {
						$('#invoice_type_id').notify('Customer is not assigned any delivery source.', {
							position: 'bottom center',
							className: 'warn'
						});
						$('#invoice_type_id').val(0).trigger('change').prop('disabled', true);
					} else {
						$('#invoice_type_id').val(null).trigger('change').prop('disabled', false);
					}

					// TODO: check if customer don't have any bottle earned than disable product
					$('.category_product_23').prop('disabled', !data.earned_bottle_count > 0)

					e.target.disabled = true;
					$('.invoice-arrears').text(numeral(data.arrear).format('0,0'))
					$('.btn-add-customer').prop('hidden', true);
				})
				.catch(e => {
					Toast.fire({
						icon: 'error',
						title: `Something went wrong. \nPlease try again! \n ${e}`
					})
					console.error(e)
				})
				.then(() => Dashmix.block('state_normal', '.siteBlock'))
		}
		// else {
		// 	$.notify('Please select valid customer.', 'error')
		// }
	});

	/*-------------------- INVOICE TYPE ----------------*/
	$('#invoice_type_id').on('change', e => {
		e.preventDefault();
		let type = e.target.value;

		e.target.disabled = true
		if (type == '1') { // if type is order
			$('.invoice_type_order_div .form-control').prop('disabled', false)
			disableProducts.forEach((id, index) => $(`.category_product_${id}`).prop('disabled', true))
		} else {
			$('.invoice_type_order_div .form-control').prop('disabled', true)
			disableProducts.forEach((id, index) => $(`.category_product_${id}`).prop('disabled', false))
		}
	})

	// if theirs a change in table
	$('table').on('input', '.qty', e => {
		e.preventDefault();

		let row = $(e.target).parent().closest('tr');
		let newDiscount = numeral(row.find('.discount').data('discount') * e.target.value).format('0,0');
		row.find('.discount').val(newDiscount);
		let product_id = row.attr('data-product');
		calculateInvoiceAmount(product_id);
	});


	$(document).on('click', '.checkout-invoice', e => {
		e.preventDefault();

		let customer_type = $('#customer_type_id').val(),
			customer = $('#customer_id').val(),
			invoice_type = $('#invoice_type_id').val(),
			checkoutModal = $('#checkoutModal'),
			table = $('.cart-table tbody');

		if (customer_type && customer && invoice_type) {
			if (table.find('tr').length > 0) {
				if (invoice_type == 0) {
					checkoutModal.modal({
						backdrop: 'static',
						keyboard: false
					});
				} else {
					storeInvoiceDetails();
				}
			} else {
				$.notify('Please select at least one product!');
			}
		} else {
			$.notify('Please select customer details first!');
		}
	})


	$("#checkoutModal").on('show.bs.modal', function () {
		let checkoutTotalQty = $('#checkoutTotalQty'),
			checkoutTotalAmount = $('#checkoutTotalAmount'),
			checkoutTotalArrears = $('#checkoutTotalArrears');

		let netTotal = $('.net-total-price').text(),
			arrears = $('.invoice-arrears').text();

		// get total quantity
		let totalQty = 0;
		$.each($('.qty'), (k, el) => {
			totalQty += Number($(el).val());
		})
		// set total quantity
		checkoutTotalQty.text(totalQty)
		checkoutTotalArrears.text(arrears)
		checkoutTotalAmount.text(netTotal)

		$('#quick-payable').text(netTotal);
	});

	$("#checkoutModal").on('hide.bs.modal', e => {
		let checkoutTotalPaying = $('#checkoutTotalPaying'),
			checkoutBalance = $('#checkoutBalance'),
			checkoutAmount = $('#checkout-amount');

		checkoutTotalPaying.text('0')
		checkoutBalance.text('0')
		checkoutAmount.val(0)
	});

	$('.quick-cash').on('click', e => {
		e.preventDefault();

		let quickCash = $(e.target),
			checkoutAmount = $('#checkout-amount'),
			checkoutTotalPaying = $('#checkoutTotalPaying'),
			checkoutBalance = $('#checkoutBalance'),
			change_return = $('#change_return'),
			checkoutTotalAmount = $('#checkoutTotalAmount');

		quickCash = numeral(quickCash.text()).value();

		let total = 0;

		if ($(e.target).is('#quick-payable')) {
			total = quickCash;

		} else {
			total = numeral(checkoutTotalPaying.text()).value() + quickCash;
		}

		checkoutTotalPaying.text(numeral(total).format('0,0'));

		checkoutAmount.val(total);

		checkoutBalance.text(numeral(total - numeral(checkoutTotalAmount.text()).value()).format('0,0'));

		change_return.val((checkoutAmount.val() - numeral(checkoutTotalAmount.text()).value()))
	});

	$('#clear-cash-notes').on('click', e => {
		e.preventDefault();
		let checkoutTotalPaying = $('#checkoutTotalPaying'),
			checkoutBalance = $('#checkoutBalance'),
			checkoutAmount = $('#checkout-amount');
		checkoutTotalPaying.text('0')
		checkoutBalance.text('0')
		checkoutAmount.val(0)
		$('#change_return').val(0)
	});

	$('#checkoutWalkInCustomer').on('submit', e => {
		e.preventDefault();

		let payload = new FormData($(e.target)[0]);

		payload.append('checkoutTotalQty', $('#checkoutTotalQty').text());
		payload.append('checkoutTotalAmount', numeral($('#checkoutTotalAmount').text()).value());
		payload.append('checkoutTotalPaying', numeral($('#checkoutTotalPaying').text()).value());
		payload.append('checkoutBalance', numeral($('#checkoutBalance').text()).value());
		payload.append('customer_type_id', $('#customer_type_id').val());
		payload.append('customer_id', $('#customer_id').val());
		payload.append('invoice_type_id', $('#invoice_type_id').val());
		payload.append('invoiceTotal', numeral($('.invoice-total').text()).value());
		payload.append('invoiceDiscount', numeral($('.invoice-discount').text()).value());
		payload.append('invoiceDuePrice', numeral($('.invoice-due-price').text()).value());
		payload.append('invoiceArrears', numeral($('.invoice-arrears').text()).value());
		payload.append('netTotalPrice', numeral($('.net-total-price').text()).value());

		// get cart products
		let cartProducts = [];

		$.each(cartTable.find('tbody tr'), (k, el) => {
			cartProducts[k] = {
				product_id: $(el).data('product'),
				brand_id: $(el).data('brand'),
				quantity: $(el).find('.qty').val(),
				price: numeral($(el).find('.price').val()).value(),
				discount: numeral($(el).find('.discount').val()).value(),
				total: numeral($(el).find('.total').val()).value(),
			};
		});

		payload.append('cartProducts', JSON.stringify(cartProducts));

		// check if total paying amount is qual to total payable amount
		if ($('#customer_type_id').val() != 3 || numeral($('#checkoutTotalPaying').text()).value() >= numeral($('#checkoutTotalAmount').text()).value()) {
			// loading animation
			$('.checkout-btn').html(`<i class="fas fa-sync fa-spin mr-1"></i> Please wait...`).prop('disabled', true)
			// send ajax request
			axios.post(route(`${routePrefix}.store`), payload)
				.then(response => {
					// show message
					Toast.fire({
						icon: 'success',
						title: 'Invoice Saved successfully'
					})

					// hide payment modal
					$('#checkoutModal').modal('toggle');

					// reset form if created
					resetInvoiceForm();

					// ask user to print invoice
					Swal2.fire({
						title: `Print Invoice#${response.data.invoice.invoice_no || '-'}`,
						text: "Do you want to print invoice!",
						icon: 'question',
						showCancelButton: true,
						reverseButtons: true,
						confirmButtonColor: '#2ecc71',
						cancelButtonColor: '#e74c3c',
						confirmButtonText: 'Yes'
					}).then((result) => {
						if (result.isConfirmed) {
							printInvoice(response.data.view);
						}
					})
				})
				.catch(error => {
					console.error(error);
					Swal2.fire({
						title: "Oops!",
						icon: 'error',
						html: `Something went wrong.<br>Please try again later.<br><code>${error}</code>`,
						confirmButtonColor: '#e74c3c',
						confirmButtonText: 'Close'
					})
				})
				.then(() => $('.checkout-btn').html(`<i class="fas fa-cloud-upload-alt mr-1"></i> Submit`).prop('disabled', false))
		} else {
			$(".checkout-btn").notify(
				'Total payable amount should not be less than total paying amount!',
				{
					position: "bottom right"
				}
			);
		}
	})

})


function addProductToCart(product, brand = null) {
	event.preventDefault();
	let table = $('.cart-table tbody'),
		customer_type = $('#customer_type_id').val(),
		customer = $('#customer_id').val(),
		invoice_type = $('#invoice_type_id').val(),
		item = '';

	if (customer_type && customer && invoice_type) {
		$.each(products, (k, v) => {
			if (v.id == product) {
				let discount = 0;

				if (customer_type == 3 && v.discount) {
					if (checkDiscountDateValidity(v.discount)) {
						discount = v.discount.price_discount;
					}
				} else if (customer_type != 3 && v.customer_discount && selectedCustomer.customer.special_customer) {
					let customer_discount = v.customer_discount.filter((v, i) => selectedCustomer.customer_id == v.customer_id && v.invoice_type_id == invoice_type);
					if (customer_discount.length > 0) {
						discount = customer_discount[0].price_discount;
					}
				}

				// get customer price
				let productPrice = invoice_type == 0 ? v.price : customer_type == 1 ? v.price_corporate : (customer_type == 2 ? v.price_home : (customer_type == 3 ? v.price : (customer_type == 4 ? v.price_retailer : 0)));

				if (table.find(`tr[data-product="${v.id}"]`).length > 0 && table.find(`tr[data-brand="${brand ? brand.id : null}"]`).length > 0) {
					let previousValue;
					// increment quantity
					if (brand) {
						previousValue = table.find(`tr[data-product="${v.id}"][data-brand="${brand.id}"] .qty`).val();
					} else {
						previousValue = table.find(`tr[data-product="${v.id}"] .qty`).val();
					}
					document.querySelector(`.product_qty_${v.id}[data-brand="${brand ? brand.id : null}"]`).value = Number(previousValue) + 1;
					// calculate discount amount
					let discountAmount = document.querySelector(`.product_discount_${v.id}[data-brand="${brand ? brand.id : null}"]`);
					discountAmount.value = numeral(discount * document.querySelector(`.product_qty_${v.id}[data-brand="${brand ? brand.id : null}"]`).value).format('0,0');
					// TODO: Apply ramadan offer discount
					if (ramadanOffer) { // if ramadan offer is live
						let totalQuantity = Number(previousValue) + 1;
						if ([7, 8, 11].includes(v.id) && (selectedCustomer.customer.customer_type_id != 1) && !selectedCustomer.customer.special_customer) { // if product is in ramadan offer and category is refill
							// TODO: check if invoice type is shop or order
							if (invoice_type == 0) { // if invoice type is shop
								if (totalQuantity % 2 == 1) {
									addProductToCart(23)
								}
							} else if (invoice_type == 1) { // if invoice type is order
								if (totalQuantity % 3 == 1) {
									addProductToCart(23)
								}
							}
						}
					}
					
				} else {
					let otherBrand = '';
					if (brand && brand.name) {
						otherBrand = ` (${brand.name})`;
					}
					item += `
						<tr data-product="${v.id}" data-brand="${brand ? brand.id : null}">
							<td class="pb-2">${v.name}${otherBrand}</td>
							<td align="center">
								<input type="number" min="1" class="qty product_qty_${v.id} border-0 calculate" value="1" style="width: 100%; text-align: right;" data-brand="${brand ? brand.id : null}" ${v.id == 23 ? 'readonly' : null}>
							</td>
							<td align="right">
								<input type="number" class="price product_price_${v.id} border-0 calculate" value="${productPrice.toFixed(2)}" style="width: 100%; text-align: right;" data-brand="${brand ? brand.id : null}" readOnly>
							</td>

							<td align="right">
								<input type="text" class="discount product_discount_${v.id} border-0 calculate" value="${discount}" data-discount="${discount}" style="width: 100%; text-align: right;" data-brand="${brand ? brand.id : null}" readOnly>
							</td>
							<td align="right">
								<input type="text" class="total product_total_${v.id} border-0 calculate" value="${productPrice.toFixed(2)}" style="width: 100%; text-align: right;" data-brand="${brand ? brand.id : null}" readOnly>
							</td>
							<td align="center">
								<span onclick="removeItemFromCart()" class="fas fa-times-circle fa-sm text-danger calculate" style="cursor: pointer" data-toggle="tooltip" title="Remove Item"></span>
							</td>
						</tr>
					`;
				}

				// attached products
				let attachedProduct = products.filter(product => {
					return product.id == v.attached_product_id;
				});

				if (attachedProduct.length) {
					attachProductFunctionResponse = attachedProductItem(table, customer_type, attachedProduct[0], item);
					if (attachProductFunctionResponse) {
						item += attachProductFunctionResponse;
					}
				}
			}
		})
		table.append(item);
		calculateInvoiceAmount(product);
	} else {
		$.notify('Please select customer details');
	}
}

function attachedProductItem(table, customer_type, v) {

	let item;

	let discount = 0;

	let customer = $('#customer_id').val();

	if (customer_type == 3 && v.discount) {
		if (checkDiscountDateValidity(v.discount)) {
			discount = v.discount.price_discount;
		}
	} else if (customer_type != 3 && v.customer_discount) {
		let customer_discount = v.customer_discount.filter((v, i) => selectedCustomer.customer_id == v.customer_id);
		if (customer_discount.length > 0) {
			discount = customer_discount[0].price_discount;
		}
	}

	// get customer price
	let productPrice = customer_type == 1 ? v.price_corporate : (customer_type == 2 ? v.price_home : (customer_type == 3 ? v.price : (customer_type == 4 ? v.price_retailer : 0)));

	if (table.find(`tr[data-product="${v.id}"]`).length > 0) {
		// increment quantity
		let previousValue = table.find(`tr[data-product="${v.id}"] .qty`).val();
		document.querySelector(`.product_qty_${v.id}`).value = Number(previousValue) + 1;
		// calculate discount amount
		let discountAmount = document.querySelector(`.product_discount_${v.id}`);
		discountAmount.value = numeral(discount * document.querySelector(`.product_qty_${v.id}`).value).format('0,0');
	} else {
		item += `
			<tr data-product="${v.id}">
				<td class="pb-2">${v.name}</td>
				<td align="center">
					<input type="number" min="1" class="qty product_qty_${v.id} border-0 calculate" value="1" style="width: 100%; text-align: right;">
				</td>
				<td align="right">
					<input type="number" class="price product_price_${v.id} border-0 calculate" value="${productPrice.toFixed(2)}" style="width: 100%; text-align: right;" readOnly>
				</td>

				<td align="right">
					<input type="text" class="discount product_discount_${v.id} border-0 calculate" value="${discount}" data-discount="${discount}" style="width: 100%; text-align: right;" readOnly>
				</td>
				<td align="right">
					<input type="text" class="total product_total_${v.id} border-0 calculate" value="${productPrice.toFixed(2)}" style="width: 100%; text-align: right;" readOnly>
				</td>
				<td align="center">
					<span onclick="removeItemFromCart()" class="fas fa-times-circle fa-sm text-danger calculate" style="cursor: pointer" data-toggle="tooltip" title="Remove Item"></span>
				</td>
			</tr>
		`;
		return item;
	}
}

function  calculateInvoiceAmount(product_id = null) {
	event.preventDefault();

	// calculate invoice items amount
	calculateInvoiceItemAmount();

	calculateTotalWithoutDiscount();

	calculateTotalDiscount();

	calculateNetTotal();

	calculateDuePrice();

	calculateNetDue();

	if (product_id == 23) {
		// calculateVoucherBottle();
	}
}

function calculateInvoiceItemAmount() {
	event.preventDefault();
	$.each(cartTable.find('tbody tr'), (k, el) => {
		let price = numeral($(el).find('.price').val()).value();
		let qty = Number($(el).find('.qty').val());
		let discount = numeral($(el).find('.discount').val()).value();

		let total = ((price * qty) - discount);
		$(el).find('.total').val(numeral(total).format('0,0'));
	})
}

function calculateTotalWithoutDiscount() {
	event.preventDefault();
	let total = 0;
	$.each($('.price'), (k, el) => {
		total += (numeral($(el).val()).value() * $(el).parent().closest('tr').find('.qty').val())
	});
	$('.invoice-total').text(numeral(total).format('0,0'));
}

function calculateTotalDiscount() {
	event.preventDefault();
	let total = 0;
	$.each($('.discount'), (k, el) => {
		total += numeral($(el).val()).value()
	});
	$('.invoice-discount').text(numeral(total).format('0,0'));
}

function calculateDuePrice() {
	event.preventDefault();
	let totalPrice = $('.invoice-total').text();
	let totalDiscount = $('.invoice-discount').text();
	let duePrice = numeral(totalPrice).value() - numeral(totalDiscount).value();
	$('.invoice-due-price').text(numeral(duePrice).format('0,0'));
}

function calculateNetTotal() {
	event.preventDefault();
	let total = numeral($('.invoice-total').text()).value();
	let discount = numeral($('.invoice-discount').text()).value();
	let duePrice = numeral($('.invoice-due-price').text()).value();
	let arrears = 0;
	// let arrears = numeral($('.invoice-arrears').text()).value();
	let netTotal = ((total - discount) + arrears);
	netTotal = numeral(netTotal).format('0,0');
	$('.net-total-price').text(netTotal)
}

function calculateNetDue() {
	let total = numeral($('.invoice-total').text()).value();
	let discount = numeral($('.invoice-discount').text()).value();
	let arrears = numeral($('.invoice-arrears').text()).value();
	let netTotal = ((total - discount) + arrears);

	$('.net-due').text(numeral(netTotal).format('0,0'))
}

function calculateVoucherBottle () {
	let voucherCount = customerDataFields.voucher_bottles;
	let usedVouchers = 0;

	$.each(cartTable.find('tbody tr'), (k, el) => {
		if ($(el).attr('data-product') == 23) {
			usedVouchers += Number($(el).find('.qty').val());
		}
	})

	voucherCount.text(selectedCustomer.earned_bottle_count - usedVouchers);

	if (parseInt(voucherCount.text()) == 0) {
		$('.category_product_23').prop('disabled', true)
		cartTable.find('tbody tr[data-product="23"] .qty').prop('disabled', true)
	} else {
		$('.category_product_23').prop('disabled', false)
		cartTable.find('tbody tr[data-product="23"] .qty').prop('disabled', false)
	}
}

function checkDiscountDateValidity(discount) {
	event.preventDefault();
	let currentDate = moment().format();
	return moment(currentDate).isBetween(discount.date_from, discount.date_to, 'days', '[]');
}

function removeItemFromCart() {
	event.preventDefault();
	$(event.target).parent().closest("tr").remove();

	let product_id = $(event.target).parent().closest("tr").attr('data-product');
	
	calculateInvoiceAmount(product_id);
}

function resetCustomerDetails() {
	$.each(customerDataFields, (key, el) => {
		$(el).text('——')
	})
}

function resetInvoiceForm() {
	event.preventDefault();

	$('#invoiceCreateForm')[0].reset();

	$('#invoiceCreateForm select').prop('disabled', false)

	$('#invoiceCreateForm .select2').val('').trigger('change');

	$('#invoiceCreateForm .btn-add-customer').prop('hidden', false);

	$('.invoice-arrears').text(0)

	cartTable.find('tbody').empty();

	resetCustomerDetails();

	calculateInvoiceAmount();

	disableProducts.forEach((id, index) => $(`.category_product_${id}`).prop('disabled', false))

	$('#invoice_type_id').val(null).trigger('change').prop('disabled', false);

	$.notify('Form Cleared', 'message')
}

function storeInvoiceDetails() {
	event.preventDefault();

	let customer_type = $('#customer_type_id').val(),
		customer = $('#customer_id').val(),
		invoice_type = $('#invoice_type_id').val(),
		checkoutModal = $('#checkoutModal'),
		table = $('.cart-table tbody');

	if (customer_type && customer && invoice_type) {
		if (table.find('tr').length > 0) {
			let payload = new FormData();

			payload.append('customer_type_id', $('#customer_type_id').val());
			payload.append('customer_id', $('#customer_id').val());
			payload.append('invoice_type_id', $('#invoice_type_id').val());
			payload.append('schedule_date', $('#schedule_date').val());
			payload.append('schedule_time', $('#schedule_time').val());
			payload.append('invoiceTotal', numeral($('.invoice-total').text()).value());
			payload.append('invoiceDiscount', numeral($('.invoice-discount').text()).value());
			payload.append('invoiceDuePrice', numeral($('.invoice-due-price').text()).value());
			payload.append('invoiceArrears', numeral($('.invoice-arrears').text()).value());
			payload.append('netTotalPrice', numeral($('.net-total-price').text()).value());

			// get cart products
			let cartProducts = [];

			$.each(cartTable.find('tbody tr'), (k, el) => {
				cartProducts[k] = {
					product_id: $(el).data('product'),
					brand_id: $(el).data('brand'),
					quantity: $(el).find('.qty').val(),
					price: numeral($(el).find('.price').val()).value(),
					discount: numeral($(el).find('.discount').val()).value(),
					total: numeral($(el).find('.total').val()).value(),
				};
			});

			payload.append('cartProducts', JSON.stringify(cartProducts));

			Swal2.fire({
				title: 'Confirm',
				text: "Are you sure to create this invoice?",
				icon: 'question',
				showCancelButton: true,
				reverseButtons: true,
				confirmButtonColor: '#2ecc71',
				cancelButtonColor: '#e74c3c',
				confirmButtonText: 'Yes, Create'
			}).then((result) => {
				if (result.isConfirmed) {

					checkForExistingOrder(customer)
						.then(message => {
							$('.checkout-invoice').html(`<i class="fas fa-sync fa-spin mr-1"></i> Please wait...`).prop('disabled', true)
							// send ajax request
							axios.post(route(`${routePrefix}.store.commercialInvoice`), payload)
								.then(response => {
									Toast.fire({
										icon: 'success',
										title: 'Invoice Saved successfully'
									})
									// reset form if created
									resetInvoiceForm();
								})
								.catch(err => {
									console.error('Something went wrong: ', err);
									Toast.fire({
										icon: 'error',
										title: 'Something went wrong.'
									})
								})
								.then(() => $('.checkout-invoice').html(`<i class="fas fa-cloud-upload-alt mr-1"></i> Submit`).prop('disabled', false))
						})
						.catch(err => {
							console.error(err)
							Toast.fire({
								icon: 'error',
								title: `Something went wrong.\nPlease try again later.\n${err}`
							})
						})
				}
			})
		} else {
			$.notify('Please select at least one product!');
		}
	} else {
		$.notify('Please select customer details first!');
	}
}

function printInvoice(invoice) {
	var popup = window.open('', '', 'width=360,height=565');
	popup.document.write(invoice);
}

function updateCheckoutPayingAmount() {
	event.preventDefault();

	let checkoutAmount = $(event.target),
		checkoutTotalPaying = $('#checkoutTotalPaying'),
		checkoutBalance = $('#checkoutBalance'),
		change_return = $('#change_return'),
		checkoutTotalAmount = $('#checkoutTotalAmount');


	checkoutTotalPaying.text(numeral(checkoutAmount.val()).format('0,0'))
	checkoutBalance.text(numeral(checkoutAmount.val() - (numeral(checkoutTotalAmount.text()).value())).format('0,0'))
	change_return.val(checkoutAmount.val() - (numeral(checkoutTotalAmount.text()).value()))
}




/**
 * open other brands modal
 * @param int product [which product to attach brand id]
*/
const otherProductBrands = (product) => {
	let customer_type = $('#customer_type_id').val(),
		customer = $('#customer_id').val(),
		invoice_type = $('#invoice_type_id').val();


	if (customer_type && customer && invoice_type) {
		let popup = $('#otherProductBrandsModal');
		popup.attr('data-product', product)
		popup.modal({
			backdrop: false,
			show: true,
			focus: true
		});
	} else {
		$.notify('Please select customer details');
	}
}

/**
 * add other brand product
 * @param int id [id of other brand]
 * @param string name [other branch name]
 * * add selected brand bottle product
*/
const addOtherBrandProduct = (id, name) => {
	event.preventDefault();
	let product = $('#otherProductBrandsModal').attr('data-product');
	$.notify(`${name} bottle added`, 'message')
	addProductToCart(product, { id, name });
}



const checkForExistingOrder = (customer) => {
	return new Promise((resolve, reject) => {

		$.notify('Please wait while system verify invoice details.', 'message')

		axios.get(route(`api.invoices.existingInvoice`, customer))
			.then(({ data }) => {
				if (!data.success) {
					Swal2.fire({
						title: 'Warning',
						html: data.message,
						icon: 'warning',
						showCancelButton: true,
						reverseButtons: true,
						confirmButtonColor: '#2ecc71',
						cancelButtonColor: '#e74c3c',
						confirmButtonText: 'Yes, Create'
					}).then((result) => {
						if (result.isConfirmed) {
							resolve(data);
						}
					})
				} else {
					resolve(data.message);
				}
			})
			.catch(err => {
				reject(err);
			})
	});
}