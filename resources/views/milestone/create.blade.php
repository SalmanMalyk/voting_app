<x-saga.modal target="createMilestoneModal" modalType="modal-lg">
<x-slot name="title">Create new Milestone</x-slot>
<form action="javascript:void(0)" id="createMilestone">
	@csrf
	<div class="form-row">
		<div class="col-12 mb-2">
			<label class="font-size-sm mb-1">Title:<span class="text-danger">*</span></label>
			<input type="text" class="form-control form-control-sm form-control-alt" name="title" placeholder="Enter Milestone title" required>
		</div>
		<div class="col-4 mb-2">
			<label class="font-size-sm mb-1">Reward ($):<span class="text-danger">*</span> </label>
			<input type="number" class="form-control form-control-sm form-control-alt" name="reward" placeholder="Enter Milestone reward" required>
		</div>
		<div class="col-4 mb-2">
			<label class="font-size-sm mb-1">Days:<span class="text-danger">*</span></label>
			<input type="number" class="form-control form-control-sm form-control-alt" name="days" placeholder="Enter Milestone expiry days" required>
		</div>
		<div class="col-4 mb-2">
			<label class="font-size-sm mb-1">Total Votes:<span class="text-danger">*</span></label>
			<input type="number" class="form-control form-control-sm form-control-alt" name="vote_count" placeholder="Enter Milestone winning votes" required>
		</div>
		<div class="col-12 mb-2">
			<label class="font-size-sm mb-1">Milestone Status:<span class="text-danger">*</span></label>
			<div class="custom-control custom-switch mb-1">
				<input type="checkbox" class="custom-control-input" id="status" value="1" name="status" checked>
				<label class="custom-control-label" for="status"></label>
			</div>
		</div>
	</div>
</form>
<x-slot name="footer">
<button class="btn btn-sm btn-primary font-sm" form="createMilestone" type="submit">
<i class="fas fa-plus mr-1"></i> Create Milestone
</button>
</x-slot>
</x-saga.modal>