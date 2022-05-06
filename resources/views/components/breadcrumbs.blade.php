<div class="content mb-0 pt-3">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
        <h1 class="flex-sm-fill font-size-h3 font-w400 mt-2 mb-0 mb-sm-2">{{ $slot }}</h1>
        <nav class="flex-sm-00-auto ml-sm-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="{{ route('dashboard.index') }}">Dashboard</a>
                </li>
                @php
                    $segments = '';
                @endphp

                @foreach(Request::segments() as $segment)
                    @if(!is_numeric($segment))
                        <?php $segments .= '/'.$segment; ?>
                        <li class="breadcrumb-item active text-capitalize" aria-current="page">{{ str_replace('-', ' ', $segment) }}</li>
                    @endif
                @endforeach
            </ol>
        </nav>
    </div>
</div>



<x-saga.alerts />
