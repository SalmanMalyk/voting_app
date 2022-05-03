<div {{ $attributes->class(['block block-rounded block-fx-pop block-themed siteBlock']) }}>
    
@isset($header)
        <div class="block-header bg=default rounded-0 py-1">
            {{ $header }}
        </div>
    @endisset

    <div class="block-content">
    	{{ $slot }}
    </div>

    @isset($footer)
        <div class="block-content block-content-full block-content-sm bg-gray-lighter font-size-sm">
            {{ $footer }}
        </div>
    @endisset

</div>