<select name="{{ $name }}" id="{{ $name }}" {{ $attributes->class(['form-control select2']) }} style="width:100%" @isset($multiple) multiple="{{ $multiple }}" @endisset></select>	

@push('script')
	<script>
		$(function() {
			var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

			$('#{{ $name }}').select2({
				placeholder: 'Select Customer',
				allowClear: true,
				minimumInputLength: 2,
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
		            processResults: function (data, params) {
						params.page = params.page || 1;

		                return {
		                    results:  $.map(data, function (v, k) {
		                        return {
		                            id: v.id,
		                            text: v.text,
		                            html: v.html,
		                            title: v.title,
		                        }
		                    }),
							pagination: {
								more: (params.page * 10) < data.count_filtered
							}
		                };
		            },
		            cache: true
		        },
				escapeMarkup: function(markup) {
					return markup;
				},
				templateResult: function(data) {
					return data.html;
				},
				templateSelection: function(data) {
					return data.text;
				}
		    });
		})
	</script>
@endpush


@push('css')

	

@endpush