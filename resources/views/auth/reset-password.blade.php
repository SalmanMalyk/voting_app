
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
                     
                    </div>
                    <form class="js-validation-signup" action="{{ route('password.update') }}" method="POST" novalidate="novalidate">
                        @csrf
                       
                        <div class="form-group">
                            <div class="input-group">
                                <input type="email" class="form-control" id="email" name="email" placeholder="{{ __('Email') }}":value="old('email')" autofocus>
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-envelope-open"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="password" class="form-control" id="password" name="password" placeholder="{{ __('Password') }}"  required autocomplete="new-password">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-asterisk"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="{{ __('Confirm Password') }}" required autocomplete="new-password">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-asterisk"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                      
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-hero-primary">
                                <i class="fa fa-fw fa-plus mr-1"></i>    {{ __('Reset Password') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</x-guest-layout>