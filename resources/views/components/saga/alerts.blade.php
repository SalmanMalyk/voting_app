@push('script')
    <script>
        $(".topbar-alert").delay(2000).fadeOut(1000);
    </script>
@endpush

@if ($message = Session::get('success'))
<div class="alert alert-success alert-dismissable alert-message topbar-alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    <p class="mb-0 text-capitalize"><i class="fas fa-fw fa-check"></i> {{ $message }}</p>
</div>
@endif


@if ($message = Session::get('error'))
<div class="alert alert-danger alert-dismissable alert-message topbar-alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    <p class="mb-0 text-capitalize"><i class="fas fa-fw fa-times"></i> {{ $message }}</p>
</div>
@endif


@if ($message = Session::get('warning'))
<div class="alert alert-warning alert-dismissable alert-message topbar-alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    <p class="mb-0 text-capitalize"><i class="fas fa-fw fa-info-triangle"></i> {{ $message }}</p>
</div>
@endif


@if ($message = Session::get('info'))
<div class="alert alert-info alert-dismissable alert-message topbar-alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    <p class="mb-0 text-capitalize"><i class="fas fa-fw fa-info-circle"></i> {{ $message }}</p>
</div>
@endif

@if ($message = Session::get('status'))
<div class="alert alert-info alert-dismissable alert-message topbar-alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
    <p class="mb-0 text-capitalize"><i class="fas fa-fw fa-info-circle"></i> {{ $message }}</p>
</div>
@endif