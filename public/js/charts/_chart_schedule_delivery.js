var ctx = document.getElementById('scheduleChart').getContext('2d');

var scheduleDeliveryChart = new Chart(ctx, {
    type: 'bar',
    display: false,
    data: {
        labels: [],
        datasets: [
            {
                type: 'bar',
                label: 'Schedule',
                data: [],
                backgroundColor: '#4C70BA'
            }
            // {
            //     type: 'line',
            //     label: 'Capacity',
            //     data: [],
            //     fill: false,
            //     borderColor: '#ff6363'
            // }
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        layout: {
            padding: 10
        }
    },
});