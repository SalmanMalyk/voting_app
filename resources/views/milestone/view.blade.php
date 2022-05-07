@forelse($milestones as $key => $milestone)
	<div class="col-xl-4  milestone-{{ $milestone->id }}">
		<a class="block block-rounded block-link-shadow" href="javascript:void(0)">
			<div class="block-content block-content-full ribbon ribbon-dark ribbon-modern ribbon-primary">
				@if(auth()->user()->can('edit_milestone') || auth()->user()->can('delete_milestone'))
				<div class="ribbon-box">
					<div class="btn-group btn-group-sm mb-2" role="group" aria-label="Small Primary Third group">
						@can('edit_milestone')
						<button type="button" class="btn btn-primary" onclick="editMilestone({{ $milestone->id }})"><i class="fa fa-pencil-alt" aria-hidden="true"></i></button>
						@endcan
						@can('delete_milestone')
						<button type="button" class="btn btn-primary" onclick="deleteMilestone({{ $milestone->id }})"><i class="fa fa-times" aria-hidden="true"></i></button>
						@endcan
					</div>
				</div>
				@endif
				<div class="py-3 text-center">
					<i class="fa fa-flag fa-4x text-gray"></i>
					<p class="fs-lg h4 text-primary mt-3 mb-0 font-w700">
						{{ $milestone->title }}
					</p>
					<p class="text-muted mt-3 mb-0 clearfix w-50 mx-auto">
						<strong class="float-left">Reward</strong>
						<span class="float-right">${{ $milestone->reward }}</span>
					</p>
					<p class="text-muted mb-0 clearfix w-50 mx-auto">
						<strong class="float-left">Votes</strong>
						<span class="float-right">{{ $milestone->vote_count }}</span>
					</p>
					@if($milestone->status == 1)
					<span class="badge badge-success badge-pill">
						<i class="fas fa-check-circle fa-fw"></i> Active
					</span>
					@else
					<span class="badge badge-danger badge-pill">
						<i class="fas fa-times-circle fa-fw"></i> In Active
					</span>
					@endif
				</div>
			</div>
			<div class="block-content block-content-full block-content-sm text-center bg-body-light">
				<span class="fs-sm text-muted">Active for {{ $milestone->days }} Days</span>
			</div>
		</a>
	</div>
@empty
	<x-saga.not-found width="500" />
@endforelse

<div class="col-md-12">
	{!! $milestones->links() !!}
</div>