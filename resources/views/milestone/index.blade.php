@section('title', 'Milestone Management '.moduleTite())

@push('modals')
	@include('milestone.create')
@endpush
@push('script')
    	<script type="text/javascript" src="js/pages/master/milestone/index.js"></script>
@endpush
<x-app-layout>
	<div class="content">
		<div class="row">
			<div class="col-md-12 text-right">
				<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#createMilestoneModal">
					<i class="fas fa-plus fa-fw mr-1"></i> Add Milestone
				</button>
			</div>
			@foreach($milestones as $key => $milestone)
			<div class="col-xl-4">
				<a class="block block-rounded block-link-shadow" href="javascript:void(0)">
					<div class="block-content block-content-full ribbon ribbon-dark ribbon-modern ribbon-primary">
						<div class="ribbon-box">
							<div class="btn-group btn-group-sm mb-2" role="group" aria-label="Small Primary Third group">
								<button type="button" class="btn btn-primary"><i class="fa fa-pencil-alt" aria-hidden="true"></i></button>
								<button type="button" class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button>
							</div>
						</div>
						<div class="py-3 text-center">
							<i class="fa fa-flag fa-4x text-gray"></i>
							<p class="fs-lg text-dark mt-3 mb-0">
								{{ $milestone->title }}
							</p>
							<p class="text-muted mb-3">
								<strong>Reward</strong> {{ $milestone->reward }} $
							</p>
							<p class="fs-sm fw-bold text-muted mb-0">
								<strong>Vote Count</strong> {{ $milestone->vote_count }}
							</p>
						</div>
					</div>
					<div class="block-content block-content-full block-content-sm text-center bg-body-light">
						<span class="fs-sm text-muted">Active for {{ $milestone->days }} Days</span>
					</div>
				</a>
			</div>
			@endforeach
		</div>
	</div>
</x-app-layout>