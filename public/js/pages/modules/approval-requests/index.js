var path = 'dashboard.requests';

$(() => {
    'use strict';

    $(".siteDataTable").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        scrollCollapse: true,
        select: true,
        ajax: route(`${path}.index`),
        // order: [
        //     [10, 'asc'],
        //     [1, 'asc'],
        //     [3, 'asc'],
        // ],
        colReorder: true,
        fixedHeader: {
            header: true,
            headerOffset: $('.content-header').height() - 8
        },
        buttons: [
            { extend: "pageLength", className: "btn btn-sm btn-primary" },
            { extend: "copy", className: "btn btn-sm btn-primary" },
            { extend: "csv", className: "btn btn-sm btn-primary" },
            { extend: "pdf", className: "btn btn-sm btn-primary" },
            { extend: "print", className: "btn btn-sm btn-primary" },
            {
                text: 'Refresh',
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                },
                className: "btn btn-sm btn-primary"
            }
        ],
        lengthMenu: [
            [25, 50, 100, -1],
            ['25 rows', '50 rows', '100 rows', 'Show all']
        ],
        dom: `<'row'
					<'col-sm-12 col-md-6' <'text-left'B>>
					<'col-sm-12 col-md-6'f>
				>
				<'row'
					<'col-sm-12'tr>
				>
				<'row'
					<'col-sm-12 col-md-5'i>
					<'col-sm-12 col-md-7'p>
				>`,
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                className: "text-center",
                orderable: false,
                searchable: false
            },
            {
                data: "workflow_request.workflow.number_sequence",
                name: "workflowRequest.workflow.number_sequence",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "workflow_request.user.name",
                name: "workflowRequest.user.name",
                className: "text-left",
                defaultContent: "—"
            },
            {
                data: "created_at",
                name: "created_at",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'timestamp'
                },
                defaultContent: "—"
            },
            {
                data: "status",
                name: "status",
                className: "text-center",
                render: {
                    _: 'display',
                    sort: 'sort'
                },
                defaultContent: "—"
            },
            // {
            //     data: "action",
            //     name: "action",
            //     className: "text-center",
            //     orderable: false,
            //     searchable: false
            // },
        ],
        language: {
            "processing": 
            `<div class="v-middle">
                <i class='fas fa-circle-notch fa-spin fa-3x text-muted mb-2'></i> 
                <br> 
                Processing
            </div>`,
        }
    });


    $('.siteDataTable tbody').on('dblclick', 'tr', function () {
        var data = $('.siteDataTable').DataTable().row(this).data();

        window.location = route(`${path}.show`, data.id);
    });
});


const action = (workflow, status) => {
    event.preventDefault();

    console.log({ workflow, status })
}


// const viewWorkflowDetails = (data) => {
//     event.preventDefault();

//     let popup = $('#siteModal');

//     // popup.find('.modal-body').html(html)
//     popup.modal('show')
//     console.log(data)
// }