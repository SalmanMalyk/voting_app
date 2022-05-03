<!-- START Timeline -->
@if ($data)
    <h6 class="mb-1">Showing: {{ count($data) }} Data Changes.</h6>
    <ul class="timeline timeline-centered timeline-alt">
        @foreach ($data as $k => $audit)
            <li class="timeline-event">
                @if($audit->event == 'created')
                <div class="timeline-event-icon bg-warning">
                    <i class="fas fa-cloud-download-alt fa-lg"></i>
                </div>
                @elseif ($audit->event == 'updated')
                <div class="timeline-event-icon bg-success">
                    <i class="fas fa-cloud-upload-alt fa-lg"></i>
                </div>
                @elseif ($audit->event == 'deleted')
                <div class="timeline-event-icon bg-danger">
                    <i class="fas fa-times-circle fa-lg"></i>
                </div>
                @endif

                <div class="timeline-event-block block block-rounded">
                    <div class="block-header block-header-default p-2 bg-gray-light">
                        <h3 class="block-title text-capitalize">Event: <b>{{ $audit->event }}</b> by <b>{{ $audit->user->name }}</b></h3>
                        <div class="block-options">
                            <div class="timeline-event-time block-options-item font-size-sm font-w600">
                                {{ $audit->created_at->format('d-M-Y, h:i a') }}
                            </div>
                        </div>
                    </div>
                    <div class="block-content p-0">
                        <div class="media font-size-sm push mb-0">
                            <div class="media-body">
                                {{-- changes table --}}
                                <table class="table table-bordered table-striped table-sm table-hover">
                                    <thead class="table-primary">
                                        <th class="v-center font-w700">COLUMNS</th>
                                        <th class="v-center font-w700">VALUE (OLD)</th>
                                        <th class="v-center font-w700">VALUE (NEW)</th>
                                    </thead>
                                    <tbody class="v-center">
                                        @foreach (($audit->new_values ? $audit->new_values : $audit->old_values) as $k => $item)
                                            <tr>
                                                <td class="text-capitalize">{{ str_replace('_', ' ',$k) }}</td>
                                                <td>
                                                    {{ $audit->old_values[$k] ?? '' }}
                                                </td>
                                                <td>
                                                    {{ ($audit->new_values ? (!is_array($item) ? $item : null) : null) }}
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                                {{-- metadata --}}
                                <div id="accordion" role="tablist" aria-multiselectable="true">
                                    <div class="block block-rounded mb-2">
                                        <div class="block-header block-header-default clearfix border" role="tab" id="accordion_h{{ $k }}">
                                            <a class="font-w600" data-toggle="collapse" data-parent="#accordion" href="#accordion_{{ $k }}" aria-expanded="false" aria-controls="accordion_{{ $k }}">
                                                <i class="fas mr-1"></i> Metadata
                                            </a>
                                        </div>
                                        <div id="accordion_{{ $k }}" class="collapse" role="tabpanel" aria-labelledby="accordion_h{{ $k }}" data-parent="#accordion">
                                            <div class="block-content border p-1">
                                                <table class="table table-sm table-vcenter">
                                                    <tbody>
                                                        <tr>
                                                            <th class="border-top-0">Url</th>
                                                            <td class="border-top-0">{{ $audit->url }}</td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <th width="30%">Ip Address</th>
                                                            <td>{{ $audit->ip_address }}</td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <th>User Agent</th>
                                                            <td>{{ $audit->user_agent }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        @endforeach
    </ul>
@else
    <x-saga.not-found width="60%" />
@endif
