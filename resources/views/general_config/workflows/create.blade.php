<x-saga.modal target="siteModal">

    <x-slot name="title">Create Approval Workflow</x-slot>

    <form action="{{ moduleRoute('index', 'store') }}" method="POST" id="workflowForm">
        @csrf
        <fieldset class="border p-3 mt-2">
            <legend class="w-auto px-2 font-w600 text-primary" style="font-size: 17px;">Workflow Details</legend>
            <div class="form-row">
                <div class="col-md-12 form-group">
                    <label for="workflow_name">Name:<span class="text-danger">*</span></label>
                    <input type="text" id="workflow_name" name="workflow_name" class="form-control"
                        placeholder="Enter approval workflow name" required>
                </div>

                {{-- Model Names --}}
                <div class="col-md-6 form-group">
                    <label for="workflowable_model">Select Module:<span class="text-danger">*</span></label>
                    <select 
                        class="select2 form-control" 
                        id="workflowable_model" 
                        name="workflowable_model"
                        style="width: 100%;" 
                        data-placeholder="Select Module Model" 
                        onchange="getClassMethods()"
                        required
                    />
                        <option value="" disabled selected>Choose an option</option>
                        @foreach (getModelNames() as $model)
                            @if (!Illuminate\Support\Str::contains($model, 'General'))
                                <option value="{{ $model }}">{{ getModelNameOnly($model) }}</option>
                            @endif
                        @endforeach
                    </select>
                </div>

                {{-- method name --}}
                <div class="col-md-6 form-group">
                    <label for="method">Select Method:<span class="text-danger">*</span></label>
                    {!! Form::select('method', [], null, [
						'data-placeholder' => ' Select Method',
						'class' => 'form-control select2',
						'style' => 'width: 100%;',
						'id' => 'method',
						'required' => true,
					]) !!}
                </div>

                {{-- description --}}
                <div class="col-md-12 form-group">
                    <label for="description">Description:<small>(optional)</small></label>
                    <textarea class="form-control" name="description" id="description" rows="5"
                        placeholder="Enter workflow description"></textarea>
                </div>
            </div>
        </fieldset>

        <fieldset class="border p-3 mt-3">
            <legend class="w-auto px-2 font-w600 text-primary" style="font-size: 17px;">User Group Details</legend>
            <div class="form-row">
                <div class="col-md-12 form-group">
                    <label for="user_group_ids">Select User Group(s):<span class="text-danger">*</span></label>
                    <select 
                        class="form-control select2" 
                        data-placeholder="Select user group for approval"
                        id="user_group_ids" 
                        name="user_role_ids[]" 
                        style="width: 100% !important"
                        multiple 
                        required
                    >
                    </select>
                </div>

                <div class="col-md-12 form-row selectedUsers" hidden="true">
                </div>

            </div>
        </fieldset>
    </form>


    <x-slot name="footer">
        <button type="submit" class="btn btn-primary btn-sm rounded-0 submitBtn" form="workflowForm"><i
                class="fas fa-plus mr-1"></i> Create Workflow</button>
    </x-slot>

</x-saga.modal>
