<select name="{{ $name }}" id="{{ $name }}" {{ $attributes->class(['form-control select2']) }} style="width:100%" @isset($multiple) multiple="{{ $multiple }}" @endisset {{ $attributes }}></select>	

@push('script')
	<script>
		$(function() {
			var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

			$('#{{ $name }}').select2({
				placeholder: 'Select option',
				allowClear: true,
		        ajax: {
		            url: route('{{ $route }}'),
		            dataType: 'json',
		            delay: 250,
		            data: function (params) {
			            return {
			              	_token: CSRF_TOKEN,
			              	q: params.term,
							@isset($rmb)
								rmb: {{ $rmb }},
							@endisset

			              	@isset($params)
						  		@php
						  			$params = explode(',', $params);
						  		@endphp

						  		@foreach($params as $param)
						  			{{$param}}: $('#{{$param}}').val(),
						  		@endforeach
						  	@endisset
			              	
			            };
			        },
		            processResults: function (data) {
		                return {
		                    results:  $.map(data, function (v, k) {
		                        return {
		                            id: k,
		                            text: v,
		                        }
		                    })
		                };
		            },
		            cache: true
		        }
		    });
		})
	</script>
@endpush


@push('css')

	

@endpush