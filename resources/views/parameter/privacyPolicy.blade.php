@section('title', 'Privacy Policy'.moduleTite())

@push('script')
	<script src="{{ asset('assets/js/plugins/ckeditor5-classic/build/ckeditor.js') }}"></script>
	<script src="{{ auto_version('js/pages/master/Parameter/privacyPolicy.js') }}"></script>
@endpush

<x-app-layout>
<div class="content">
	<div class="block block-rounded">
		<div class="block-header block-header-default">
			<h3 class="block-title">Privacy Policy</h3>
			<div class="block-options">
				<button class="btn btn-sm btn-primary font-sm" form="privacyPolicyForm" type="submit">
				<i class="fas fa-plus mr-1"></i> Save Privacy Policy
				</button>
			</div>
		</div>
		<div class="block-content">
			<form action="javascript:void(0)" method="POST" id="privacyPolicyForm">
				<div class="mb-4">
					<textarea id="editor" class="form-control" name="privacyPolicy">@if($parameter){{ $parameter->privacy_policy }}@endif</textarea>
				</div>
			</form>
		</div>
	</div>
</div>
</x-app-layout>
