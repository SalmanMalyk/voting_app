@section('title', 'Under Maintenance')

<x-guest-layout>
<!-- Page Content -->
    <div class="bg-image" style="background-image: url({{ asset('assets/media/photos/photo24@2x.jpg') }});">
        <div class="hero bg-black-90">
            <div class="hero-inner">
                <div class="content content-full">
                    <div class="px-3 py-5 text-center">
                        <div class="mb-3">
                            <a class="link-fx font-w700 font-size-h1" href="index.html">
                                <span class="text-white">Erie </span><span class="text-danger">Water</span>
                            </a>
                            <p class="text-uppercase font-w700 font-size-sm text-muted">Maintenance Mode</p>
                        </div>
                        <h1 class="text-white font-w700 mt-4 mb-1">Working on some stuff..</h1>
                        <h2 class="h3 text-white-75 font-w400 text-muted mb-5">Don’t worry though, we’ll be back soon!</h2>
                        <a class="btn btn-hero-danger mb-3" href="{{ url()->previous() }}">
                            <i class="fa fa-redo-alt opacity-50 mr-1"></i> Try Again
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END Page Content -->
</x-guest-layout>