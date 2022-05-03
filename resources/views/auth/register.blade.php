@section('title', 'Sign up')

<x-guest-layout>
    <div class="bg-image" style="background-image: url({{ asset('assets/media/photos/photo24@2x.jpg') }});">
        <div class="row no-gutters justify-content-center bg-primary-dark-op">
            <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
                <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
                    <a class="float-right btn btn-link mt-4 mr-4" href="{{ route('login') }}">Login</a>
                    <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-white">
                        <div class="mb-2 text-center">
                            <a class="link-fx font-w700 font-size-h1" href="/">
                                <x-saga.site-logo class="mx-auto mb-3" width="250"/>
                            </a>
                            <p class="text-uppercase font-w700 font-size-sm text-muted">Create New Account</p>
                        </div>
                        <form class="js-validation-signup" action="{{ route('register') }}" method="POST" novalidate="novalidate">
                            @csrf
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="name" class="form-control @error('name') is-invalid @enderror" id="name" name="name" placeholder="{{ __('Name') }}":value="old('name')" autofocus>
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="fa fa-user-circle"></i>
                                        </span>
                                    </div>
                                    @error('name') <div class="invalid-feedback">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="email" class="form-control  @error('email') is-invalid @enderror" id="email" name="email" placeholder="{{ __('Email') }}":value="old('email')" autofocus>
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="fa fa-envelope-open"></i>
                                        </span>
                                    </div>
                                    @error('email') <div class="invalid-feedback">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="password" class="form-control  @error('password') is-invalid @enderror" id="password" name="password" placeholder="{{ __('Password') }}"  required autocomplete="new-password">
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="fa fa-asterisk"></i>
                                        </span>
                                    </div>
                                    @error('password') <div class="invalid-feedback">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="password" class="form-control " id="password_confirmation" name="password_confirmation" placeholder="{{ __('Confirm_Password') }}" required autocomplete="new-password">
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="fa fa-asterisk"></i>
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                            {{-- <div class="form-group text-center">
                                <a class="font-w600 font-size-sm" href="{{ route('terms.show') }}" data-toggle="modal" data-target="#modal-terms">Terms of Service</a>
                                <a class="font-w600 font-size-sm" href="{{ route('policy.show') }}" data-toggle="modal" data-target="#modal-terms">Privacy Policy</a>
                                <div class="custom-control custom-checkbox custom-control-primary">
                                    <input type="checkbox" class="custom-control-input" id="signup-terms" name="signup-terms">
                                    <label class="custom-control-label" for="signup-terms">I agree</label>
                                </div>
                            </div> --}}
                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-hero-primary">
                                <i class="fa fa-fw fa-plus mr-1"></i>    {{ __('Register') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>