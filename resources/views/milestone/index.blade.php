@section('title', 'Milestone Management '.moduleTite())
@push('modals')
@include('milestone.create')
@include('milestone.edit')
@endpush
@push('script')
<script type="text/javascript">
	var canEdit = {!! auth()->user()->can('edit_milestone') ? 'true' : 'false'  !!};
	var canDelete = {!! auth()->user()->can('delete_milestone') ? 'true' : 'false'  !!};
</script>
<script type="text/javascript" src="{{ auto_version("js/pages/master/milestone/index.js") }}"></script>
@endpush
<x-app-layout>
	<x-breadcrumbs>Milestone Management</x-breadcrumbs>
	<div class="content">
		<div class="row">
			<div class="col-md-12 text-right mb-3">
				@can('create_milestone')
				<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#createMilestoneModal">
					<i class="fas fa-plus fa-fw mr-1"></i> Add Milestone
				</button>
				@endcan
			</div>
		</div>
		<div class="row milestone">
			
			
		</div>
	</div>
</x-app-layout>