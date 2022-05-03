@section('title', 'Dashboard')

<x-app-layout>
    <div class="content">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1 class="display-3">Welcome, {{ auth()->user()->name }}</h1>
            </div>

        </div>
    </div>
</x-app-layout>
