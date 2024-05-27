import React from 'react';
import Header from "./components/navbar/Header";
import Main from "./components/body/mainFrame/mainContent/Main";
import Footer from "./components/footer/Footer";

const MainPage = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default MainPage;