$(function () {
    var table = $('.data-table').DataTable({
        responsive: true,
		processing: true,
		serverSide: true,
		order: [ [3, 'desc'] ],
		select: true,
		buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" }, 
            { extend: "copy", className: "btn btn-sm btn-primary" }, 
            { extend: "csv", className: "btn btn-sm btn-primary" }, 
            { extend: "pdf", className: "btn btn-sm btn-primary" }, 
            { extend: "print", className: "btn btn-sm btn-primary" },
			{
				text: 'Refresh',
				action: function ( e, dt, node, config ) {
					dt.ajax.reload();
				},
				className: "btn btn-sm btn-primary"
			}
        ],
		lengthMenu: [
            [ 25, 50, 100, -1 ],
            [ '25 rows', '50 rows', '100 rows', 'Show all' ]
        ],
		bLengthChange: false,
        dom: 	`<'row'
					<'col-sm-12 col-md-6' <'text-left bg-body-light'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
        ajax: {
            url: route('dashboard.administrator.authentication-logs.index'),
            data: function (d) {
                d.users = $('#user_ids').val();
            }
        },
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                className: "text-center",
                orderable: false, 
                searchable: false
            },
            {
                data: 'user.name', 
                name: 'user.name',
                defaultContent: "—"
            },
            {
                data: 'ip_address', 
                name: 'ip_address',
                defaultContent: "—"
            },
            {
                data: "login_at",
                name: "login_at",
                className: "text-right",
                render: {
                    _: 'display',
                    sort: 'timestamp'
                },
                defaultContent: "—"
            },
            {
                data: "logout_at",
                name: "logout_at",
                className: "text-right",
                render: {
                    _: 'display',
                    sort: 'timestamp'
                },
                defaultContent: "—"
            },
            {
                data: 'session', 
                name: 'session',
                defaultContent: "—"
            },
        ]
    });

    $(document).on('change', '#user_ids', () => {
        $('.data-table').DataTable().ajax.reload(null, false);
    })
    
});