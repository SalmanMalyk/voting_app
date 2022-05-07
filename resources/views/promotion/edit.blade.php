<x-saga.modal target="editPromotionModal" modalType="modal-lg">
	<x-slot name="title">Edit new Promotion</x-slot>
	<form action="javascript:void(0)" id="editPromotion">
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
				<div class="clearfix">
                    <label class="font-size-sm mb-1 float-left">Select Image:<span class="text-danger">*</span></label>
                    <a id="previousImage" class="float-right text-success font-sm" target="_blank">
                        <i class="fas fa-image fa-solid fa-fq mr-1"></i> View Image
                    </a>
                </div>
				<input type="file" class="form-control form-control-sm form-control-alt" id="edit_promotion_image">
			</div>
			<div class="col-12 mb-2">
				<label class="font-size-sm mb-1">Promotion Status:<span class="text-danger">*</span></label>
				<div class="custom-control custom-switch mb-1">
					<input type="checkbox" class="custom-control-input" id="editstatus" value="1" name="status" checked>
					<label class="custom-control-label" for="editstatus"></label>
				</div>
			</div>
		</div>
	</form>
	<x-slot name="footer">
		<button class="btn btn-sm btn-primary font-sm" form="editPromotion" type="submit">
			<i class="fas fa-plus mr-1"></i> Update Promotion
		</button>
	</x-slot>
</x-saga.modal>