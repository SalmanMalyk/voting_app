@foreach($childs as $row)
	<div class="block block-rounded mb-1 block-rounded shadow-sm">
	    <div class="block-header block-header-default border border-bottom-0" role="tab">
	        <a class="font-w700 text-dark" data-toggle="collapse" href="#{{ Illuminate\Support\Str::snake($row->label).'_'.$row->id }}">
	        	<i class="fas mr-3"></i> {{ $row->label }}
	        </a>
	        <div class="block-options">
                <div class="custom-control custom-checkbox custom-checkbox-square custom-control-lg custom-control-primary mb-1 float-right">
                    <input type="checkbox" class="custom-control-input selectall" id="select_all_{{ Illuminate\Support\Str::snake($row->label) }}" {{ isset($role) ? ($role->hasAllPermissions(Spatie\Permission\Models\Permission::where('menu_item_id', $row->id)->get()) ? 'checked' : '') : ''}}>
                    <label class="custom-control-label" for="select_all_{{ Illuminate\Support\Str::snake($row->label) }}">Select all</label>
                </div>
            </div>
	    </div>
	    <div id="{{ Illuminate\Support\Str::snake($row->label).'_'.$row->id }}" class="collapse border border-top-0" role="tabpanel">
	        <div class="block-content">
	        	<div class="form-group">
	        		@include('general_config.roles.permission_checkbox', ['id' => $row->id])
	        	</div>
	           	@if($row->child)
                   @include('general_config.roles.permission_accordion', ['childs' => $row->child])
                @endif
	        </div>
	    </div>
	</div>
@endforeach