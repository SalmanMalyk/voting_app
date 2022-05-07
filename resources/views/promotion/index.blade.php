@section('title', 'Promotion '.moduleTite())
@push('script')
<script src="{{ auto_version('js/pages/master/promotion/index.js') }}"></script>
@endpush
@push('modals')
@include('promotion.create')
@include('promotion.edit')
@endpush
<x-app-layout>
<x-breadcrumbs>Promotion Management</x-breadcrumbs>
<div class="content">
	<div class="row">
		<div class="col-md-12">
			<x-saga.card>
			<x-slot name="header">
			<h3 class="block-title">{{ menuTitle() }} <small>List</small></h3>
			<div class="block-options">
				@can('create_promotion')
				<button class="btn btn-light btn-sm mr-3" data-toggle="modal" data-target="#createPromotionModal">
				<i class="si si-plus mr-1"></i> Create Promotion
				</button>
				@endcan
				<button type="button" class="btn-block-option" data-toggle="block-option"
				data-action="content_toggle"><i class="si si-arrow-up"></i></button>
				<button type="button" class="btn-block-option" data-toggle="block-option"
				data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
			</div>
			</x-slot>
			<div class="table-responsive">
				<table class="table table-sm table-bordered table-striped table-hover table-vcenter siteDataTable w-100">
					<thead class="bg-primary text-white">
						<tr>
							<th class="text-center v-middle" scope="col" width="10px">#</th>
							<th class="text-left v-middle" scope="col">Description</th>
							<th class="text-right v-middle" scope="col">Start Date</th>
							<th class="text-right v-middle" scope="col">End Date</th>
							<th scope="col" class="text-center v-middle">Image</th>
							<th class="text-center v-middle" scope="col">Status</th>
							<th class="text-center v-middle" scope="col">Action</th>
						</tr>
					</thead>
				<tbody class="promotion">
					
				</tbody>
			</table>
		</div>
		</x-saga.card>
	</div>
</div>
</div>
</x-app-layout>