@section('title', 'Privacy Policy'.moduleTite())

@push('script')
	<script src="{{ asset('assets\js\plugins\ckeditor5-classic\build\ckeditor.js') }}"></script>
	<script type="text/javascript" src="js/pages/master/Parameter/termsAndCondition.js"></script>
@endpush

<x-app-layout>
<div class="content">
	<div class="block block-rounded">
		<div class="block-header block-header-default">
			<h3 class="block-title">Terms & Conditions</h3>
			<div class="block-options">
				<button class="btn btn-sm btn-primary font-sm" form="termsAndConditionsForm" type="submit">
				<i class="fas fa-plus mr-1"></i> Save Terms & Conditions
				</button>
			</div>
		</div>
		<div class="block-content">
			<form action="javascript:void(0)" method="POST" id="termsAndConditionsForm">
				<div class="mb-4">
					<textarea id="editor" class="form-control" name="termsAndConditions">@if($parameter){{ $parameter->terms_and_condition }}@endif</textarea>
				</div>
			</form>
		</div>
	</div>
</div>
</x-app-layout>
