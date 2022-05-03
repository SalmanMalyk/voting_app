@section('title', 'Create Role '.moduleTite())

@push('script')
    <script>
        $('.selectall').on('change', () => {
            event.preventDefault();

            let id = $(event.target).parents('.block-header').find('a').attr('href');

            $(id).collapse(
                $(event.target).prop('checked') ? "show" : "hide"
            )

            $(id).find('input[type="checkbox"]').prop(
                "checked",
                $(event.target).prop('checked')
            )
        })
    </script>
@endpush

<x-app-layout>
    <x-breadcrumbs>Role Management</x-breadcrumbs>

    <div class="content">
        <div class="row">
            <div class="col-md-12">
                <x-saga.card>
                    <x-slot name="header">
                        <h3 class="block-title">Create New Role</h3>
                        <div class="block-options">
                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="close">
                                <i class="si si-close"></i>
                            </button>
                        </div>
                    </x-slot>

                    <form action="{{ moduleRoute('create', 'store') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="role_name">Role Name:<span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-alt @error('role_name') is-invalid @enderror" id="role_name" name="role_name" placeholder="Enter Role Name" value="{{ old('role_name') }}" required>
                            @error('role_name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        {{-- permissions --}}
                        <div class="form-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <label>Permissions:</label>
                            @foreach($system_menu->items as $key => $menu)
                                <div class="block block-rounded mb-1 block-rounded shadow-sm">
                                    <div class="block-header block-header-default border border-bottom-0" role="tab">
                                        <a class="font-w700 text-dark" data-toggle="collapse" data-parent="#accordion" href="#{{ Illuminate\Support\Str::snake($menu->label).'_'.$key }}">
                                            <i class="fas mr-3"></i> {{ $menu->label }}
                                        </a>
                                        <div class="block-options">
                                            <div class="custom-control custom-checkbox custom-checkbox-square custom-control-primary float-right">
                                                <input type="checkbox" class="custom-control-input selectall" id="select_all_{{ Illuminate\Support\Str::snake($menu->label) }}">
                                                <label class="custom-control-label" for="select_all_{{ Illuminate\Support\Str::snake($menu->label) }}">Select all</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="{{ Illuminate\Support\Str::snake($menu->label).'_'.$key }}" class="collapse border border-top-0" role="tabpanel" data-parent="#accordion">
                                        <div class="block-content">
                                            <div class="form-group">
                                                @include('general_config.roles/permission_checkbox', ['id' => $menu->id])
                                            </div>
                                            @if($menu->child)
                                               @include('general_config.roles.permission_accordion', ['childs' => $menu->child])
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        {{-- submit --}}
                        <div class="form-group mt-5">
                            <a href="{{ moduleRoute('create', 'index') }}" class="btn btn-light btn-sm rounded-0 active"><i class="fas fa-chevron-left mr-1"></i> Go Back</a>
                            <button type="submit" class="btn btn-primary btn-sm rounded-0"><i class="fas fa-plus mr-1"></i> Create Role</button>
                        </div>
                    </form>

                </x-saga.card>
            </div>
        </div>
    </div>  

</x-app-layout>