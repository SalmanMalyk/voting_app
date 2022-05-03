
var route_prefix='dashboard.master.discounts.customer-discount';
function showCustomerDiscount(id) {
	Dashmix.block('state_loading', '.siteBlock')

	axios.get(route(`${path}.show`, id))
		.then(({data}) => 
		{
			$("#showCustomerDiscountForm").attr('cutomer_id',id);
			$.each(data, function(key,value){
                $.each(value,function(k,v){
                if (v['invoice_type_id']==1) {
		         $('.shop_'+key).text(v['price_discount']);          
		       }
		       else if(v['invoice_type_id']==0){
		         $('.order_'+key).text(v['price_discount']);
		       }
})		              
})           

			$("#siteModalShow").modal('show',id);

		})

		// .catch(error => {
		// 	console.error('Something went wrong: '+error)
		// 	Toast.fire({
		// 		icon: 'error',
		// 		title: 'Something went wrong. Please try again!'
		// 	})
		// })

		.then(() => Dashmix.block('state_normal', '.siteBlock'))
}


// var route_prefix='dashboard.master.discounts.customer-discount';
$("#showCustomerDiscountForm").on("submit", function(event){
	event.preventDefault();
	let obj = {};
	$("#showCustomerDiscountForm tbody tr").each((k, v) => {
		obj[k] = {
		   
			product_id: $(v).attr('data-id'),
			shop_discount: $(v).find(`.shop_${$(v).attr('data-id')}`).text(),
			order_discount: $(v).find(`.order_${$(v).attr('data-id')}`).text(),
		};
	}		
	)
	Dashmix.block('state_loading', '.siteBlock')
	axios.post(route(route_prefix+'.store'), {
		data:obj,
	})
		.then((data) => {
			$(event.target)[0].reset();
			$('#siteModalShow').modal('hide');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
		})
		.catch(error => {
		
			console.error(error)
		})

		.then(() => Dashmix.block('state_normal', '.siteBlock'))
});
