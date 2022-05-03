@section('title', 'Roles Management '.moduleTite())

@push('script')
    <script>
        $('.selectall').on('change', () => {
            event.preventDefault();

            let id = $(event.target).parents('.block-header').find('a').attr('href');

            $(id).collapse(
                $(event.target).prop('checked') ? "show" : "hide"
            )

            $(id).find('input[type="checkbox"]').prop(
                "checked",
                $(event.target).prop('checked')
            )
        })

        @if($errors->has('role_name'))
        	$('#siteModal').modal('show');
        @endif

    </script>
@endpush

@push('modals')
	@include('general_config.roles.create_modal')
@endpush

<x-app-layout>
    <x-breadcrumbs>Role(s) Management</x-breadcrumbs>

    <div class="content">
        <div class="row">
            <div class="col-md-12">
                <x-saga.card>
                	<x-slot name="header">
                		<h3 class="block-title">Role <small>Listing</small></h3>
					        <div class="block-options">
					            <a href="#" class="btn btn-light btn-sm" data-toggle="modal" data-target="#siteModal"><i class="si si-plus mr-1"></i> Create Role</a>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
					                <i class="si si-refresh"></i>
					            </button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="close">
					                <i class="si si-close"></i>
					            </button>
					        </div>
                	</x-slot>

                	<div class="table-responsive">
                		<table class="table table-sm table-hover table-bordered table-striped table-vcenter">
                			<thead align="center">
                				<tr>
                					<th class="bg-primary text-white" style="width: 100px;">#</th>
                					<th class="bg-primary text-white">Name</th>
                					<th class="bg-primary text-white" style="width: 15%;">Guard</th>
                					<th class="bg-primary text-white" style="width: 15%;">Created At</th>
                					<th class="bg-primary text-white" style="width: 100px;">Actions</th>
                				</tr>
                			</thead>
                			<tbody align="center">
                				@foreach($roles as $key => $role)
	                				<tr>
	                					<td>{{ ++$key }}</td>
	                					<td>{{ $role->name ?? '—' }}</td>
	                					<td>
	                						<span class="badge badge-success text-capitalize badge-pill"><i class="fas fa-lock mr-1"></i> {{ $role->guard_name }}</span>
	                					</td>
	                					<td>{{ $role->created_at->format('d M Y') ?? '—' }}</td>
	                					<td class="text-center">
	                						<div class="btn-group">
	                							<a href="{{ moduleRoute('index', 'edit', [$role->id]) }}" class="btn btn-sm btn-primary rounded-0 js-tooltip-enabled" data-toggle="tooltip" title="Edit Role">
	                								<i class="fa fa-pencil-alt"></i>
	                							</a>
	                							<form action="{{ moduleRoute('index', 'destroy', [$role->id]) }}" method="POST">
	                								@csrf
	                								@method('DELETE')
	                								<button type="submit" class="btn btn-sm btn-primary rounded-0 js-tooltip-enabled" data-toggle="tooltip" title="" data-original-title="Delete">
		                								<i class="fa fa-times"></i>
		                							</button>
	                							</form>
	                						</div>
	                					</td>
	                				</tr>
                				@endforeach
                			</tbody>
                		</table>
                	</div>

                </x-saga.card>
            </div>
        </div>
    </div>


</x-app-layout>