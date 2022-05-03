<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#3B5998"/>
        <title>@yield('title', 'Page') — {{ config('app.name', 'Laravel') }}</title> 
        
        <!-- Icons -->
        <link rel="shortcut icon" href="{{ asset('assets/media/favicons/favicon.png')}}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('assets/media/favicons/favicon-192x192.png')}}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/media/favicons/apple-touch-icon-180x180.png')}}">
        <!-- END Icons -->

        <!-- Stylesheets -->
        <link rel="stylesheet" type="text/css" href="{{ auto_version('assets/css/dashmix.min.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
        
        {{-- laravel token --}}
        <script>
            window.Laravel = @json(['csrfToken' => csrf_token()]);
        </script>
        
        @if(!auth()->guest())
            <script>
                window.userId = {{ auth()->id() ?? null }};
            </script>
        @endif
        {{-- Page Level Css  --}}
        @stack('css')
    </head>
<body>