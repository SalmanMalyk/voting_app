<x-saga.modal target="changePasswordModal" modalType="modal-md">
    <x-slot name="title">Update Password</x-slot>
    
    <form action="javascript:void(0)" id="passwordChangeForm">

        <div class="form-row">
            {{-- OLD PASSWORD --}}
            <div class="col-md-12 mb-2">
                <label for="password" class="font-sm mb-0">Old Password:<i class="text-danger">*</i></label>
                <input type="password" class="form-control form-control-sm" name="password" id="password" aria-describedby="password-helpblock" placeholder="********">
            </div>
            
            {{-- NEW PASSWORD --}}
            <div class="col-md-12 mb-2">
                <label for="new_password" class="font-sm mb-0">New Password:<i class="text-danger">*</i></label>
                <input type="password" class="form-control form-control-sm" name="new_password" id="new_password" aria-describedby="new_password-helpblock" placeholder="********">
                <small id="new_password-helpblock" class="form-text text-muted mt-0">New password must be 8 or longer.</small>
            </div>
            
            {{-- Confirm PASSWORD --}}
            <div class="col-md-12 mb-2">
                <label for="password_confirmation" class="font-sm mb-0">Confirm Password:<i class="text-danger">*</i></label>
                <input type="password" class="form-control form-control-sm" name="new_password_confirmation" id="password_confirmation" aria-describedby="password_confirmation-helpblock" placeholder="********">
                <small id="password_confirmation-helpblock" class="form-text text-muted mt-0">Enter same password again.</small>
            </div>
        </div>
        
    </form>
    
    <x-slot name="footer">
        <button type="submit" class="btn btn-primary btn-sm rounded-0" form="passwordChangeForm">
            <i class="fas fa-cloud-upload-alt mr-1"></i> Update Password
        </button>
    </x-slot>
</x-saga.modal>
    