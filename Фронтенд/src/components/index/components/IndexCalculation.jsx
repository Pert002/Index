import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import Header from "../../mainPage/components/navbar/Header";
import Footer from "../../mainPage/components/footer/Footer";
import IndexButton from "./IndexButton";
import '../styles/Index.css'
import {calculateIndexCalculationChartData} from "../../../helpers";
import { Years, Quarters, selectionButtonsData, Regions, Branches, Revenue } from "../../../constants/date";
import { getApiInstance } from "../../../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RenderChartContent from "./RenderChartContent";
import {calculateClickedIndex} from "../../../helpers/chart/index-calculation-selected-bar";

Chart.register(annotationPlugin);

export const DEFAULT_VALUE = {
    labels: [],
    datasets: [{
        label: 'Индекс',
        data: [],
        backgroundColor: [],
        hoverOffset: 4
    }]
}

const IndexCalculation = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedChart, setSelectedChart] = useState(null);
    const [selectedChartButton, setSelectedChartButton] = useState(null);

    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jointIndex, setJointIndex] = useState(null);
    const [leftIndex, setLeftIndex] = useState(null);
    const [rightIndex, setRightIndex] = useState(null);
    const [barIndex, setBarIndex] = useState(null);

    const [jointData, setJointData] = useState(DEFAULT_VALUE);

    const [separateLeftData, setSeparateLeftData] = useState(DEFAULT_VALUE);

    const [separateRightData, setSeparateRightData] = useState(DEFAULT_VALUE);

    const [barData, setBarData] = useState(DEFAULT_VALUE);

    const api = getApiInstance();

    const contentRef = useRef(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const downloadAsPDF = () => {
        const content = contentRef.current;

        html2canvas(content)
            .then(canvas => {
                const imageData = canvas.toDataURL('image/png');

                const img = new Image();
                img.src = imageData;

                const doc = new jsPDF({
                    format: [content.offsetWidth, content.offsetHeight],
                    orientation: 'portrait',
                });

                doc.addImage(img, 'PNG', 10, 10, content.offsetWidth, content.offsetHeight); // Параметры: base64ImageData, format, x, y, width, height

                doc.save('content.pdf');
            });
    }


    const handleGetIndex = useCallback(async () => {
        setIsLoading(true);

        try {

            const response = (await api.jointIndex(selectedYear, selectedQuarter)).data
            if (response.index === null) {
                setHasData(false);
                setIsLoading(false);
                return
            } else {
                const chartData = calculateIndexCalculationChartData(response, 'Общий индекс')
                setJointData(chartData);
                setJointIndex( Math.round( response.index * 10) / 10 );
                setHasData(true);
            }

            const separateResponse = await api.separateIndex(selectedYear, selectedQuarter)

            const {
                left: leftData,
                right: rightData
            } = separateResponse.data

            const leftChartData = calculateIndexCalculationChartData(leftData, 'Индекс по итогам квартала')
            const rightChartData = calculateIndexCalculationChartData(rightData, 'Прогнозируемый индекс')

            setLeftIndex( Math.round( leftData.index * 10) / 10 );
            setRightIndex( Math.round( rightData.index * 10) / 10 );
            setSeparateLeftData(leftChartData);
            setSeparateRightData(rightChartData);
            setIsLoading(false);
        } catch (e) {
            console.log(e.message)
            setHasData(false)
            setIsLoading(false)
        }
    }, [selectedYear, selectedQuarter, api]);


    useLayoutEffect(() => {
        if (selectedYear !== null && selectedQuarter !== null) {
            handleGetIndex();
        }
    }, [selectedYear, selectedQuarter, handleGetIndex]);

    const handleGetSelectedChart = async (selectedChartButton, chartArray) => {
        const chart = `${selectedChart}Index`;
        if (selectedChart === 'branch') {
            const index = selectedChartButton - 1;
            selectedChartButton = Branches[index];
        }
        try {
            const response = (await api[chart](selectedYear, selectedQuarter, selectedChartButton)).data;
            const chartData = calculateIndexCalculationChartData(response, `${chartArray[selectedChartButton - 1]}`);

            setBarIndex( Math.round( response.index * 10) / 10 );
            setBarData(chartData);
        } catch (e) {
            console.log(e.message)
        }
    };

    const handleChartClick = (index) => {
        setClickedIndex(index);
        setBarIndex(null);
        if (index) {
            handleDrawChartClick(index);
        }
    };
    const handleDrawChartClick = async (clickedIndex) => {
        const chart = `${selectedChart}Index`;
        let chartArray;
        if (selectedChart === 'region') {
            chartArray = Regions;
        } else if (selectedChart === 'branch') {
            chartArray = Branches;
        } else if (selectedChart === 'revenue') {
            chartArray = [
                'Крупные предприятия',
                'Средние предприятия',
                'Малые предприятия',
                'Микропредприятия'
            ];
        }
        let responseData = [];
        let label = '';
        let sumIndex = 0;
        for (let i = 0; i < chartArray.length; i++) {
            try {
                let response = {};
                if (selectedChart === 'branch') {
                    response = (await api[chart](selectedYear, selectedQuarter, Branches[i]));
                } else {
                    response = (await api[chart](selectedYear, selectedQuarter, i + 1));
                }
                const data = response.data;

                let selectedData;
                switch (clickedIndex) {
                    case 1:
                        selectedData = data.revenue;
                        label = 'Выручка';
                        break;
                    case 2:
                        selectedData = data.size;
                        label = 'Численность';
                        break;
                    case 3:
                        selectedData = data.finance;
                        label = 'Капиталовложения';
                        break;
                    case 4:
                        selectedData = data.investment;
                        label = 'Привлеченные инвестиции';
                        break;
                    case 5:
                        selectedData = data.innovation;
                        label = 'Технологические инновации';
                        break;
                    default:
                        break;
                }

                responseData[i] = selectedData;
                sumIndex += responseData[i];
            } catch (error) {
                console.error(`Error fetching data for ${chartArray[i]}:`, error);
            }
        }
        const chartData = calculateClickedIndex(responseData, label, chartArray);
        setBarIndex( Math.round( sumIndex * 10 / responseData.length) / 10 );
        setBarData(chartData);
    }
    function renderMenu() {
        return (
            <div>
                <div className="index__button__year">
                    {Years.map((year, index) => (
                        <IndexButton
                            key={index}
                            buttonText={year}
                            onClick={() => setSelectedYear(year)}
                            isSelected={selectedYear === year}
                        />
                    ))}
                </div>
                {selectedYear && (
                    <div className="index__button__quarter">
                        {Quarters.map((quarter, index) => (
                            <IndexButton
                                key={index}
                                buttonText={quarter}
                                onClick={() => setSelectedQuarter(quarter)}
                                isSelected={selectedQuarter === quarter}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    function renderContent() {
        if (hasData) {
            return (
                <div className='index__chart__content'>
                    <div className="index__chart__title">Общий индекс</div>
                    <div className="index__chart__jointIndex">
                        <RenderChartContent
                            chartType = {'bar'}
                            chartData = {jointData}
                            index ={jointIndex}
                        />
                    </div>

                        <div className="index__chart__title">Индекс по
                            итогам {selectedQuarter} квартала {selectedYear} г. и перспективам роста
                            в {(selectedQuarter + 1) % 4} квартале {selectedYear + 1} г.
                        </div>
                        <div className="separateIndex__charts">
                            <div className="index__chart__separateIndex-left separateIndex">
                                <RenderChartContent
                                    chartType = {'bar'}
                                    chartData ={separateLeftData}
                                    index ={leftIndex}
                                />
                            </div>
                            <div className="index__chart__separateIndex-right separateIndex">
                                <RenderChartContent
                                    chartType = {'bar'}
                                    chartData ={separateRightData}
                                    index ={rightIndex}
                                />
                            </div>
                        </div>
                    <div className="">
                        <div className="chart__selection__buttons">
                            {selectionButtonsData.map((data, index) => (
                                <IndexButton
                                    key={index}
                                    buttonText={data.russian}
                                    onClick={() => {
                                        setSelectedChart(data.english);
                                        setSelectedButton(data.russian);
                                    }}
                                    isSelected={selectedButton === data.russian}
                                />
                            ))}
                        </div>
                        {selectedChart !== null && (
                            <div className={`index__chart__${selectedChart}`}>
                                {renderSelectedChart()}
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        if (selectedYear && selectedQuarter) {
            return (
                <>Индекса в выбранном году в выбранном квартале не существует</>
            )
        }

        return (<div className='index__content__not-selected'>
                    <h1 style={{ fontSize: '27px', paddingBottom: '20px' }}>Добро пожаловать на страницу для мониторинга Индекса БРК !</h1>
                    <h2 style={{ fontSize: '25px' }}>Пожалуйста, выберите год и квартал, за который вы хотите получить данные.</h2>
                </div>)
    }

    function renderSelectedChart() {
        let chartArray;
        if (selectedChart === 'region') {
            chartArray = Regions;
        } else if (selectedChart === 'branch') {
            chartArray = Branches;
        } else if (selectedChart === 'revenue') {
            chartArray = Revenue;
        }
        return (
            <div className={'selected-chart__content'}>
                <div className={'selected-chart__selection__buttons'}>
                    {chartArray.map((item, index) => (
                        <IndexButton
                            key={index}
                            buttonText={item}
                            onClick={() => {
                                setSelectedChartButton(item);
                                setClickedIndex(null);
                                handleGetSelectedChart(index + 1, chartArray);
                            }}
                            isSelected={(selectedChartButton === item) && !clickedIndex}
                        />
                    ))}
                </div>
                <div className="index__chart__barIndex">
                    { barIndex && !clickedIndex &&
                        <RenderChartContent
                            chartType = {'bar'}
                            chartData = {barData}
                            index = {barIndex}
                            selectedChart = {true}
                            onClick={handleChartClick}
                        />
                    }

                    {clickedIndex &&
                        <RenderChartContent
                            chartType = {'bar'}
                            chartData = {barData}
                            index = {barIndex}
                        />
                    }
                </div>
            </div>
        )
    }


    return (
        <div className='index'>
            <Header/>
            <div className="container">
                <div className="index__content" ref={contentRef}>
                    {renderMenu()}
                    {isLoading ? null : renderContent()}
                    {selectedChartButton && (<button onClick={downloadAsPDF} className='chart__download__button'></button>)}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default IndexCalculation;