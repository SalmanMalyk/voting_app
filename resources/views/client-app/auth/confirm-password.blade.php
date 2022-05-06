

<x-guest-layout>
    <div class="bg-image" style="background-image: url({{ asset('assets/media/photos/photo24@2x.jpg') }});">
        <div class="row no-gutters justify-content-center bg-primary-dark-op">
            <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
                <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
                    <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-white">
                        <div class="mb-2 text-center">
                            <a class="link-fx font-w700 font-size-h1" href="/">
                                <x-saga.site-logo class="mx-auto mb-3" width="250"/>
                            </a>
                           
                                <div class="mb-4 text-sm text-gray-600">
                                 {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
                                </div>
                        </div>
                        @if (session('status'))
                            <div class="alert alert-danger alert-dismissable" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <p class="mb-0">{{ session('status') }}</p>
                            </div>
                        @endif
                        <form class="js-validation-signin" action="{{ route('password.confirm') }}" method="POST">
                            @csrf
                            
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
                          
                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-hero-primary">
                                    <i class="fa fa-fw fa-sign-in-alt mr-1"></i>   {{ __('Confirm') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>
