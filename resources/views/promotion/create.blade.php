<x-saga.modal target="createPromotionModal" modalType="modal-lg">
	<x-slot name="title">Create new Promotion</x-slot>
	<form action="javascript:void(0)" id="createPromotion">
		@csrf
		<div class="form-row">
			<div class="col-12 mb-2">
				<label class="font-size-sm mb-1">Description:<span class="text-danger">*</span></label>
				<textarea type="text" class="form-control form-control-sm form-control-alt" name="description" placeholder="Enter Promotion Description" required></textarea>
			</div>
			<div class="col-4 mb-2">
				<label class="font-size-sm mb-1">Start Date:<span class="text-danger">*</span> </label>
				<input type="date" class="form-control form-control-sm form-control-alt" name="start_date" required value="{{ date('Y-m-d') }}">
			</div>
			<div class="col-4 mb-2">
				<label class="font-size-sm mb-1">End Date:<span class="text-danger">*</span> </label>
				<input type="date" class="form-control form-control-sm form-control-alt" name="end_date" required value="{{ date('Y-m-d') }}">
			</div>
			<div class="col-4 mb-2">
				<label class="font-size-sm mb-1">Image:<span class="text-danger">*</span></label>
				<input type="file" class="form-control form-control-sm form-control-alt" id="promotion_image" name="image" required>
			</div>
			<div class="col-12 mb-2">
				<label class="font-size-sm mb-1">Promotion Status:<span class="text-danger">*</span></label>
				<div class="custom-control custom-switch mb-1">
					<input type="checkbox" class="custom-control-input" id="status" value="1" name="status" checked>
					<label class="custom-control-label" for="status"></label>
				</div>
			</div>
		</div>
	</form>
	<x-slot name="footer">
		<button class="btn btn-sm btn-primary font-sm" form="createPromotion" type="submit">
			<i class="fas fa-plus mr-1"></i> Create Promotion
		</button>
	</x-slot>
</x-saga.modal>