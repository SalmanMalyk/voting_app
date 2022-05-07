@forelse($promotions as $key => $promotion)
<tr>
	<td align="center">{{ ++$key }}</td>
	<td>{{ $promotion->description ?? '—' }}</td>
	<td align="right">{{ Carbon\Carbon::parse($promotion->start_date)->format('d, M-Y') ?? '-' }}</td>
	<td align="right">{{ Carbon\Carbon::parse($promotion->end_date)->format('d, M-Y') ?? '-' }}</td>
	<td align="center">
		<a href="{{ asset('uploads/'.$promotion->image) }}" target="_blank">
			<img src="{{ asset('uploads/'.$promotion->image) }}" style="object-fit: cover; width: 80px; height: 80px;" class="img-fluid">
		</a>
	</td>
	<td align="center">
		@if($promotion->status == 1)
		<span class="badge badge-success badge-pill">
			<i class="fas fa-check-circle fa-fw"></i> Active
		</span>
		@else
		<span class="badge badge-danger badge-pill">
			<i class="fas fa-times-circle fa-fw"></i> In Active
		</span>
		@endif
	</td>
	<td align="center">
		<div class="btn-group-sm">
			@can('edit_promotion')
			<button type="button" class="btn btn-primary" onclick="editPromotion({{ $promotion->id }})"><i class="fa fa-pencil-alt" aria-hidden="true"></i></button>
			@endcan
			@can('delete_promotion')
			<button type="button" class="btn btn-primary" onclick="deletePromotion({{ $promotion->id }})"><i class="fa fa-times" aria-hidden="true"></i></button>
			@endcan
		</div>
	</td>
</tr>
@empty
<tr>
	<td colspan="7"><x-saga.not-found width="500"/></td>
</tr>
@endforelse