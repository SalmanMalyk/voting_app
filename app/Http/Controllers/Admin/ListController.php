<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\Actions\Admin\CreateAdmin;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class ListController extends Controller
{
    public $path = 'modules.users.admins.';
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
    public function index(Request $request, DataTables $dataTables)
    {
        if ($request->ajax() || $request->wantsJson()) {
            $users = Admin::query()
                ->with('roles')
                ->whereRelation('roles', 'name', '!=', 'Super Admin')
                ->newQuery();

            return $dataTables->eloquent($users)
                ->addIndexColumn()
                ->setRowId('id')
                ->addColumn('role', function ($row) {
                    return $row->roles->pluck('name')->implode(', ');
                })
                ->editColumn('status', function ($row) {
                    return [
                        'display' => $row->status ? '<i class="fas fa-check-circle text-success"></i> Active' : '<i class="fas fa-times-circle text-danger"></i> In Active',
                        'status' => $row->status
                    ];
                })
                ->editColumn('created_at', function ($row) {
                    return [
                        'display' => $row->created_at->format('d, M-Y'),
                        'timestamp'  => $row->created_at->timestamp
                    ];
                })
                ->addColumn('action', function ($row) {
                    $btn = '
                        <div class="dropdown">
                        <button type="button" class="btn btn-link" id="dropdown-default-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdown-default-primary">
                        ';
                    if (auth()->user()->can('edit_admin')) {
                        $btn .= '
                            <a href="javascript:void(0)" class="dropdown-item mb-0 font-sm" onclick="deliverySchedule(' . $row->id . ')">
                                <i class="fas fa-edit mr-1 text-warning"></i> Edit
                            </a>
                        ';
                    }
                    if (auth()->user()->can('delete_admin')) {
                        $btn .= '
                            <a href="javascript:void(0)" class="dropdown-item mb-0 font-sm" onclick="deliverySchedule(' . $row->id . ')">
                                <i class="fas fa-times mr-1 text-danger"></i> Delete
                            </a>
                        ';
                    }

                    $btn .= '
                        </div>
                        </div>
                        ';

                    return $btn;
                })
                ->rawColumns(['action'])
                ->escapeColumns('aaData')
                ->toJson();
        }



        $roles = Role::where('name', '!=', 'Super Admin')->pluck('name', 'id');

        return view('modules.users.admins.index', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $admin = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:admins,email',
            'password' => 'required|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        $admin = CreateAdmin::execute($admin);
        // TODO: Assigning Role
        if ($admin) {
            logger('Assigning Role:', [$admin]);
        }


        return redirect()->route($this->route . '.index')->with('success', 'User Created Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
