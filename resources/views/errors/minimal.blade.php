<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title', 'Error') — {{ config('app.name', 'Laravel') }}</title> 
    
        <!-- Icons -->
        <link rel="shortcut icon" href="{{ asset('assets/media/favicons/favicon.png')}}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('assets/media/favicons/favicon-192x192.png')}}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/media/favicons/apple-touch-icon-180x180.png')}}">
        <!-- END Icons -->

        <!-- Stylesheets -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
        <link rel="stylesheet" id="css-main" href="{{asset('assets/css/dashmix.min.css')}}">
        <link rel="stylesheet" id="css-theme" href="{{asset('assets/css/themes/xmodern.min.css')}}">
        <!-- END Stylesheets -->
    </head>
    <body>
        <div id="page-container">
            <!-- Main Container -->
            <main id="main-container">
                <!-- Page Content -->
                <div class="bg-image" style="background-image: url({{ asset('assets/media/photos/photo19@2x.jpg') }});">
                    <div class="hero bg-white-95">
                        <div class="hero-inner">
                            <div class="content content-full">
                                <div class="px-3 py-5 text-center">
                                    <div class="row invisible" data-toggle="appear">
                                        <div class="col-sm-6 text-center text-sm-right">
                                            <div class="display-1 text-danger font-w700">@yield('code')</div>
                                        </div>
                                        <div class="col-sm-6 text-center d-sm-flex align-items-sm-center">
                                            <div class="display-1 text-muted font-w300">Error</div>
                                        </div>
                                    </div>
                                    <h1 class="h2 font-w700 mt-1 mb-2 invisible" data-toggle="appear" data-class="animated fadeInUp" data-timeout="300">@yield('message')</h1>
                                    <h2 class="h3 font-w400 text-muted mb-5 invisible" data-toggle="appear" data-class="animated fadeInUp" data-timeout="450">
                                        Please report to <b>IT Team</b> for <br>further assistance.
                                    </h2>
                                    <div class="invisible" data-toggle="appear" data-class="animated fadeInUp" data-timeout="600">
                                        <a class="btn btn-hero-secondary" href="{{ url()->previous() }}">
                                            <i class="fa fa-arrow-left mr-1"></i> Go Back
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Page Content -->
            </main>
            <!-- END Main Container -->
        </div>
        <!-- END Page Container -->

        <script src="{{ asset('assets/js/dashmix.core.min.js') }}"></script>
        <script src="{{ asset('assets/js/dashmix.app.min.js') }}"></script>
    </body>
</html>
