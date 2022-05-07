<x-saga.modal target="createModal" modalType="lg">

    <x-slot name="title">Create Admin</x-slot>

    <form 
        action="javascript:void(0)" 
        method="POST" 
        id="createForm" 
        x-data
    >
        @csrf
        <div class="form-row">
            <div class="mb-2 col-md-12" x-id="['name']">
                <label :for="$id('name')" class="font-size-sm mb-1">Name:<span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm form-control-alt" :id="$id('name')" name="name"
                    placeholder="Enter Admin Name" required />
            </div>

            <div class="mb-2 col-md-12" x-id="['email']">
                <label :for="$id('email')" class="font-size-sm mb-1">Email:<span class="text-danger">*</span></label>
                <input type="email" class="form-control form-control-sm form-control-alt" :id="$id('email')" name="email"
                    placeholder="Enter Admin Email" required />
            </div>

            <div class="mb-2 col-md-6" x-id="['password']">
                <label :for="$id('password')" class="font-size-sm mb-1">Password:<span class="text-danger">*</span></label>
                <input type="password" class="form-control form-control-sm form-control-alt" :id="$id('password')"
                    name="password" placeholder="********" required />
            </div>

            <div class="mb-2 col-md-6" x-id="['password_confirmation']">
                <label :for="$id('password_confirmation')" class="font-size-sm mb-1">Confirm Password:<span
                        class="text-danger">*</span></label>
                <input class="form-control form-control-sm form-control-alt" :id="$id('password_confirmation')" type="password"
                    name="password_confirmation" placeholder="********" required />
            </div>

            <div class="mb-2 col-md-12">
                <div class="clearfix">
                    <label for="role_id" class="font-size-sm mb-1 float-left">Select Role:<span class="text-danger">*</span></label>
                    <a href="{{ route('dashboard.config.roles.index') }}" class="float-right font-sm" target="_blank">
                        <i class="fas fa-plus fa-fq mr-1 fa-sm"></i> Create Role
                    </a>
                </div>

                <x-saga.select2 name="role_id" route="api.getRoleName" />
            </div>
        </div>
    </form>


    <x-slot name="footer">
        <button type="submit" class="btn btn-primary btn-sm rounded-0" form="createForm"><i
                class="fas fa-plus mr-1"></i>
            Create Admin</button>
    </x-slot>

</x-saga.modal>
