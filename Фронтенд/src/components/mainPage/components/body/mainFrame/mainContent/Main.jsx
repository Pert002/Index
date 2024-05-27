import React from 'react';
import '../../styles/Main.css';
import MainPageContent from "./MainPageContent";
import MainPageNews from "./MainPageNews";

const Main = () => {
    return (
        <div className= "b-main">
            <div className="container">
                <div className="b-main__content">
                    <div className="info">
                        <MainPageContent/>
                    </div>
                    <MainPageNews/>
                </div>
            </div>
        </div>
    );
};

export default Main;

