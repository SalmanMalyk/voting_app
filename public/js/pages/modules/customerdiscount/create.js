var route_prefix='dashboard.master.discounts.customer-discount';


$("#customerDiscountForm").on("submit", function(event){
	event.preventDefault();
	
	let formData = new FormData(this);
	Dashmix.block('state_loading', '.siteBlock')

	axios.post(route(route_prefix+'.store'), formData)
		.then((response) => {
			$(event.target)[0].reset();
			$('#siteModal').modal('hide');
			$(".siteDataTable").DataTable().ajax.reload(null, false);
		
			Toast.fire({
				icon: 'success',
				title: response.data.message
			})
		})
		.catch(error => {
			Toast.fire({
				icon: 'error',
				title: 'Something went wrong. Please try again!'
			})
			console.error(error)
		})

		.then(() => Dashmix.block('state_normal', '.siteBlock'))
});




$( "#product_id" ).change(function() {
	var customer_id = $('#customer_id').find(":selected").val();
	var product_id = $('#product_id').find(":selected").val();
	var price_discount=$('#price_discount').val();
    axios.get(route(path+'.getProductPrice',[customer_id, product_id]))
    	.then(({data}) => {
    		$("#price").html(data);
    	})
});

function resetProductDiscountForm() {
	event.preventDefault();
  $("#customerDiscountForm").trigger("reset");
  $(".select2").val('').trigger("change.select2");
}