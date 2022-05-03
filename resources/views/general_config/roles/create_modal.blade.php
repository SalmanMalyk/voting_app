<x-saga.modal target="siteModal">

	<x-slot name="title">Create New Role</x-slot>

	<form action="{{ moduleRoute('index', 'store') }}" method="POST" id="roleForm">
		@csrf
		<div class="form-group">
			<label for="role_name">Role Name:<span class="text-danger">*</span></label>
			<input type="text" class="form-control form-control-alt @error('role_name') is-invalid @enderror" id="role_name" name="role_name" placeholder="Enter Role Name" value="{{ old('role_name') }}" required>
			@error('role_name')
			<div class="invalid-feedback">{{ $message }}</div>
			@enderror
		</div>
		{{-- permissions --}}
		<div class="form-group" id="accordion" role="tablist" aria-multiselectable="true">
			<label>Permissions:</label>
			@foreach($system_menu->items as $key => $menu)
			<div class="block block-rounded mb-1 block-rounded shadow-sm">
				<div class="block-header block-header-default border border-bottom-0" role="tab">
					<a class="font-w700 text-dark" data-toggle="collapse" data-parent="#accordion" href="#{{ Illuminate\Support\Str::snake($menu->label).'_'.$key }}">
						<i class="fas mr-3"></i> {{ $menu->label }}
					</a>
					<div class="block-options">
						<div class="custom-control custom-checkbox custom-checkbox-square custom-control-primary float-right">
							<input type="checkbox" class="custom-control-input selectall" id="select_all_{{ Illuminate\Support\Str::snake($menu->label) }}">
							<label class="custom-control-label" for="select_all_{{ Illuminate\Support\Str::snake($menu->label) }}">Select all</label>
						</div>
					</div>
				</div>

				<div id="{{ Illuminate\Support\Str::snake($menu->label).'_'.$key }}" class="collapse border border-top-0" role="tabpanel" data-parent="#accordion">
					<div class="block-content">
						<div class="form-group">
							@include('general_config.roles/permission_checkbox', ['id' => $menu->id])
						</div>
						@if($menu->child)
						@include('general_config.roles.permission_accordion', ['childs' => $menu->child])
						@endif
					</div>
				</div>
			</div>
			@endforeach
		</div>
	</form>


	<x-slot name="footer">
		<button type="submit" class="btn btn-primary btn-sm rounded-0" form="roleForm"><i class="fas fa-plus mr-1"></i> Create Role</button>
	</x-slot>

</x-saga.modal>