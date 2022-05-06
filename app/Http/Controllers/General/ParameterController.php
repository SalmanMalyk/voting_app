<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\General\Parameter;
use Illuminate\Http\Request;

class ParameterController extends Controller
{
    public $path = 'parameter.';
    public $route;

    public function __construct()
    {
        if(isset(request()->route()->action['as'])) {
            $route = explode('.', request()->route()->action['as']);
            array_pop($route);
            $this->route = implode('.', $route);
        }
    }

    public function termsAndConditions()
    {
        $parameter = Parameter::first();
        return view($this->path.'termsAndConditions',compact('parameter')); 
    }

    public function updatetermsAndConditions(Request $request)
    {
        if(Parameter::count() > 0)
        {
            Parameter::first()->update(['terms_and_condition' => $request->termsAndConditions]);
        }
        else
        {
            Parameter::create(['terms_and_condition' => $request->termsAndConditions]);
        }
        return response()->json(['message'=>'Terms & Conditions Saved successfully.', 'success'=> true, 200]);
    }

    public function privacyPolicy()
    {
        $parameter = Parameter::first();
        return view($this->path.'privacyPolicy',compact('parameter')); 
    }

    public function updatePrivacyPolicy(Request $request)
    {
        if(Parameter::count() > 0)
        {
            Parameter::first()->update(['privacy_policy' => $request->privacyPolicy]);
        }
        else
        {
            Parameter::create(['privacy_policy' => $request->privacyPolicy]);
        }
        return response()->json(['message'=>'Privacy Policy Saved successfully.', 'success'=> true, 200]);
    }
}
