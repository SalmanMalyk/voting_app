<!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
        If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
-->
<nav id="sidebar" aria-label="Main Navigation">
    <!-- Side Header -->
    <div class="bg-header-dark">
        <div class="content-header bg-white">
            <!-- Logo -->
            <a class="font-w600 text-white tracking-wide" href="{{ route('dashboard.index') }}">
                <span class="smini-visible">
                    S<span class="opacity-75">S</span>
                </span>
                <span class="smini-hidden">
                    <x-saga.site-logo width="120" />
                </span>
            </a>
            <!-- END Logo -->

            <!-- Options -->
            <div>
                <!-- Toggle Sidebar Style -->
                <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                <!-- Class Toggle, functionality initialized in Helpers.coreToggleClass() -->
                <a class="js-class-toggle text-dark" data-target="#sidebar-style-toggler"
                    data-class="fa-toggle-off fa-toggle-on"
                    onclick="Dashmix.layout('sidebar_style_toggle');Dashmix.layout('header_style_toggle');"
                    href="javascript:void(0)" hidden>
                    <i class="fa fa-toggle-off" id="sidebar-style-toggler"></i>
                </a>
                <!-- END Toggle Sidebar Style -->

                <!-- Close Sidebar, Visible only on mobile screens -->
                <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                <a class="d-lg-none text-danger ml-2" data-toggle="layout" data-action="sidebar_close"
                    href="javascript:void(0)">
                    <i class="fa fa-times-circle"></i>
                </a>
                <!-- END Close Sidebar -->
            </div>
            <!-- END Options -->
        </div>
    </div>
    <!-- END Side Header -->

    <!-- Sidebar Scrolling -->
    <div class="js-sidebar-scroll">
        <!-- Side Navigation -->
        <div class="content-side">
            <ul class="nav-main">
                <li class="nav-main-item">
                    <a class="nav-main-link {{ isRouteEqualTo('dashboard.index') }}"
                        href="{{ route('dashboard.index') }}">
                        <i class="nav-main-link-icon fa fa-location-arrow"></i>
                        <span class="nav-main-link-name">{{ __('Dashboard') }}</span>
                    </a>
                </li>

                <li class="nav-main-heading">{{ $system_menu->name ?? '—' }}</li>

                {{-- DYNAMIC SYSTEM GENERATED MENU --}}

                @isset($system_menu->items)
                    @foreach ($system_menu->items as $key => $item)
                        @can(Illuminate\Support\Str::snake('list' . ' ' . $item->label))
                            @if (count($item['child']) == 0) {{-- IF CURRENT ITEM IN PARENT --}}
                                <li class="nav-main-item">
                                    <a class="nav-main-link {{ isRouteEqualTo($item->link) }}"
                                        href="{{ routeExists($item->link) }}">
                                        <i class="nav-main-link-icon {{ $item->class ?? 'fas fa-minus-square' }}"></i>
                                        <span class="nav-main-link-name">{{ $item->label }}</span>
                                    </a>
                                </li>
                            @else
                                <li class="nav-main-item">
                                    <a class="nav-main-link nav-main-link-submenu {{ isRouteEqualTo($item->link) }}"
                                        data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                        <i class="nav-main-link-icon {{ $item->class ?? 'fas fa-minus-square' }}"></i>
                                        <span class="nav-main-link-name">{{ $item->label }}</span>
                                    </a>
                                    <ul class="nav-main-submenu">
                                        @include('components.partials.menu_item', ['childs' => $item->child])
                                    </ul>
                                </li>
                            @endif
                        @endcan
                    @endforeach
                @endisset
                {{-- /.DYNAMIC SYSTEM GENERATED MENU --}}

                @if (auth()->user()->hasRole(['Super Admin', 'Executive Management']))
                    <li class="nav-main-item {{ Request::is('general-configuration/*') ? 'open' : '' }}">
                        <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true"
                            aria-expanded="false" href="#">
                            <i class="nav-main-link-icon fa fa-cog"></i>
                            <span class="nav-main-link-name">General Config</span>
                        </a>
                        <ul class="nav-main-submenu">
                            <li class="nav-main-item">
                                <a class="nav-main-link {{ isRouteEqualTo('dashboard.config.menu_builder') }}"
                                    href="{{ route('dashboard.config.menu_builder', ['menu' => $system_menu->id ?? null]) }}">
                                    <i class="nav-main-link-icon fa fa-bars"></i>
                                    <span class="nav-main-link-name">Menu Builder</span>
                                </a>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link {{ isRouteEqualTo('dashboard.config.roles.index') }}"
                                    href="{{ route('dashboard.config.roles.index') }}">
                                    <i class="nav-main-link-icon fa fa-inbox"></i>
                                    <span class="nav-main-link-name">Role</span>
                                </a>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link {{ isRouteEqualTo('dashboard.config.permissions.index') }}"
                                    href="{{ route('dashboard.config.permissions.index') }}">
                                    <i class="nav-main-link-icon fa fa-inbox"></i>
                                    <span class="nav-main-link-name">Permission</span>
                                </a>
                            </li>

                        </ul>
                    </li>
                @endif
            </ul>
        </div>
        <!-- END Side Navigation -->
    </div>
    <!-- END Sidebar Scrolling -->
</nav>
<!-- END Sidebar 
