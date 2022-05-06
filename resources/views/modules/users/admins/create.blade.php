<x-saga.modal target="createModal" modalType="lg">

    <x-slot name="title">Create User</x-slot>

    <form action="javascript:void(0)" method="POST" id="createForm">
        @csrf
        <div class="form-row">
            <div class="mb-2 col-md-12">
                <label for="name" class="font-size-sm mb-1">Name:<span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm form-control-alt" id="name" name="name"
                    placeholder="Enter Admin Name" required />
            </div>

            <div class="mb-2 col-md-12">
                <label for="email" class="font-size-sm mb-1">Email:<span class="text-danger">*</span></label>
                <input type="email" class="form-control form-control-sm form-control-alt" id="email" name="email"
                    placeholder="Enter Admin Email" required />
            </div>

            <div class="mb-2 col-md-6">
                <label for="password" class="font-size-sm mb-1">Password:<span class="text-danger">*</span></label>
                <input type="password" class="form-control form-control-sm form-control-alt" id="password"
                    name="password" placeholder="********" required />
            </div>

            <div class="mb-2 col-md-6">
                <label for="password_confirmation" class="font-size-sm mb-1">Confirm Password:<span
                        class="text-danger">*</span></label>
                <input type="password_confirmation" class="form-control form-control-sm form-control-alt"
                    id="password_confirmation" name="email" placeholder="********" required />
            </div>
            
            <div class="mb-2 col-md-12">
                <label for="role_id" class="font-size-sm mb-1">Select Role:<span class="text-danger">*</span></label>
                {!! Form::select('role_id', $roles, null, [
                    'class' => 'form-control form-control-sm form-control-alt',
                    'placeholder' => 'Select Admin Role',
                    'id' => 'role_id',
                    'required' => true
                ]) !!}
            </div>
        </div>
    </form>


    <x-slot name="footer">
        <button type="submit" class="btn btn-primary btn-sm rounded-0" form="roleForm"><i class="fas fa-plus mr-1"></i>
            Create Admin</button>
    </x-slot>

</x-saga.modal>
