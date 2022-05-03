<?php

namespace App\Http\Controllers\General;

use App\Models\User;
use ReflectionClass;
use ReflectionMethod;
use Illuminate\Http\Request;
use App\Models\General\Workflow;
use App\Http\Controllers\Controller;

class WorkflowController extends Controller
{
    public $path = 'general_config.workflows.';

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
    public function index()
    {
        return view($this->path.'index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view($this->path.'create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            \DB::beginTransaction();

            // store main setup
            $workflow = Workflow::create([
                'name'               => $request->workflow_name,
                'workflowable_model' => $request->workflowable_model,
                'method'             => $request->method,
                'user_id'            => auth()->id(),
                'status'             => true,
                'description'        => $request->description,
            ]);
            // stor user group information
            if($request->exists('approval_workflows')) {
                foreach ($request->approval_workflows as $key => $approvable) {

                    if($approvable['approval_type'] != 3) { // not specific user
                        $workflow->approvables()->create([
                            'role_id' => $approvable['role_id'],
                            'approvable_type' => ($approvable['approval_type'] == 1 ? 'any' : 'all')
                        ]);
                    } else { // store approvables against selected users
                        if(isset($approvable['approval_users'])) {
                            collect($approvable['approval_users'])->each(function($user) use ($workflow) {
                                return $workflow->approvables()->create([
                                    'user_id'         => $user,
                                    'approvable_type' => 'specific'
                                ]);
                            });
                        }
                    }
                    
                    
                }
            }


            /** 
             * ! Deprecated: Does not meet requirments.
                if ($request->exists('approval_workflows')) {
                foreach ($request->approval_workflows as $key => $approvable) {

                    if ($approvable['approval_type'] != 3) { // not specific user
                        User::role($approvable['role_id'])
                            ->get()
                            ->each(function ($user) use ($workflow, $approvable) {
                                return $workflow->approvables()->create([
                                    'user_id'       => $user->id,
                                    'role_id'       => $approvable['role_id']
                                ]);
                            });
                    } else { // store approvables against selected users
                        if (isset($approvable['approval_users'])) {
                            collect($approvable['approval_users'])->each(function ($user) use ($workflow, $approvable) {
                                return $workflow->approvables()->create([
                                    'user_id'       => $user,
                                    'role_id'       => $approvable['role_id'],
                                ]);
                            });
                        }
                    }
                }
            } */

            \DB::commit();
            return response()->json(['message' => "Workflow created successfully."], 200);
        } catch (\Exception $e) {
            \DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'code'    => $e->getCode(),
                'trace'   => $e->getTrace()
            ], 500);
        }
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


    public function getClassMethod(Request $request)
    {
        $class = new ReflectionClass($request->className);
        $controllerPath = $class->getConstant('controller');
        
        if($controllerPath) {
            $controllerClass = new ReflectionClass($controllerPath);
            $methods = $controllerClass->getMethods(ReflectionMethod::IS_PUBLIC);
    
            $methods = collect($methods)->filter(function($method) use ($controllerClass) {
                            return str_contains($method->class, $controllerClass->name) && $method->name != 'index' && $method->name != '__construct';
                        })->map(function($method) {
                           return $method->name; 
                        });
            
            return response()->json([
                'success' => true,
                'response' => $methods
            ]);
        } else {
            return response()->json([
                'success' => false,
                'response' => config('constants.workflow_methods')
            ]);
        }
        
    }
    
}


