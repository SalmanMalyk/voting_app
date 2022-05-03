

@section('title', 'Permission Management '.moduleTite())
 <x-app-layout>
<x-breadcrumbs>Permission Managment</x-breadcrumbs>
<div class="content">
    <div class="row">
        @section('content')
        <div class="row=12">
            <div class="col-lg-12 margin-tb">
                <div class="pull-left">
                    <h2> Show Permissions</h2>
                </div>
                <div class="pull-right">
                    <a class="btn btn-primary" href="{{ route('permissions.index') }}"> Back</a>
                </div>
            </div>
        </div>
        <div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Permission:</strong>
                    {{ $permission->name }}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Guard Name:</strong>
                    {{ $permission->guard_name }}
                </div>
            </div>
        </div>
    </div>
</div>
</x-app-layout>
