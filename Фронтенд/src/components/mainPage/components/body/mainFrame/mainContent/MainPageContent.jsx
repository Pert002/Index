import React from 'react';
import '../../styles/MainPageContent.css';

const MainPageContent = () => {
    return (
        <div className='main-page-content'>
            <div className='main-page-content__text'>
                Индекс быстрорастущих компаний – индикатор состояния и ожиданий, доминирующих в данном сегменте экономики, рассчитанный по результатам опроса.
                Цель формирования Индекса БРК – оперативное выявление изменений в трендах развития российских быстрорастущих компаний на основе регулярно (ежеквартально) проводимых опросов.
                БРК определяются как компании, отвечающие следующим критериям:
                <ul className='main-page-content__list'>
                    <li className='main-page-content__list__item'>
                        основаны как минимум за 3 года до даты составления последнего годового отчета;
                    </li>
                    <li className='main-page-content__list__item'>
                        зарегистрированы как юридическое лицо;
                    </li>
                    <li className='main-page-content__list__item'>
                        в период за последние 3 года до даты составления последнего годового отчета в компании среднесписочная численность составляла более 10 человек;
                    </li>
                    <li className='main-page-content__list__item'>
                        среднегодовые темпы роста выручки за последние 3 года до даты составления последнего годового отчета превышали 20%.
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default MainPageContent;