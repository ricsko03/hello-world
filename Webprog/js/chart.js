const rows = document.querySelectorAll("#dataTable tr");
const ctx = document.getElementById("myChart").getContext("2d");

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
            label: 'Kiválasztott sor',
            data: [],
            fill: false,
            borderColor: 'blue',
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

rows.forEach(row => {
    row.addEventListener("click", () => {
        const values = Array.from(row.children).map(td => parseFloat(td.textContent));
        chart.data.datasets[0].data = values;
        chart.update();
    });
});
