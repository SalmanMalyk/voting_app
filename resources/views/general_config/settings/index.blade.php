@section('title', 'App Settings '.moduleTite())

@push('script')
    <script src="{{ auto_version('js/pages/app/app-settings.js') }}"></script>
@endpush

<x-app-layout>	
	<div class="content">
		<div class="row">

            {{-- App --}}
            <div class="col-md-12">
                <x-saga.card class="block-mode-hidden">
                	<x-slot name="header">
                		<h3 class="block-title">App <small>Settings</small></h3>
					        <div class="block-options">
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
					        </div>
                	</x-slot>

                </x-saga.card>
            </div>
            
            {{-- App Theme --}}
            <div class="col-md-12">
                <x-saga.card class="block-mode-hidden">
                	<x-slot name="header">
                		<h3 class="block-title">App Theme <small>Settings</small></h3>
					        <div class="block-options">
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
					        </div>
                	</x-slot>

                </x-saga.card>
            </div>
            
            {{-- Notification settings --}}
            <div class="col-md-12">
                <x-saga.card>
                	<x-slot name="header">
                		<h3 class="block-title">App Notification <small>Settings</small></h3>
					        <div class="block-options">
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i class="si si-arrow-up"></i></button>
					            <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i class="si si-size-fullscreen"></i></button>
					        </div>
                	</x-slot>


                    <p class="text-muted">Here you can select/change notifiable groups/users of specific notifications.</p>

					<div class="block bg-light form-row">
						<div class="col-md-3 border-right">
							<ul class="nav nav-pills" data-toggle="tabs" role="tablist" style="max-height: 200px; overflow-y: scroll">
								@foreach ($notifications as $notification)
									<li class="nav-item rounded-0">
										<a class="nav-link font-sm {{ !$loop->first ?: 'active' }}" href="#{{ Str::snake($notification) }}">
											<b class="mr-2">{{ $loop->iteration }}:</b> {{ Str::headline($notification) }}
										</a>
									</li>
								@endforeach
							</ul>
						</div>

						<div class="col-md-9 border">
							<div class="block-content tab-content">
								@foreach ($notifications as $notification)
									<div class="tab-pane {{ !$loop->first ?: 'active' }}" id="{{ Str::snake($notification) }}" role="tabpanel">
										<div class="clearfix mb-3">
											<h6 class="font-w700 mb-0 text-primary float-left">
												{{ Str::headline($notification) }}
											</h6>

											<button class="btn btn-sm btn-primary float-right" onclick="saveNotificationSettings(`{{ Str::snake($notification) }}`)">
												Save Changes <i class="fas fa-arrow-right ml-1"></i>
											</button>
										</div>

										<div class="form-row">
											@foreach ($roles as $key => $role)
												<div class="col-md-3 mb-2">
													<div class="custom-control custom-block custom-control-primary">
														<input type="checkbox" class="custom-control-input" id="{{ Str::snake($notification.$role.$key) }}" name="role_ids[]" value="{{ $key }}" {{ in_array($key, \App\Models\General\AppSetting::values($notification)) ? 'checked' : null  }}>
														<label class="custom-control-label" for="{{ Str::snake($notification.$role.$key) }}">
															<span class="d-flex align-items-center justify-content-center">
																<span class="font-w700">{{ $role }}</span>
															</span>
														</label>
														<span class="custom-block-indicator">
															<i class="fa fa-check"></i>
														</span>
													</div>
												</div>
											@endforeach
										</div>
									</div>
								@endforeach
							</div>
						</div>
						
					</div>
					
                </x-saga.card>
            </div>
		</div>
	</div>
</x-app-layout>