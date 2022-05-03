<?php
namespace App\Http\Controllers\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;    
class PermissionController extends Controller
{ 
    public $path = 'general_config.permissions.';
    public $route;

    public function __construct()
    {
        if(isset(request()->route()->action['as'])) {
            $route = explode('.', request()->route()->action['as']);
            array_pop($route);
            $this->route = implode('.', $route);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $permissions = Permission::latest()->get()->groupBy('module_name');

        return view($this->path.'index',compact('permissions')); 
    
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('permissions.create');
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required',
            'guard_name' => 'required',
        ]);
    
        Permission::create($request->all());
    
        return redirect()->route('permissions.index')
                        ->with('success','Permission created successfully.');
    }
    
    /**
     * Display the specified resource.
     *
     
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {

        // return view('permissions.show',compact('permission'));

    }
    
    /**
     * Show the form for editing the specified resource.
     *
    
     * @return \Illuminate\Http\Response
     */
    public function edit(Permission $permission)
    {
        return view('permissions.edit',compact('permission'));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
    
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
         request()->validate([
            'name' => 'required',
            'guard_name' => 'required',
        ]);
    
        $permission->update($request->all());
    
        return redirect()->route('permissions.index')
                        ->with('success','Permission updated successfully');
    }
    
    /**
     * Remove the specified resource from storage.
     *
  
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
       
        $permission->delete();
 
        return redirect()->route('permissions.index')
                        ->with('success','Permission deleted successfully');
    }
}