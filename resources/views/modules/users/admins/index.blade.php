@section('title', 'Admin | Users ' . moduleTite())

@push('modals')
    @include('modules/users/admins/create')
@endpush

@push('script')
    {{-- Add dataTable --}}
    <x-saga.datatables />
    <script src="{{ auto_version('js/pages/modules/users/admin.js') }}"></script>
@endpush

<x-app-layout>
    <x-breadcrumbs>Admin Management</x-breadcrumbs>

    <div class="content">
        <div class="row">
            <div class="col-md-12">
                <x-saga.card>
                    <x-slot name="header">
                        <h3 class="block-title">{{ menuTitle() }} <small>List</small></h3>
                        <div class="block-options">
                            @can('create_admins')
                                <a href="javascript:void(0)" class="btn btn-light btn-sm mr-3" data-toggle="modal"
                                    data-target="#createModal"><i class="si si-plus mr-1"></i> Create Admin</a>
                            @endcan
                            <button type="button" class="btn-block-option" data-toggle="block-option"
                                data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                            <button type="button" class="btn-block-option" data-toggle="block-option"
                                data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
                        </div>
                    </x-slot>
                    <div class="table-responsive">
                        <table
                            class="table table-sm table-bordered table-striped table-hover table-vcenter siteDataTable w-100">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th style="vertical-align: middle" scope="col" width="10px">#</th>
                                    <th style="vertical-align: middle" scope="col">Name</th>
                                    <th style="vertical-align: middle" scope="col">Email</th>
                                    <th style="vertical-align: middle" scope="col">Role</th>
                                    <th style="vertical-align: middle" scope="col">Status</th>
                                    <th style="vertical-align: middle" scope="col">Created At</th>
                                    <th style="vertical-align: middle" scope="col">Action</th>
                                </tr>
                            </thead>

                            <tbody></tbody>

                            <tfoot></tfoot>
                        </table>
                    </div>
                </x-saga.card>
            </div>
        </div>
    </div>
</x-app-layout>
