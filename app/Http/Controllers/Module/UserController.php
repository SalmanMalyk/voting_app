<?php

namespace App\Http\Controllers\Module;

use Carbon\Carbon;
use App\Models\User;
use App\Enums\UserType;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class UserController extends Controller
{
    public $path = 'modules.users.';

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
    public function index()
    {
        $roles = Role::where('name', '!=', 'Super Admin')->pluck('name', 'id');
        $users = User::with('roles')->withoutAdmin()->orderBy('name', 'asc')->get();

        return view($this->path . 'index', [
            'roles' => $roles,
            'users' => $users
        ]);
    }

    public function adminUser(Request $request, DataTables $dataTables)
    {
        if ($request->ajax() || $request->wantsJson()) {
            $users = User::query()
                ->where('user_type', UserType::Admin)
                ->with('roles')
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
                    if (auth()->user()->can('edit_schedule_blocks')) {
                        $btn .= '
                            <a href="javascript:void(0)" class="dropdown-item mb-0 font-sm" onclick="deliverySchedule(' . $row->id . ')">
                                <i class="fas fa-edit mr-1 text-warning"></i> Edit
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
        $users = User::with('roles')->withoutAdmin()->orderBy('name', 'asc')->get();

        return view($this->path . 'admins/index', [
            'roles' => $roles,
            'users' => $users
        ]);
    }

    public function createAdmin(Request $request)
    {
        $user = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);


        $user['name'] = ucfirst($request->first_name . ' ' . $request->last_name);
        $user['password'] = Hash::make($request->password);
        unset($user['role_id']);

        // Create User
        $newUser = User::create($user);

        // TODO: Assigning Role
        if ($newUser) {
            logger('Assigning Role:', [$newUser]);
            $newUser->assignRole(Role::find($request->role_id));
        }


        return redirect()->route($this->route . '.index')->with('success', 'User Created Successfully.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view($this->path . 'create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'father_name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);


        $user['name'] = ucfirst($request->first_name . ' ' . $request->last_name);
        $user['password'] = Hash::make($request->password);
        unset($user['role_id']);

        // Create User
        $newUser = User::create($user);

        // TODO: Assigning Role
        if ($newUser) {
            logger('Assigning Role:', [$newUser]);
            $newUser->assignRole(Role::find($request->role_id));
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
     * Update the specified resource status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request)
    {
        if ($request->ajax() || $request->wantsJson()) {
            try {
                DB::beginTransaction();
                // decrpyt
                $id = Crypt::decryptString($request->payload);

                // update status
                $user = User::find($id);

                // delete all api tokens if exists
                if ($user->tokens()->count() > 0) {
                    $user->tokens()->delete();
                }

                $user->update(['status' => !$user->status]);

                DB::commit();
                return response()->json([
                    'status' => $user->status
                ]);
            } catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'message' => "Something went wrong.\n " . $th->getMessage()
                ]);
            }
        }
    }



    public function activityLogs(Request $request, $hash)
    {
        try {
            $id = Crypt::decryptString($hash);
            $user = User::find($id);

            $from = Carbon::parse($request->date_from)->startOfDay();
            $to   = Carbon::parse($request->date_to)->endOfDay();

            $logs = DB::table('audits')
                ->where('user_id', $user->id)
                ->whereBetween('created_at', [$from, $to])
                // ->limit(10)
                ->get();

            // return $logs;

            return view('modules.users.activity-logs', [
                'logs' => $logs,
                'user' => $user
            ]);
        } catch (DecryptException $e) {
            abort(404);
        }
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        return $user->workflowAction();
    }


    public function activeUsers(Request $request)
    {
        if ($request->ajax() || $request->wantsJson()) {
            return User::withoutAdmin()->whereStatus(true)->where('name', 'LIKE', '%' . $request->q . '%')->get(['id', 'name', 'email']);
        }
    }
}