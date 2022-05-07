        </div>
        <!-- END Page Container -->

        {{-- Plugins --}}
        <script src="{{ asset('assets/js/main-app.js')}}"></script>
        {{-- CORE JS --}}
        <script src="{{ asset('assets/js/plugins/select2/js/select2.full.min.js') }}"></script>
        <script src="{{ asset('assets/js/plugins/jquery-validation/jquery.validate.min.js') }}"></script>
        <script src="{{ asset('assets/js/plugins/notify.min.js') }}"></script>
        {{-- APP JS --}}
        <script src="{{ mix('js/vendor.js') }}"></script>
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/app.js') }}"></script>
        <script>
            // initialize select2 library
            
        </script>
        {{-- PAGE LEVEL MODALS --}}
        @stack('modals')
        {{-- change password modal --}}
        @auth
            @include('auth.change-password')
        @endauth
        {{-- Page LEvel Scripts --}}
        @stack('script')

        {{-- Global Functions --}}
        <script src="{{ asset('js/_functions.js') }}" defer></script>
    </body>
</html>
