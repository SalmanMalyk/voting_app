<x-app-layout>
<x-breadcrumbs>Menu Builder</x-breadcrumbs>
<div class="content">
    <div class="block block-rounded">
        <div class="content">
            <div class="block block-rounded">
                <div class="row=12">
                    <div class="col-lg-12 margin-tb">
                        <div class="pull-left">
                            <h2>Add New Permissions</h2>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-primary" href="{{ route('permissions.index') }}"> Back</a>
                        </div>
                    </div>
                </div>
                @if ($errors->any())
                <div class="alert alert-danger">
                    <strong>Whoops!</strong> There were some problems with your input.<br><br>
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif
                <form action="{{ route('permissions.store') }}" method="POST">
                    
                    @csrf
                    <div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Permission:</strong>
                                <input type="text" name="name" class="form-control" placeholder="Permission">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Guard Name:</strong>
                                <textarea class="form-control" style="height:150px" name="guard_name" placeholder="Guard Name"></textarea>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</x-app-layout>