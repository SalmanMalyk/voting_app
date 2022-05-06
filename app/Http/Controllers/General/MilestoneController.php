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
        $milestones = Milestone::latest()->paginate(9);

        return view($this->path.'index',compact('milestones')); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' 		=> 'required',
            'reward' 		=> 'required|integer',
            'vote_count' 	=> 'required|integer',
            'days'		 	=> 'required|integer',
        ]);
    
        $milestone = Milestone::create([
            'title'         => $request->title,
            'reward'        => $request->reward,
            'vote_count'    => $request->vote_count,
            'days'          => $request->days,
            'status'        => $request->status ?? false
        ]);

        return response()->json(['message'      => 'Milestone created successfully.',
                                 'milestone'    => $milestone,
                                 'success'      => true,
                                 200]);

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
                        ->with('message','Milestone updated successfully');
    }

    public function destroy(Milestone $milestone)
    {
        $milestone->delete();
        return response()->json(['message' => 'Milestone deleted successfully.', 'success' => true,200]);
    }
}
