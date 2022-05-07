<?php

namespace App\Http\Controllers\General;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public $path = 'general_config.roles.';
    public $route;

    public function __construct()
    {
        if (isset(request()->route()->action['as'])) {
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
    public function index(Request $request)
    {
        $roles = Role::where('name', '!=', 'Super Admin')->orderBy('id', 'DESC')->paginate(5);

        return view($this->path . '.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view($this->path . '.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'role_name' => 'required|unique:roles,name',
        ], [
            'role_name.required' => 'Please enter role name',
            'role_name.unique' => 'Role name already exists.'
        ]);

        $role = Role::create([
            'name' => $request->role_name
        ]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route($this->route . '.index')->with('success', 'Role Created Successfully.');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")
            ->where("role_has_permissions.role_id", $id)
            ->get();

        return view('roles.show', compact('role', 'rolePermissions'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        return view($this->path . '.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'role_name' => 'required|unique:roles,name,' . $role->id,
        ], [
            'role_name.required' => 'Please enter role name',
            'role_name.unique' => 'Role name already exists.',
        ]);

        $role->update(['name' => $request->role_name]);

        $role->syncPermissions($request->permissions);

        return redirect()->route($this->route . '.index')->with('success', 'Role updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route($this->route . '.index')->with('success', 'Role deleted successfully');
    }
}