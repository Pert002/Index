import React from 'react';
// import {useEffect, useState} from 'react';
// import {Link} from "react-router-dom";
// import axios from "axios";
// // import {format} from "date-fns";
import '../../styles/MainPageNews.css'


const MainPageNews = () => {

    // const [latestNews, setLatestNews] = useState([]);
    //
    // useEffect(() => {
    //     async function fetchLatestNews(limit) {
    //         try {
    //             const response = await axios.get('http://localhost:4444/posts');
    //             const allNews = response.data.reverse();
    //             // const allNews = response.data.reverse().map(item => ({
    //             //     ...item,
    //             //     date:format(item.date, 'dd.mm.yyyy')
    //             // }));
    //
    //             const latestNews = allNews.slice(0, limit);
    //
    //             return latestNews;
    //         } catch (error) {
    //             console.error('Ошибка при получении новостей:', error);
    //             return [];
    //         }
    //     }
    //
    //     fetchLatestNews(3)
    //         .then(news => {
    //             setLatestNews(news);
    //         })
    // }, [])

    return (
        <div className='aside-content'>
            <h2 className='main-page-news-title' >News List</h2>
            <ul>
                <li className='main-page-news__item'>
                    <a href="https://pro.rbc.ru/demo/6583e1da9a794711ee3bfd0b">
                        Самые быстрорастущие компании страны: рейтинг РБК
                    </a>
                </li>
                <li className='main-page-news__item'>
                    <a href="https://spark-interfax.ru/articles/ezhegodnyj-obzor-rossijskih-bystrorastushchih-kompanij-2023">
                        «Газели» трансформации: результаты очередного ежегодного обзора российских быстрорастущих компаний
                    </a>
                </li>
                <li className='main-page-news__item'>
                    <a href="https://www.interfax.ru/business/962352">
                        Число быстрорастущих компаний в РФ увеличилось в 1,7 раза по итогам 2019-2023 гг
                    </a>
                </li>
                {/*{latestNews.map ((newsItem, index) => (*/}
                {/*    <li key={index} className='main-page-news-item'>*/}
                {/*        <Link to={`/news/2024/${newsItem._id}`}>*/}
                {/*            <h3 className='main-page-news-item__title'>{newsItem.shortContent ? newsItem.shortContent : newsItem.content}</h3>*/}
                {/*            <p className="main-page-news-item__date">{newsItem.date} </p>*/}
                {/*        </Link>*/}
                {/*    </li>*/}
                {/*))}*/}
            </ul>
        </div>
    );
};

export default MainPageNews;