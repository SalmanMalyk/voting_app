<div class="row">
    {{-- scheduled qty --}}
    <div class="col-md-6 col-xl-4">
        <a class="block block-rounded text-center bg-image" href="javascript:void(0)">
            <div class="block-content block-content-full bg-white">
                <div class="row gutters-tiny">
                    <div class="col-6 border-right">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/delivery-time.png') }}" alt="Scheduled Quantity"
                                class="img-fluid" width="54   ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b
                                class="font-w300 font-size-h3">{{ $scheduleDelivery->items()->productGroup(1)->sum('bottle_qty') ?? 0 }}</b>
                            <br>
                            Scheduled Quantity
                        </p>
                    </div>

                    <div class="col-6">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/truck.png') }}" alt="Actual Delivered Quantity"
                                class="img-fluid" width="54    ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b
                                class="font-w300 font-size-h3">{{ $scheduleDelivery->items()->productGroup(1)->sum('actual_bottle_qty') ?? 0 }}</b>
                            <br>
                            Actual Delivered Quantity
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>


    <div class="col-md-6 col-xl-4">
        <a class="block block-rounded text-center bg-image" href="javascript:void(0)">
            <div class="block-content block-content-full bg-white">
                <div class="row gutters-tiny">
                    <div class="col-6 border-right">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/container.png') }}" alt="Bottle Loaded"
                                class="img-fluid" width="54    ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b class="font-w300 font-size-h3">{{ $scheduleDelivery->bottle_loaded ?? 0 }}</b>
                            <br>
                            Bottle Loaded
                        </p>
                    </div>

                    <div class="col-6">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/bottle_returned.png') }}" alt="Bottle Returned"
                                class="img-fluid" width="54    ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b
                                class="font-w300 font-size-h3">{{ $scheduleDelivery->items()->productGroup(1)->sum('returned_bottle_qty') ?? 0 }}</b>
                            <br>
                            Bottle Returned
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>


    <div class="col-md-6 col-xl-4">
        <a class="block block-rounded text-center bg-image" href="javascript:void(0)">
            <div class="block-content block-content-full bg-white">
                <div class="row gutters-tiny">
                    <div class="col-6 border-right">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/customers.png') }}" alt="Bottle Loaded"
                                class="img-fluid" width="54    ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b
                                class="font-w300 font-size-h3">{{ $scheduleDelivery->details()->where('status', 4)->count() ?? null }}</b>
                            <br>
                            Customer(s) Delivered
                        </p>
                    </div>

                    <div class="col-6">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/cash.png') }}" alt="Bottle Returned"
                                class="img-fluid" width="54   ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b
                                class="font-w300 font-size-h3">{{ number_format($scheduleDelivery->details()->sum('cash_received')) ?? 0 }}</b>
                            <br>
                            Cash Received
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-md-6 col-xl-4">
        <a class="block block-rounded text-center bg-image" href="javascript:void(0)">
            <div class="block-content block-content-full bg-white">
                <div class="row gutters-tiny">
                    <div class="col-6 border-right">
                        <p class="mb-1">
                            <img src="{{ $scheduleDelivery->dispatcherUser->profile_photo_url ?? null }}"
                                alt="Dispatcher" class="img-fluid" width="54  ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b class="font-w300 font-size-h3">{{ $scheduleDelivery->dispatcherUser->name }}</b>
                            <br>
                            Dispatcher
                        </p>
                    </div>

                    <div class="col-6" ondblclick="showMeterReadings({{ $scheduleDelivery->id }})"
                        data-toggle="tooltip" data-placement="bottom"
                        title="Double click here to view vehicle readings.">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/vehicle.png') }}" alt="Vehicle"
                                class="img-fluid" width="54    ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b class="font-w300 font-size-h3">{!! $scheduleDelivery->vehicle->vehicle_name ?? 'N/A' !!}</b>
                            <br>
                            Vehicle
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-md-6 col-xl-4">
        <a class="block block-rounded text-center bg-image" href="javascript:void(0)">
            <div class="block-content block-content-full bg-white">
                <div class="row gutters-tiny">
                    <div 
                        class="col-6 border-right"
                        ondblclick="window.open(route(`dashboard.reports.delivery-process.detailMap`, {{ $scheduleDelivery->id }}), '_blank').focus()"
                    >
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/map.png') }}" alt="Distance Traveled"
                                class="img-fluid" width="54  ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b class="font-w300 font-size-h3">
                                @if (!empty($scheduleDelivery->meter_reading_end) && !empty($scheduleDelivery->meter_reading_start))
                                    {!! round($scheduleDelivery->meter_reading_end - $scheduleDelivery->meter_reading_start, 2) ?? 'N/A' !!} KM
                                @else
                                    N/A
                                @endif
                            </b>
                            <br>
                            Distance Traveled
                        </p>
                    </div>

                    <div class="col-6">
                        <p class="mb-1">
                            <img src="{{ asset('assets/media/png/clock.png') }}" alt="Total Dispatch Time"
                                class="img-fluid" width="54  ">
                        </p>
                        <p class="font-size-sm text-muted mb-0">
                            <b class="font-w300 font-size-h3">
                                @if (!empty($scheduleDelivery->dispatch_date) && !empty($scheduleDelivery->completed_date))
                                    {{ $scheduleDelivery->dispatch_date->diff($scheduleDelivery->completed_date)->format('%H:%I') }}
                                    <small class="font-size-sm">(Hours)</small>
                                @else
                                    N/A
                                @endif
                            </b>
                            <br>
                            Total Dispatch Time
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>


    <div class="col-md-6 col-xl-4">
        <div id="percentage-bar" style="height: 160px"></div>
    </div>
</div>
