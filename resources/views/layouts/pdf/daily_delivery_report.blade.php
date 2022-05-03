<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- Stylesheets -->
    <style type="text/css">
        @page {
            margin: 30px !important;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
        }

        #statement {
            font-size: 30px;
            margin: 0;
        }

        td {
            font-size: 12px;
        }

        .invoice_entries {
            border-collapse: collapse;
        }

        #gTotal {
            background-color: #4caeb4;
            color: #fff;
            padding: 6px 8px;
            width: 100%;
            margin-top: 30px;
        }

        @media print {
            .printCode {
                display: none;
            }

            .invoice_entries thead td {
                background: #4caeb4;
                color: #fff;
                font-weight: bold;
            }
        }

        .clearfix {
            overflow: auto;
        }

        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }

        .rAlignRight {
            float: right;
        }

        .rAlignRight table {
            border: 1px solid #cecece;
            padding: 4px;
        }

        .invoice_entries_table {
            border-collapse: collapse;
        }

        .invoice_entries_table thead {
            background: #4caeb4;
            color: #fff;
            font-weight: bold;
            font-size: 12px;
            border-left-color: #cecece;
        }

        .invoice_entries_table thead td {
            border-left: 1px solid #fff;
        }

        .invoice_entries_table td {
            padding: 6px 3px;
            font-size: 11px;
        }

        .invoice_entries_table tbody tr:nth-child(1) {
            background: #EFEFEF;
        }

        .invoice_entry_footer td {
            font-weight: bold;
            background: #cecece;
            min-height: 30px;
            border-left-color: #cecece;
            vertical-align: middle;
        }
        .delivery_details_table {
            border-bottom: 2px solid #444 !important;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
            font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
            font-weight: 400;
            line-height: 1.5;
            text-align: left;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            font-size: 12px;
            color: #495057;
            background-color: transparent;
            border: 1px solid #e2e8f2;
            position: relative!important;
            border-color: #e5e7ef;
            border-bottom: 2px solid #444 !important;
            clear: both;
            margin-top: 6px !important;
            margin-bottom: 6px !important;
            max-width: none !important;
            border-collapse: separate !important;
            border-spacing: 0;
            border-right-width: 0;
            width: 100%;
        }
        
        .delivery_details_table th {
            vertical-align: middle !important;
            border: 1px solid #06080D !important;
            border-top: 2px solid #444 !important;
            font-size: 10px;
        }

        .delivery_details_table td {
            vertical-align: middle !important;
            border: 1px solid #afafaf;
            font-size: 10px;
            padding: 2px;
        }
        
        .dark {
            background: #343A40 !important;
            color: #fff !important;            
        }
        .blue {
            background: #1F4E78 !important;
            color: #fff !important;
        }

        .yellow {
            background: #FFF2CC !important;
            color: #111 !important;
        }
        
        .light-yellow {
            background: #EFE6D1 !important;
            color: #111 !important;
        }
        
        .pink {
            background: #FACEE4 !important;
            color: #111 !important;
        }
        
        .sky {
            background: #D6DDEE !important;
            color: #111 !important;
        }
        
        .green {
            background: #E5F2DD !important;
            color: #111 !important;
        }

        .border-left-solid {
            border-left: 2px solid #444 !important;
        }
        
        .border-right-solid {
            border-right: 2px solid #444 !important;
        }

        .delivery_details_table td:nth-child(1) {
            border-left: 2px solid #444 !important;
        }
        .delivery_details_table td:nth-child(7) {
            border-left: 2px solid #444 !important;
        } 
        .delivery_details_table td:nth-child(9) {
            border-right: 2px solid #444 !important;
        } 
        .delivery_details_table td:nth-child(11) {
            border-right: 2px solid #444 !important;
        }
        .delivery_details_table td:nth-child(12) {
            border-right: 2px solid #444 !important;
        }
        .delivery_details_table td:nth-child(17) {
            border-right: 2px solid #444 !important;
        }
        .delivery_details_table td:nth-child(19) {
            border-right: 2px solid #444 !important;
        }
        .delivery_details_table td:nth-child(20) {
            border-right: 2px solid #444 !important;
        }
    </style>
</head>

