<x-saga.modal target="createMilestoneModal" modalType="modal-md">
    <x-slot name="title">Create new Milestone</x-slot>
	<form action="javascript:void(0)" id="createMilestone">
		<div class="row mb-4">
			<div class="col-12">
				<label class="form-label">Title</label>
				<input type="text" class="form-control" name="title	">
			</div>
			<div class="col-6">
				<label class="form-label">Reward ($) </label>
				<input type="number" class="form-control" name="reward">
			</div>
			<div class="col-6">
				<label class="form-label">Days</label>
				<input type="number" class="form-control" name="days">
			</div>
			<div class="col-6">
				<label class="form-label">Total Votes</label>
				<input type="number" class="form-control" name="vote_count">
			</div>
			<div class="col-6">
				<label class="form-label">Status</label>
				<div class="custom-control custom-switch mb-1">
		            <input type="checkbox" class="custom-control-input" id="status" name="status" checked>
		            <label class="custom-control-label" for="status"></label>
	        	</div>
			</div>
	</form>
    <x-slot name="footer">
	    <button class="btn btn-sm btn-primary font-sm" type="submit">
	         <i class="fas fa-plus mr-1"></i> Create Milestone
	    </button>
	</x-slot>
</x-saga.modal>
