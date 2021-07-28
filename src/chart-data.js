export const ChartData = {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {   
                label: `# de alunos matriculados`,
                data: [],
                backgroundColor: "rgba(233,58,58,0.5)",
                borderColor: "#36495d",
                borderWidth: 3
            },
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        padding: 25
                    }
                }
            ]
        }
    },
};
export default ChartData;