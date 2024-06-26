export function calculateClickedIndex(responseData, label, labels, color) {
    let data = [];
    for (let i = 0; i < responseData.length; i++) {
        data[i] = Math.round(responseData[i] * 10) / 10
    }
    const shortLabels = labels.map(label => {
        const words = label.split(' ');
        return words.slice(0, 2).join(' ');
    });
    console.log(shortLabels)
    return {
        labels,
        // shortLabels,
        datasets: [{
            label,
            data,
            backgroundColor: [
                color
            ],
            hoverOffset: 5
        }]
    }
}