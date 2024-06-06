export function calculateIndexCalculationChartData(responseData, label, color) {
    return {
        labels: [
            'Выручка',
            'Численность',
            'Капиталовложения',
            'Привлеченные инвестиции',
            'Технологические инновации'
        ],
        datasets: [{
            label,
            data: [
                Math.round(responseData.revenue * 10) / 10,
                Math.round(responseData.size * 10) / 10,
                Math.round(responseData.finance * 10) / 10,
                Math.round(responseData.investment * 10) / 10,
                Math.round(responseData.innovation * 10) / 10,
            ],
            backgroundColor: [
                color
            ],
            hoverOffset: 5
        }]
    }
}