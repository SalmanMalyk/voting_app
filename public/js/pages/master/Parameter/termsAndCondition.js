var path = 'dashboard';
function MinHeightPlugin(editor) {
  this.editor = editor;
}

MinHeightPlugin.prototype.init = function() {
  this.editor.ui.view.editable.extendTemplate({
    attributes: {
      style: {
        minHeight: '300px'
      }
    }
  });
};

ClassicEditor.builtinPlugins.push(MinHeightPlugin);

ClassicEditor.create( document.querySelector( '#editor' ),{
	placeholder: 'Type the content here!',
})
.catch( error => {
	console.error( error );
});


$("#termsAndConditionsForm").on("submit", function(event){
	event.preventDefault();
	var formData = new FormData(this);

 axios.post(route(`${path}.updatetermsAndConditions`), formData)
		.then(({ data }) => {
			Toast.fire({
						title: data.message,
						icon: 'success'
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



})