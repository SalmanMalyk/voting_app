<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\General\Milestone;
use Illuminate\Http\Request;

class MilestoneController extends Controller
{
    public $path = 'milestone.';
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
        $milestones = Milestone::latest()->get();

        return view($this->path.'index',compact('milestones')); 
    }

    public function store(Request $request)
    {
        request()->validate([
            'title' 		=> 'required',
            'reward' 		=> 'required',
            'vote_count' 	=> 'required|integer',
            'days'		 	=> 'required|integer',
        ]);
    
        Milestone::create($request->all());
    
        return redirect()->route('milestone.index')
                        ->with('success','Milestone created successfully.');
    }

    public function update(Request $request, Milestone $milestone)
    {
        request()->validate([
            'title' 		=> 'required',
            'reward' 		=> 'required',
            'vote_count' 	=> 'required|integer',
            'days'		 	=> 'required|integer',
        ]);
    
        $milestone->update($request->all());
    
        return redirect()->route('milestone.index')
                        ->with('success','Milestone updated successfully');
    }

    public function destroy(Milestone $milestone)
    {
       
        $milestone->delete();
 
        return redirect()->route('milestone.index')
                        ->with('success','Milestone deleted successfully');
    }
}
