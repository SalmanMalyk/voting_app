@section('title', 'Permission Management '.moduleTite())
<x-app-layout>
	<x-breadcrumbs>Permission Managment</x-breadcrumbs>
	
	<div class="content">
		<div class="row">
			@foreach($permissions as $key => $module)
			<div class="col-md-3">
				<div class="block block-rounded block-fx-pop border">
					<div class="block-header block-header-default py-1">
						<h3 class="block-title font-weight-bold text-capitalize">{{ $key ?? '-'}}</h3>
					</div>
					<div class="block-content py-3">
						@foreach($module as $value)
							<div class="custom-control custom-checkbox custom-checkbox-rounded-circle custom-control-primary mb-2">
								<input type="checkbox" class="custom-control-input" checked readonly>
								<label class="custom-control-label">{{ $value->permission_name }}</label>
							</div>
						@endforeach
					</div>
				</div>
			</div>
			@endforeach
		</div>
	</div>
</x-app-layout>