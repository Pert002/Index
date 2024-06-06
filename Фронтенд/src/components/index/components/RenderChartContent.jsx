import React, { useLayoutEffect, useState} from 'react';
import { Chart as PrimeChart } from "primereact/chart";

const RenderChartContent = ({ chartType, chartData, index, selectedChart, onClick }) => {

    const [chartOptions, setChartOptions] = useState({});

    useLayoutEffect(() => {
        const handleDrawLine = (Index) => {
            const options = {
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            font: {
                                size: 17,
                            },
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 17,
                            },
                            autoSkip: false,
                        }
                    }
                },
                plugins: {
                    annotation: {
                        annotations: {
                            annotationIndex: {
                                type: 'line',
                                borderColor: 'black',
                                borderWidth: 3,
                                label: {
                                    backgroundColor: 'gray',
                                    content: index,
                                    display: true
                                },
                                scaleID: 'y',
                                value: Index
                            }
                        }
                    }
                },
            }
            if (selectedChart) {
                options.onClick = (event, elements) => {
                    if (elements && elements.length > 0) {
                        const clickedIndex = elements[0].index;
                        onClick(clickedIndex + 1);
                    }
                };
            }
            setChartOptions(options);
        }

        handleDrawLine(index);
    }, [index, selectedChart, onClick]);

    return (
        <>
            <PrimeChart
                type={chartType}
                data={chartData}
                options={chartOptions}
                className="w-full md:w-30rem index__chart"
            />
        </>
    );
};

export default RenderChartContent;
