<!-- The Modal -->
<div {{ $attributes->class(['modal animated fadeInDownBig faster siteModal', 'full-modal' => !isset($modalType)]) }}
    data-backdrop="static" id="{{ $target }}">
    <div class="modal-dialog modal-dialog-centered @isset($modalType) {{ $modalType }} @endisset">
        <div class="modal-content">
            <!-- Modal Header -->
            @isset($title)
                <div class="modal-header header-image bg-primary rounded-0 py-2 position-sticky"
                    style="z-index: 999; top: 0">
                    <h6 class="modal-title text-white font-w300">
                        {!! $title !!}
                    </h6>
                    <button type="button" class="close text-white" style="padding: 0.6rem 1rem; !important"
                        data-dismiss="modal">&times;</button>
                </div>
            @endisset
            <!-- Modal body -->
            <div class="modal-body">
                {!! $slot !!}
            </div>
            <!-- Modal footer -->
            <div class="modal-footer mr-auto py-1">
                <button type="button" data-dismiss="modal" class="btn btn-light btn-sm rounded-0 active">Close</button>
                @isset($footer)
                    {!! $footer !!}
                @endisset
            </div>
        </div>
    </div>
</div>
