@section('title', 'Sign in')
<x-guest-layout>
<div class="bg-primary">
    <div class="row no-gutters justify-content-center bg-primary-dark-op">
        <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
            <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
               
                {{-- <a class="float-right btn btn-link mt-4 mr-4 font-w700" data-toggle="tooltip" title="Create a new account" href="{{ route('register') }}">Register</a> --}}

                <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-white">
                    
                    <div class="mb-2 text-center">
                        <a class="{{-- link-fx  --}}font-w700 font-size-h1" href="/">
                            <x-saga.site-logo class="mx-auto mb-3" width="250"/>
                        </a>
                        <p class="text-uppercase font-w700 font-size-sm text-muted">Sign In</p>
                    </div>
                    @if (session('status'))
                    <div class="alert alert-danger alert-dismissable" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                        <p class="mb-0">{{ session('status') }}</p>
                    </div>
                    @endif
                    <form class="js-validation-signin" action="{{ route('login') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <div class="input-group">
                                <input type="email" class="form-control @error('email') is-invalid @enderror" id="login-email" name="email" placeholder="{{ __('Email') }}" value="{{ old('email') }}" autofocus>
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-user-circle"></i>
                                    </span>
                                </div>
                                @error('email') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="password" class="form-control @error('password') is-invalid @enderror" id="login-password" name="password" placeholder="{{ __('Password') }}" autocomplete="current-password">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-asterisk"></i>
                                    </span>
                                </div>
                                @error('password') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>
                        </div>
                        <div class="form-group d-sm-flex justify-content-sm-between align-items-sm-center text-center text-sm-left">
                            <div class="custom-control custom-checkbox custom-control-primary">
                                <input type="checkbox" class="custom-control-input" id="login-remember-me" name="remember">
                                <label class="custom-control-label" for="login-remember-me">Remember Me</label>
                            </div>
                            @if (Route::has('password.request'))
                                <div class="font-w600 font-size-sm py-1">
                                    <a href="{{ route('password.request') }}">{{ __('Forgot your password?') }}</a>
                                </div>
                            @endif
                        </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-hero-primary">
                            <i class="fa fa-fw fa-sign-in-alt mr-1"></i> {{ __('Sign in') }}
                            </button>
                        </div>
                    </form>
               

                </div>
            </div>
        </div>
    </div>
</div>
</x-guest-layout>