@foreach($childs as $key => $child)
    @can(Illuminate\Support\Str::snake('list'. ' ' .$child->label))
        @if(count($child['child']) == 0) {{-- IF CURRENT ITEM IN PARENT --}}
            <li class="nav-main-item">
                <a class="nav-main-link {{ isRouteEqualTo($child->link) }}" href="{{ routeExists($child->link) }}">
                    <i class="nav-main-link-icon {{ $child->class ?? 'fas fa-minus-square' }}"></i>
                    <span class="nav-main-link-name">{{ $child->label }}</span>
                </a>
            </li>
        @else
            <li class="nav-main-item">
                <a class="nav-main-link nav-main-link-submenu {{ isRouteEqualTo($child->link) }}" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                    <i class="nav-main-link-icon {{ $child->class ?? 'fas fa-minus-square' }}"></i>
                    <span class="nav-main-link-name">{{ $child->label }}</span>
                </a>
                <ul class="nav-main-submenu">
                    @include('components.partials.menu_item', ['childs' => $child->child])
                </ul>
            </li>
        @endif
    @endcan
@endforeach