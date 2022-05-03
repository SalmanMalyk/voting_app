@section('title', 'Approval Workflows ' . moduleTite())

@push('script')
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="{{ asset('js/pages/workflow/index.js') }}"></script>
@endpush

@push('modals')
    @include('general_config.workflows.create')
@endpush

<x-app-layout>
    <x-breadcrumbs>Approval Workflows</x-breadcrumbs>

    <div class="content">
        <div class="row">
            <div class="col-md-12">
                <x-saga.card>
                    <x-slot name="header">
                        <h3 class="block-title">Approval <small>Workflows</small></h3>
                        <div class="block-options">
                            <a href="#" class="btn btn-light btn-sm mr-3" data-toggle="modal" data-target="#siteModal"><i
                                    class="si si-plus mr-1"></i> Create Workflow</a>
                            {{-- <button type="button" class="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
					                <i class="si si-refresh"></i>
					            </button> --}}
                            <button type="button" class="btn-block-option" data-toggle="block-option"
                                data-action="content_toggle"><i class="si si-arrow-up"></i></button>
                            <button type="button" class="btn-block-option" data-toggle="block-option"
                                data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
                            <button type="button" class="btn-block-option" data-toggle="block-option"
                                data-action="close">
                                <i class="si si-close"></i>
                            </button>
                        </div>
                    </x-slot>

                </x-saga.card>
            </div>
        </div>
    </div>
</x-app-layout>
