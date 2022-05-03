var path='dashboard.bottle-return';
var routePrefix = 'dashboard.bottle-return';
$(document).on('change', '#customer_id', e => {
	e.preventDefault();

	let customer = e.target.value;
	if (customer) {
		Dashmix.block('state_loading', '.siteBlock')

		axios.post(route(path+'.getCustomerDetails', customer))
		.then(({data}) => {
			console.log(data)
			$('.siteBlock .dynamic-content').html(data.view)					
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

});

function addToCart(entry) {
	event.preventDefault();
	let tr 		= $(`.entry_${entry}`);
		srn     = numeral(tr.find('.srn').text()).value(),
		qty     = numeral(tr.find('.quantity').text()).value(),
		rate    = numeral(tr.find('.rate').text()).value(),
		amount  = numeral(tr.find('.amount').text()).value(),
		discount  = numeral(tr.find('.discount').text()).value(),
		invoice	  = numeral(tr.find('.invoice').text()).value(),
		item   = tr.find('.item_name').text(),
		table  = $('.cart-table tbody'),
		cart_quantity = numeral(table.find(`tr[data-id=${entry}] .cart_qty`).text()).value();

	if(qty > 0) {
		tr.find('.quantity').text(--qty)
		tr.find('.amount').text(numeral((qty*rate)-discount).format('0,0'))
	}

	// update list amount

	if (table.find(`tr[data-id=${entry}]`).length > 0 ) {
		cart_quantity++;
		table.find(`tr[data-id=${entry}] .cart_qty`).text(cart_quantity)
		table.find(`tr[data-id=${entry}] .cart_amount`).text(numeral((rate * cart_quantity) - (discount * cart_quantity)).format('0,0'))
	} else {
		item =` 
		<tr data-id="${entry}" >
		<td  align="center">${srn}</td>
		<td  align="left">${item}</td>
		<td  hidden class='cart_invoice'>${invoice}</td>
		<td  align="right" class='cart_price'>${rate}</td>
		<td  align="right" class="cart_qty">1</td>
		<td  align="right" class="cart_amount">${ rate - discount}</td>
		<td  align="center" class="col-md-2" width="1px">
		<button class="btn btn-danger btn-sm " type="button" onclick="removeItemFromCart(${entry})">
		<i class="fas fa-minus"></i>
		</button>
		</td>
		</tr>
		`;
		table.append(item);
	}
	if(qty == 0){ 
		tr.find('.btn').prop('disabled', true)
		tr.find('.amount').text(0)
	}
	calculateTotal();
	
};

function removeItemFromCart(entry){
	event.preventDefault();
	let tr = $(`.entry_${entry}`);
	srn    = numeral(tr.find('.srn').text()).value(),
	qty    = numeral(tr.find('.quantity').text()).value(),
	rate   = numeral(tr.find('.rate').text()).value(),
	amount   = numeral(tr.find('.amount').text()).value(),
	item   = tr.find('.item_name').text(),
	table  = $('.cart-table tbody'),
	cart_quantity = numeral(table.find(`tr[data-id=${entry}] .cart_qty`).text()).value();

	if(qty == 0) {
		tr.find('.quantity').text(++qty)
		tr.find('.btn').prop('disabled', false)
	}
	else{
		tr.find('.quantity').text(++qty)
	}

	// update list amount
	tr.find('.amount').text(numeral(qty*rate).format('0,0'))

	if (table.find(`tr[data-id=${entry}]`).length > 0) {
		
		cart_quantity--;
		if(cart_quantity == 0){                                                                                                                                                                                                           
			$(event.target).parent().closest("tr").remove();
		} 

		table.find(`tr[data-id=${entry}] .cart_qty`).text(cart_quantity)
		table.find(`tr[data-id=${entry}] .cart_amount`).text(numeral(cart_quantity*rate).format('0,0'))
	} 
}
function resetBottleReturn()
{
	$('#invoiceCreateForm')[0].reset();
	event.preventDefault();
}

function storeBottleReturnDetails() {
	event.preventDefault();
	$('#submitModal').modal('toggle');
}

function addErieToCart(customer,product){ 

	event.preventDefault(); 

	let table=$('.cart-table tbody'),
	item=" ",
	tr = $(`.product_${product}`),
	// amount = numeral(table.find(`tr[data-database=${product}] .amount`).text()).value(),
	price = numeral(table.find(`tr[data-database=${product}] .price`).text()).value(),
	srn = numeral(table.find(`tr[data-database=${product}] .srn`).text()).value(),
	quantity = numeral(table.find(`tr[data-database=${product}] .cart_qty`).text()).value()

	btn = $(event.target);
	if(table.find(`tr[data-database=${product}]`).length > 0) {
		quantity++;
		table.find(`tr[data-database=${product}] .cart_qty`).text(quantity);
		let amount=numeral(table.find(`tr[data-database=${product}] .price`).text()).value()*numeral(table.find(`tr[data-database=${product}] .cart_qty`).text()).value();
		table.find(`tr[data-database=${product}] .cart_amount`).text(numeral(amount).format('0,0'));
	} else {
		btn.css('pointer-events', "none")

		axios.post(route(path+'.addErieToCart'), {	
			product_id: product,
			customer_branch: customer
		})
		.then(({data}) => {
			item =` 
			<tr data-database="${product}">
			<td  align="center" class="srn">1</td>
			<td  align="left">${data.product}</td>
			<td hidden class='cart_product'>${product}</td>
			<td  align="right" class="cart_price">${data.price}</td>
			<td  align="right" class="cart_qty">1</td>
			<td  align="right" class="cart_amount">${data.price * 1}</td>
			<td align="center">
			<button class="btn btn-danger btn-sm" type="button" onclick="removeErieFromCart(${product})">
			<i class="fas fa-minus"></i>
			</button>
			</td>
			</tr>
			`;
			table.append(item);

		})
		.catch(error => {
			console.log(error)
			Toast.fire({
				icon: "error",
				title: `Something went wrong.\nPlease try again.\n${error}`
			})
		})
		.then(() => btn.css('pointer-events', "auto"));
	}
	calculateTotal();
}
function removeErieFromCart(product){
	event.preventDefault();
	let table=$('.cart-table tbody'),
	item=" ",
	tr = $(`.product_${product}`),
	price = numeral(table.find(`tr[data-database=${product}] .price`).text()).value(),
	quantity =numeral(table.find(`tr[data-database=${product}] .cart_qty`).text()).value(),
	discount =numeral(table.find(`tr[data-database=${product}] .discount`).text()).value();
	// update list amount
	tr.find('.cart_amount').text(numeral(price*quantity).format('0,0'));

	if (table.find(`tr[data-database=${product}]`).length > 0) {
		
		quantity--;
		if(quantity == 0){                                                                                                                                                                                                           
			$(event.target).parent().closest("tr").remove();
		} 

		table.find(`tr[data-database=${product}] .cart_qty`).text(quantity);
		table.find(`tr[data-database=${product}] .cart_amount`).text(numeral((quantity*price)-discount).format('0,0'));
	} 	
}	

function calculateTotal(){
	let amount=0;
	$.each($('.cart-table tbody tr'), (k, el) => {
		let total = numeral($(el).find('.cart_amount').text()).value();
		amount=amount+total;
	})
	$('.bottle-return-total').text(numeral(amount).format('0,0'));
	calculateNetPayable();
}
function calculateNetPayable() {
	event.preventDefault();
	let total = $('.bottle-return-total').text();
	let arrears = $('.bottle-return-arrears').text();
	let netPayable =numeral(arrears).value() - numeral(total).value();
	$('.bottle-return-net-payable').text(numeral(netPayable).format('0,0'));
}


$('#submitBottleReturn').on('submit', e => {
	event.preventDefault();
	// $('.bottle-return-total').text(numeral(amount).format('0,0'));	

	let payload = new FormData($(e.target)[0]);
	payload.append('customer_id', $('#customer_id').val());
	payload.append('bottleReturnTotal', numeral($('.bottle-return-total').text()).value());
	payload.append('bottleReturnArrears', numeral($('.bottle-return-arrears').text()).value());
	payload.append('bottleReturnNetPayable', numeral($('.bottle-return-net-payable').text()).value());

		// get cart products
		let cartProducts = [];

		$.each($('.cart-table tbody tr'), (k, el) => {
			cartProducts[k] = {
				invoice_id:$(el).find('.cart_invoice').text(),
				product_id:$(el).find('.cart_product').text(),
				quantity: numeral($(el).find('.cart_qty').text()).value(),
				product_price: numeral($(el).find('.cart_price').text()).value(),
				amount: numeral($(el).find('.cart_amount').text()).value(),
			};
		});

		payload.append('cartProducts', JSON.stringify(cartProducts));

		// check if total paying amount is qual to total payable amount
		
			// send ajax request
			axios.post(route(`${routePrefix}.store`), payload)
			.then(response => {
				let data = response.data;
					// show message
					Toast.fire({
						icon: 'success',
						title: 'Bottle Return Saved successfully'
					})
					

					// hide payment modal

					$('#submitModal').modal('toggle');

				})
			.catch(err => {
				swal('Warning', 'Something went wrong.', 'error')
			})
			.then(() => $('.submit-btn').html(`<i class="fas fa-cloud-upload-alt mr-1"></i> Submit`).prop('disabled', false))                                    
		});

$("#submitModal").on('show.bs.modal', function () {
	let net_payable 	= $('#net_payable');
	let bottles			= $('#bottles');	
	let netTotal 		= $('.bottle-return-net-payable').text();
		// get total quantity
		let totalQty = 0;
		$.each($('.qty'), (k, el) => {
			totalQty += Number($(el).val());
		})
		bottles.text(totalQty);
		// set total quantity
		net_payable.text(netTotal);
		$('#quick-payable').text(netTotal);

		let amount=0;
		$.each($('.cart-table tbody tr'), (k, el) => {
			let total = numeral($(el).find('.cart_qty').text()).value();
			amount=amount+total;
		})
		$('#bottles').text(numeral(amount).format('0,0'));
	});

$('.quick-cash').on('click', e => {
	e.preventDefault();

	let quickCash = $(e.target),
	checkoutAmount = $('#amount_returned'),
	checkoutTotalPaying = $('#amount_returned'),
	checkoutTotalAmount = $('#amount_returned');

	quickCash = numeral(quickCash.text()).value();

	let total = 0;

	if ($(e.target).is('#quick-payable')) {
		total = quickCash;

	} else {
		total = numeral(checkoutTotalPaying.text()).value() + quickCash;
	}

	checkoutTotalPaying.text(numeral(total).format('0,0'));

	checkoutAmount.val(total);
	
});

$('#clear-cash-notes').on('click', e => {
	e.preventDefault();
	$('input[name=amount_returned').val('');
});
const otherProductBrands = (product) => {
	let customer_type = $('#customer_type_id').val(),
		customer = $('#customer_id').val(),
		invoice_type = $('#invoice_type_id').val();


		let popup = $('#otherProductBrandsModal');
		popup.attr('data-product', product)
		popup.modal({
			backdrop: false,
			show: true,
			focus: true
		});
	} 
const addOtherBrandProduct = (id, name) => {
	event.preventDefault();
	let product = $('#otherProductBrandsModal').attr('data-product');
	$.notify(`${name} bottle added`, 'message')
	addProductToCart(product, { id, name });
}


function addProductToCart(product, brand = null) {
	event.preventDefault();
	let table = $('.cart-table tbody'),
		tr = $(`.product_${product}`),
		price = numeral(table.find(`tr[data-database=${product}] .price`).text()).value(),
		srn = numeral(table.find(`tr[data-database=${product}] .srn`).text()).value(),
		quantity = numeral(table.find(`tr[data-database=${product}] .cart_qty`).text()).value(),
		btn = $(event.target),
		customer = $('#customer_id').val(),
		item = " ",
		discount = 0;
		otherBrand = '',
		product_price=`(${product.price})`;
		otherBrand = ` (${brand.name})`;

					item += `
						<tr data-database="${product}">
						<td  align="center" class="srn"></td>
						<td  align="left">${otherBrand}</td>
						<td hidden class='cart_product'>1>
						<td  align="right" class="cart_price"> </td>
						<td  align="right" class="cart_qty">1</td>
						<td  align="right" class="cart_amount">1</td>
						<td align="center">
						<button class="btn btn-danger btn-sm" type="button" onclick="removeErieFromCart(${product})">
						<i class="fas fa-minus"></i>
						</button>
						</td>
						</tr>
					`;
		table.append(item);
	}

