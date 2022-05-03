@foreach(Spatie\Permission\Models\Permission::where('menu_item_id', $id)->get() as $permission)
    <div class="custom-control custom-checkbox custom-checkbox-rounded-circle custom-control-lg custom-control-inline custom-control-primary">
        <input type="checkbox" class="custom-control-input" id="permission_{{ $permission->name }}" name="permissions[]" value="{{ $permission->name }}" {{ isset($role) ? ($role->hasPermissionTo($permission->name) ? 'checked' : '') : '' }}> 
        <label class="custom-control-label" for="permission_{{ $permission->name }}">{{ str_replace('_', ' ', $permission->permission_name) }}</label>
    </div>
@endforeach