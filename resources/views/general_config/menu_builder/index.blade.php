@section('title', 'Menu Builder '.moduleTite())

@push('script')
    {!! Menu::scripts() !!}
@endpush

<x-app-layout>
    {{-- <x-breadcrumbs>Menu Builder</x-breadcrumbs> --}}

    <div class="content">
        <div class="block block-rounded">
            <div class="block-content text-center">
                {!! Menu::render() !!}
            </div>
        </div>
    </div>
</x-app-layout>


