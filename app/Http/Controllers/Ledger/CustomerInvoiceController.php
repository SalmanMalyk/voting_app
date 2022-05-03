<?php

namespace App\Http\Controllers\Ledger;

use PDF;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Module\Customer\CustomerBranch;

class CustomerInvoiceController extends Controller
{
    public $path = 'ledgers.customer_invoice.';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view($this->path. 'index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        if($request->ajax() || $request->wantsJson()) {
            $params = $request->params;

            $from = Carbon::parse($params['date_from'])->startOfDay();
            $to = Carbon::parse($params['date_to'])->endOfDay();
            
            $formatted_from_date = Carbon::parse($params['date_from'])->format('d-M-Y');
            $customer_branch_id = $params['customer_id'];
            $data = DB::select("SELECT 1 orderBy, m.id, m.customer_branch_id, customer_receivable(m.customer_branch_id, '$formatted_from_date') as remaing_balance, str_to_date(date_format(m.dispatch_date,'%d-%b-%Y'),'%d-%b-%Y') dated, date_format(m.dispatch_date,'%d-%b-%Y') display_date, m.invoice_no document_number, sum(ifnull(d.quantity,0)*(ifnull(d.product_price,0) - ifnull(d.discount_amount,0))) invoice_amount, 0      received_amount FROM invoices m,invoice_entries d where m.id=d.invoice_id and m.customer_branch_id=$customer_branch_id and status=2 and m.dispatch_date between '$from' and '$to' group by m.id, m.customer_branch_id, m.dispatch_date, m.invoice_no 
                          union SELECT 2 orderBy, id, customer_branch_id,     '' remaing_balance,                                                                   str_to_date(date_format(payment_date,'%d-%b-%Y'),'%d-%b-%Y') dated,    date_format(payment_date,'%d-%b-%Y') display_date,    '' document_number,           0 invoice_amount,                                                                                   amount received_amount FROM `payment_receiveds` where customer_branch_id=$customer_branch_id and status=1 and payment_date between '$from' and '$to' ORDER BY dated, orderBy");
            
            return response()->json(['results' => $data], 200);
        }
    }



    public function customerInvoiceProducts()
    {
      return view('ledgers.customer_invoice_by_products.index');   
    }


    public function customerInvoiceProductResults(Request $request)
    {
        if($request->ajax() || $request->wantsJson()) {
            $params = $request->params;

            
            $from = Carbon::parse($params['date_from'])->startOfDay();
            $to = Carbon::parse($params['date_to'])->endOfDay();
            
            $formatted_from_date = Carbon::parse($params['date_from'])->format('d-M-Y');
            $customer_branch_id = $params['customer_id'];
            $data = DB::select("SELECT 1 orderBy, m.id, m.customer_branch_id, customer_receivable(m.customer_branch_id, '$formatted_from_date') as remaing_balance, bottle_returned returned, str_to_date(DATE_FORMAT(m.dispatch_date, '%d-%b-%Y'), '%d-%b-%Y') dated, DATE_FORMAT(m.dispatch_date, '%d-%b-%Y') display_date, m.invoice_no document_number,  ifnull(d.quantity,0) as qty,                                                     ifnull(d.product_price, 0) pRate, p.name as pName,       0      received_amount, IFNULL(d.discount_amount,0) discount_amount  FROM invoices m,invoice_entries d, products p where d.product_id=p.id and m.id=d.invoice_id and m.customer_branch_id=$customer_branch_id and m.status=2 and m.dispatch_date between '$from' and '$to'
                      union ALL SELECT 2 orderBy, payment_receiveds.id id   ,   customer_branch_id,   '' remaing_balance,                                           ''              returned, str_to_date(DATE_FORMAT(payment_date, '%d-%b-%Y'), '%d-%b-%Y')    dated, DATE_FORMAT(payment_date, '%d-%b-%Y') display_date,    IF(payment_receiveds.payment_type_id = 1, payment_receiveds.document_number, pt.title) document_number,  0 qty,   0 pRate,                         pt.title pName, amount received_amount, 0                           discount_amount  FROM `payment_receiveds` LEFT JOIN payment_types pt ON pt.id = payment_receiveds.payment_type_id where IFNULL(amount, 0) > 0 AND customer_branch_id=$customer_branch_id and status=1 and payment_date between '$from' and '$to' ORDER BY dated, orderBy, id");
            return response()->json(['results' => $data], 200);
            
        }

    }


    public function generateCustomerProductsLedgerPdf(Request $request)
    {
        // if($request->ajax() || $request->wantsJson()) {
            $from = Carbon::parse($request['date_from'])->startOfDay();
            $to = Carbon::parse($request['date_to'])->endOfDay();
            
            $formatted_from_date = Carbon::parse($request['date_from'])->format('d-M-Y');
            
            $data = DB::select("SELECT 1 orderBy, m.id, m.customer_branch_id, customer_receivable(m.customer_branch_id, '$formatted_from_date') as remaing_balance, bottle_returned returned, str_to_date(DATE_FORMAT(m.dispatch_date, '%d-%b-%Y'), '%d-%b-%Y') dated, DATE_FORMAT(m.dispatch_date, '%d-%b-%Y') display_date, m.invoice_no document_number,  ifnull(d.quantity,0) as qty,                                                     ifnull(d.product_price, 0) pRate, p.name as pName,       0      received_amount, IFNULL(d.discount_amount,0) discount_amount  FROM invoices m,invoice_entries d, products p where d.product_id=p.id and m.id=d.invoice_id and m.customer_branch_id=$request->customer and m.status=2 and m.dispatch_date between '$from' and '$to'
                      union ALL SELECT 2 orderBy, payment_receiveds.id id   ,   customer_branch_id,   '' remaing_balance,                                          ''               returned, str_to_date(DATE_FORMAT(payment_date, '%d-%b-%Y'), '%d-%b-%Y')    dated, DATE_FORMAT(payment_date, '%d-%b-%Y') display_date,    IF(payment_receiveds.payment_type_id = 1, payment_receiveds.document_number, pt.title) document_number,  0 qty,   0 pRate,                         pt.title pName, amount received_amount, 0                           discount_amount  FROM `payment_receiveds` LEFT JOIN payment_types pt ON pt.id = payment_receiveds.payment_type_id where IFNULL(amount, 0) > 0 AND customer_branch_id=$request->customer and status=1 and payment_date between '$from' and '$to' ORDER BY dated, orderBy, id");


            
            // GENERATE PDF ACCORDING TO PROVIDED DATA
            $customerBranch = CustomerBranch::findOrFail($request->customer);
            $pdf = PDF::loadView('layouts.pdf.invoice_print', [
                        'customerBranch' => $customerBranch,
                        'dates' => [
                            'from' => $from,
                            'to' => $to,
                        ],
                        'data' => $data
                    ])
                    ->addInfo([
                        'Title'  => $customerBranch->customer->name . '-Ledger',
                        'Author' => auth()->user()->name,  
                        'Creator' => config('app.name'),  
                        'Subject' => 'Customer Products Ledger',  
                    ]);

            $fileNameDates = $from->format('M') . (($from->format('M') !== $to->format('M')) ? ', '.$to->format('M Y') : '-'.$to->format('Y'));
            return $pdf->stream(Str::title($customerBranch->customer->name .' ('.$fileNameDates.') Ledger.pdf'));
        // }
    }
    
}
