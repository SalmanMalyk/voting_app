<header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
        <!-- Left Section -->
        <div>
            <!-- Toggle Sidebar -->
            <!-- Layout API, functionality initialized in Template._uiApiLayout()-->
            <button type="button" class="btn btn-dual" data-toggle="layout" data-action="sidebar_toggle" aria-hidden="true">
                <i class="fa fa-fw fa-bars"></i>
            </button>
            <!-- END Toggle Sidebar -->

            <!-- Open Search Section -->
            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
            {{-- <button type="button" class="btn btn-dual" data-toggle="layout" data-action="header_search_on">
                <i class="fa fa-fw fa-search"></i> <span class="ml-1 d-none d-sm-inline-block">Search</span>
            </button> --}}
            <!-- END Open Search Section -->
            
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div class="d-flex">
            <!-- User Dropdown -->
            {{-- <img src="{{ Auth::user()->profile_photo_url }}" alt="{{ auth()->user()->name }}" class="rounded-circle" title="{{ auth()->user()->name }}" style="width: 50px;height: 50px;"> --}}
            <div class="dropdown ml-2">
                <button type="button" class="btn btn-dual" id="page-header-user-dropdown" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="d-none d-sm-inline-block text-capitalize">{{ auth()->user()->name ?? 'John Doe' }}</span>
                    <i class="fa fa-fw fa-angle-down ml-1 d-none d-sm-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right p-0" aria-labelledby="page-header-user-dropdown">
                    <div class="bg-primary rounded-top font-w600 text-white text-center p-3">
                        User Options
                    </div>
                    <div class="p-2">
                        <a class="dropdown-item" href="{{ route('profile.show') }}" hidden>
                            <i class="far fa-fw fa-user mr-1"></i> {{ __('Profile') }}
                        </a>
                        
                        <a class="dropdown-item" href="javascript:void(0)" data-toggle="modal" data-target="#changePasswordModal">
                            <i class="si si-lock fa-fw mr-1"></i> {{ __('Change Password') }}
                        </a>

                        <div role="separator" class="dropdown-divider"></div>
                        <form action="{{ route('dashboard.logout') }}" method="post">
                            @csrf
                            <button type="submit" class="dropdown-item">
                                <i class="far fa-fw fa-arrow-alt-circle-left mr-1"></i> {{ __('Sign Out') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- END User Dropdown -->

            <!-- Notifications Dropdown -->
            {{-- <x-shared.notifications /> --}}
            <!-- END Notifications Dropdown -->

            <!-- Toggle Side Overlay -->
            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
            {{-- <button type="button" class="btn btn-dual" data-toggle="layout" data-action="side_overlay_toggle">
                <i class="far fa-fw fa-list-alt"></i>
            </button> --}}
            <!-- END Toggle Side Overlay -->
        </div>
        <!-- END Right Section -->
    </div>
    <!-- END Header Content -->

    <!-- Header Search -->
    {{-- <div id="page-header-search" class="overlay-header bg-header-dark">
        <div class="bg-white-10">
            <div class="content-header">
                <form class="w-100" action="be_pages_generic_search.html" method="POST">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <button type="button" class="btn btn-alt-primary" data-toggle="layout" data-action="header_search_off">
                                <i class="fa fa-fw fa-times-circle"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control border-0" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input">
                    </div>
                </form>
            </div>
        </div>
    </div> --}}
    <!-- END Header Search -->

    <!-- Header Loader -->
    <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
    <div id="page-header-loader" class="overlay-header bg-header-dark">
        <div class="bg-white-10">
            <div class="content-header">
                <div class="w-100 text-center">
                    <i class="fa fa-fw fa-sun fa-spin text-white"></i>
                </div>
            </div>
        </div>
    </div>
    <!-- END Header Loader -->
</header>
<!-- END Header -->