<body>
    <div class="mailmsg clearfix">
        <table width="100%">
			<tr>
				<td colspan="2" height="10"></td>
			</tr>
			<tr>
				<td align="left" width="50%">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAABnCAMAAAAjWM70AAADAFBMVEVMaXH////+/v78/v3///////////////7////+//////////////////////////////////+y0ND///8AcHD////////////////+//////////////8FcnMTeHn+/v7///8AcnT////////8/f3///////////////////8AcnMBcXL////+/v7///8Cc3QAc3T///8AcnMAbm////8AcnT///8BcnQAcnP///8AcXMAc3QAc3T////////9/v4Abm////8AXF3////////E1tsAX2ChxMP///9SiI+Nu7qry8wziopMmJnA2dc+i4uPs7KFtrT////tICbvICbsHibrHybsGCHiHiTsGyTlHiTqHyboHiWOAQHUHCLtJSbfHSPYHSOVAQLbHSPyaUztKiiHAAC4FRqcAQLyclR8AQDtMCnzeVn2jGzGGh/LGiD3lnm9FxzuPDD9+/nzgGD1knPwWD+xFBj3nH+nDxPQHCFyAAD0hmb89vLvSDfxYEXuNi3sICH4oYTqFh/CFx36s5f6t5778ezvUDj5pYijAQKfCw75qY36rpPuQjKtDxXJAALAAQOvAgT73dP96+XxT0D849zRAQRqAQDmBQn80L3Fj4j7v6b8ybSoAAGaOTLVCBHcAgXXEhr8xKr818vz5d64CRD7u6LsKx+gSkO2AADfFBz4z8jevLXLBQ/mExiYIRxgAAD4i3T6v7PrIBSmPDeNKyX1q6TdCxPMERf07Of3dGGqX1jJnJU0jJm6fXbs3Nbo1M7+28Lux8C0cmsARVH4fmrkhX7zn5fNSUO+V1KvaWLQpZ97q7XuOinlz8n5xL2uU03zt7DbaWPCDBQGcYDXsarhxsDjoppko6/rZWL4aVXNcWqLsrzhKCfNNDLyWUvDgHq5Qj2gv8gYfYzhr6fUfnffS0i1ztPkMi7Ba2V6Eg3mlo7X4+fv8fPj6uzVlY4GV2NLl6TvjIePEQ0DYW6FHBXK3eGyLivkPjqht72yIR8yb3h1lpyszdPT2NqS9RdOAAAAUnRSTlMA3iEQ+rcW/vUoxc2/BtPwn28Df1I3e9kamHSlrxsNMOxmqlUKalA9WpLkKV6P5MW0R5x3Q/tigtVnN42p54pLRIihg2X8v1qH/TrJiap4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" width="140">
				</td>
                <td align="right" width="50%" >
					<h4 id="statement">Schedule Report</h4>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="10"></td>
			</tr>
			<tr>
				<td align="left">
					<table width="100%">
						<tr>
							<td width="10%">Dated: </td>
							<td>
                                <b>
                                    {{ $date->format('l-M-Y') }}
                                </b>
                            </td>
						</tr>
						<tr>
							<td colspan="2" height="5"></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2" height="5"></td>
			</tr>
		</table>

        <table
            class="table delivery_details_table"
            style="border-collapse: collapse; border-spacing: 0;">

            <thead class="font-w600 position-sticky top-0">
                <tr align="center">
                    <th scope="col" rowspan="3" class="blue border-left-solid" width="1px">#</th>
                    <th scope="col" rowspan="3" class="blue">Company</th>
                    <th scope="col" rowspan="3" class="blue">ID</th>
                    <th scope="col" rowspan="3" class="blue">Area</th>
                    <th scope="col" rowspan="3" class="blue">Cap</th>
                    <th scope="col" rowspan="3" class="blue">Rate</th>
                    <th scope="col" rowspan="3" class="blue">Dispatcher</th>

                    <th scope="col" colspan="2" class="yellow border-right-solid">Last Delivery</th>
                    <th scope="col" colspan="2" class="light-yellow border-right-solid">Delivery</th>

                    <th scope="col" colspan="8" class="dark">Payment</th>

                    <th scope="col" rowspan="3" class="bg-white border-right-solid">Remarks</th>
                </tr>

                <tr align="center">
                    <th scope="col" rowspan="2" class="yellow">Date</th>
                    <th scope="col" rowspan="2" class="yellow border-right-solid">Qty</th>

                    <th scope="col" rowspan="2" class="light-yellow">Schedule Delivery</th>
                    <th scope="col" rowspan="2" class="light-yellow border-right-solid">Current Delivery
                    </th>

                    <th scope="col" rowspan="2" class="pink border-right-solid" width="1px">Payment Mode
                    </th>
                    <th scope="col" colspan="5" class="sky border-right-solid" width="1px">Amount</th>
                    <th scope="col" colspan="2" class="green border-right-solid" width="1px">Last
                        Payment</th>
                </tr>

                <tr align="center" style="border-bottom: 2px solid #666">
                    <th scope="col" class="sky" width="1px">Previous Balance</th>
                    <th scope="col" class="sky" width="1px">Current</th>
                    <th scope="col" class="sky" width="1px">Total</th>
                    <th scope="col" class="sky" width="1px">Received</th>
                    <th scope="col" class="sky border-right-solid" width="1px">Balance</th>

                    <th scope="col" class="green" width="1px">Amount</th>
                    <th scope="col" class="green border-right-solid" width="100px">Date</th>

                </tr>

            </thead>


            <tbody>
                @foreach ($details as $key => $item)
                <tr data-id="{{ $item->customer_branch_id }}">
                    <td align="center" class="border-right-solid">{{ ++$key }}</td>                         {{-- SR --}}
                    <td 
                        data-toggle="popover" 
                        data-html="true" 
                        title="{{ $item->corporate_name }}" 
                        data-content="
                                <div class='form-row'>
                                    <div class='col-md-6'>
                                        <p class='mb-0'>Address:</p>       
                                        <p class='mb-0'>Contact Person:</p>
                                        <p class='mb-0'>Contact No:</p>    
                                    </div>
                                    
                                    <div class='col-md-6'>
                                        <p class='mb-0 font-w600'>{{ $item->address }}</p>
                                        <p class='mb-0 font-w600'>{{ $item->contact_person }}</p>
                                        <p class='mb-0 font-w600'>{{ $item->contact_no }}</p>
                                    </div>

                                </div>
                            " 
                        data-original-title="Click to view customer information. Double click to view customer ledger."
                        ondblclick="viewCustomerDetails({{ $item->customer_branch_id }}, '{{ $item->customer_name }}')" 
                    >
                        {{ $item->count_branches > 1 ? $item->corporate_name : $item->customer_name }}

                        @if(!empty($item->customer_branch_status))
                        <span class="float-right badge badge-{{$item->customer_branch_status == 0 ? 'danger' : ($item->customer_branch_status == 1 ? 'success' : ($item->customer_branch_status == 2 ? 'warning' : 'dark')) }}">
                            {{ config('constants.customer_branch_statuses')[$item->customer_branch_status] ?? null }}
                        </span>
                        @endif
                    </td>                  {{-- CUSTOMER NAME --}}
                    <td align="center">{{ $item->membership_no ?? null }}</td>   {{-- MEMBERSHIP NO --}}
                    <td  align="center" class="border-left-solid">{{ $item->name ?? null }}</td>                           {{-- TOWN NAME --}}
                    <td align="center" class="border-left-solid">{{ $item->cap ?? null }}</td>              {{-- CAP --}}
                    <td align="center" class="border-left-solid">{{ $item->rate ?? null }}</td>             {{-- Current Rate --}}
                    <td align="left" class="border-right-solid">{{ $item->dispatcher_name ?? null }}</td>             {{-- Current Rate --}}

                    {{-- Last Delivery --}}
                    <td align="center">{{ $item->last_delivery_date ?? null }}</td>  {{-- DATE --}}
                    <td align="center">{{ $item->last_delivery_qty ?? null }}</td>   {{-- QTY --}}
                    {{-- /.Last Delivery --}}

                    {{-- Delivery --}}
                    <td align="center">{{ $item->schedule_delivery ?? null }}</td>  {{-- Schedule Delivery --}}
                    <td align="center">
                        {{ $item->current_delivery ?? null }}
                        @if(!empty($item->current_delivery))
                            @if($item->current_delivery > $item->schedule_delivery)
                                <i class="float-right fa-2x text-success fas fa-caret-up"></i>
                            @elseif($item->current_delivery < $item->schedule_delivery)
                                <i class="float-right fa-2x text-danger fas fa-caret-down"></i>
                            @elseif($item->current_delivery == $item->schedule_delivery)
                                <i class="float-right text-info fas fa-pause"></i>
                            @endif
                        @endif
                    </td>  {{-- Current Delivery --}}
                    {{-- /.Delivery --}}

                    {{-- Payment --}}
                    <td align="center">{{ config('constants.payment_methods')[$item->payment_type_id] ??  null }}</td>    {{-- Payment Mode --}}
                    <td align="right">{{ $item->previous_balance ? number_format($item->previous_balance) : null }}</td>                                  {{-- previous balance --}}
                    <td align="right">{{ $item->sum_invoice_amount ? number_format($item->sum_invoice_amount) : null }}</td>                                {{-- current invoice amount --}}
                    <td align="right">{{ number_format($item->previous_balance + $item->sum_invoice_amount) ?? null }}</td>      {{-- total --}}
                    <td align="right">{{ $item->payment_received ? number_format($item->payment_received) : null }}</td>                                                              {{-- current received --}}
                    <td align="right">
                        {{ number_format(($item->previous_balance + $item->sum_invoice_amount) - $item->payment_received) }}
                    </td>                                                              {{-- remaining balance --}}
                    
                    {{-- Last Payment --}}
                    <td align="right">{{ $item->LastPayment ? number_format($item->LastPayment) : null }}</td> {{-- Last Payment Amount --}}
                    <td align="center">{{ $item->LastPaymentDate }}</td>                                                  {{-- Last Payment Date --}}
                    {{-- /.Last Payment --}}
                    {{-- /.Payment --}}
                    <td>{{ $item->reason}}</td>
                </tr>
                @endforeach 
            </tbody>

            @if(count($details) > 0)
            <tfoot>
                <tr class="table-light font-w700" style="border-top: 2px solid #666;">
                    <td colspan="2" align="center">Total</td>
                    <td align="center" class="border-left-solid">{{ collect($details)->groupBy('customer_branch_id')->count() ?? null   }}</td>
                    <td align="center" class="border-left-solid">{{ collect($details)->groupBy('town_id')->count() ?? null }}</td>
                    <td align="center" class="border-left-solid"></td>
                    <td align="center" class="border-left-solid"></td>
                    <td class="border-left-solid"></td>
                    <td align="center" class="yellow border-left-solid">{{ collect($details)->count('last_delivery_date') ?? null }}</td>
                    <td align="center" class="yellow border-right-solid" style="border-left: 0 !important">{{ collect($details)->where('last_delivery_qty', '!=', null)->sum('last_delivery_qty') }}</td>

                    <td align="right" class="light-yellow border-left-solid">{{ collect($details)->sum('schedule_delivery') ?? null }}</td>
                    <td align="right" class="light-yellow border-right-solid" style="border-left: 0 !important">{{ collect($details)->sum('current_delivery') }}</td>

                    <td class="pink border-right-solid"></td>

                    <td align="right" class="sky border-right-solid">{{ number_format(collect($details)->sum('previous_balance') ?? null) }}</td>        
                    <td align="right" class="sky border-right-solid">{{ number_format(collect($details)->sum('sum_invoice_amount') ?? null) }}</td>        
                    <td align="right" class="sky border-right-solid">
                        {{ number_format(collect($details)->sum('sum_invoice_amount') + collect($details)->sum('previous_balance')) }}
                    </td>  
                    <td align="right" class="sky border-right-solid">{{ number_format(collect($details)->sum('payment_received') ?? null) }}</td>        
                    <td align="right" class="sky border-right-solid">
                        {{ number_format((collect($details)->sum('previous_balance') + collect($details)->sum('sum_invoice_amount')) - collect($details)->sum('payment_received')) }}
                    </td>        
                    <td align="center" colspan="2" class="green border-right-solid">{{ number_format(collect($details)->sum('LastPayment') ?? null) }}</td>        
                    <td class="bg-white border-right-solid"></td>
                </tr>
            </tfoot>   
            @endif

        </table>

    </div>
</body>

</html>
