<div class="w-100 text-center d-inline-block my-5">
    <embed   
        src="{{ asset('assets/media/svg/no-data-animate.svg') }}" 
        sizes="(max-width: 100px) 380px, 500px"  
        alt="Not Data Found"
        width="{{ isset($width) ? $width : null }}"
    >
    <h1 class="font-w700 text-dark mb-2">{{ isset($heading) ? $heading : 'Sorry!' }}</h1>
    <h4 class="font-w300">{{ isset($message) ? $message : 'No Data Found' }}</h4>
</div>