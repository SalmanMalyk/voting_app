@section('title', 'Privacy Policy'.moduleTite())
@push('script')
<script src="{{ asset('assets/js/plugins/ckeditor5-classic/build/ckeditor.js') }}"></script>
<script src="{{ auto_version('js/pages/master/Parameter/privacyPolicy.js') }}"></script>
@endpush
<x-app-layout>
<x-breadcrumbs>Privacy Policy</x-breadcrumbs>
<div class="content">
	<div class="row">
		<div class="col-md-12">
			<x-saga.card>
			<x-slot name="header">
			<h3 class="block-title">{{ menuTitle() }} <small>List</small></h3>
			<div class="block-options">
				@can('create_privacy_policy')
				<button class="btn btn-light btn-sm mr-3" form="privacyPolicyForm" type="submit">
				<i class="si si-plus mr-1"></i> Save Privacy Policy
				</button>
				@endcan
				<button type="button" class="btn-block-option" data-toggle="block-option"
				data-action="content_toggle"><i class="si si-arrow-up"></i></button>
				<button type="button" class="btn-block-option" data-toggle="block-option"
				data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
			</div>
			</x-slot>
			<div class="table-responsive">
				<form action="javascript:void(0)" method="POST" id="privacyPolicyForm">
					<div class="mb-4">
						<textarea id="editor" class="form-control" name="privacyPolicy">@if($parameter){{ $parameter->privacy_policy }}@endif</textarea>
					</div>
				</form>
			</div>
			</x-saga.card>
		</div>
	</div>
</div>
</x-app-layout>