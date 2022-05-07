<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\General\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PromotionController extends Controller
{
    public $path = 'promotion.';
    public $route;

    public function __construct()
    {
        if(isset(request()->route()->action['as'])) {
            $route = explode('.', request()->route()->action['as']);
            array_pop($route);
            $this->route = implode('.', $route);
        }
    }

    public function index()
    {
        $promotions = Promotion::latest()->get();
        return view($this->path.'index',compact('promotions')); 
    }

    public function show()
    {
        $promotions = Promotion::latest()->get();
        return view('promotion.view', compact('promotions'))->render();
    }


    public function store(Request $request)
    {
    	try {
            \DB::beginTransaction();

            $promotion = Promotion::create([
                'description'       => $request->description,
                'start_date'     	=> $request->start_date,
                'end_date'          => $request->end_date,
                'status' 			=> $request->status ?? false,
            ]);

            if ($request->promotion_image) {
                $file = Storage::disk('public_uploads')->put('Promotion', $request->file('promotion_image'));
                $promotion->update([
                    'image' => $file
                ]);
            }

            \DB::commit();
            return response()->json(['message' => "Promotion created successfully."], 200);
        } catch (\Exception $e) {
            \DB::rollBack();
            dd($e);
            return response()->json(['message' => "Something went wrong."], 500);
        }
    }

    public function edit(Promotion $promotion)
    {
        return response()->json($promotion);
    }

    public function update(Promotion $promotion, Request $request)
    {
    	try {
            \DB::beginTransaction();

            $promotion->update([
                'description'       => $request->description,
                'start_date'     	=> $request->start_date,
                'end_date'          => $request->end_date,
                'status' 			=> $request->status ?? false,
            ]);

            if ($request->promotion_image) {
            	Storage::disk('public_uploads')->delete($promotion->image);
                $file = Storage::disk('public_uploads')->put('Promotion', $request->file('promotion_image'));
                $promotion->update([
                    'image' => $file
                ]);
            }

            \DB::commit();
            return response()->json(['message' => "Promotion updated successfully."], 200);
        } catch (\Exception $e) {
            \DB::rollBack();
            dd($e);
            return response()->json(['message' => "Something went wrong."], 500);
        }
    }

     public function destroy(Promotion $promotion)
    {
        Storage::disk('public_uploads')->delete($promotion->image);
        $promotion->delete();
        return response()->json(['message' => 'Promotion deleted successfully.', 'success' => true,200]);
    }

}
