import React, {useLayoutEffect, useState} from 'react';
import './styles/Header.css'
import Logo from "./Logo";
import LoginButton from './LoginButton'
import HeaderMenuElement from "./HeaderMenuElement";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const storeIsAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    const role = useSelector((state) => state.user.role);

    useLayoutEffect(() => {
        setAuthenticated(storeIsAuthenticated);
    }, [storeIsAuthenticated]);
    const handleLogin = () => {
        navigate("/authentication");
    };
    const handleProfile = () => {

    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header>
            <div className="b-header">
                <div className="b-topline wrapper">
                    <Logo classname={"b-logo"} onClick={handleLogoClick}/>
                    <div className="b-menu">
                        <ul className="header-menu">
                            <HeaderMenuElement title={"О проекте"} classname={"menu"} link="/about_project" onClick={onclick}/>
                            <HeaderMenuElement title={"Новости"} classname={"menu"} link="/news" onClick={onclick}/>
                            <HeaderMenuElement title={"Индекс"} classname={"menu"} link="/index" onClick={onclick}/>
                            <HeaderMenuElement title={"Форум"} classname={"menu"} link="/forum" onClick={onclick}/>
                            {(role === 'admin') && <HeaderMenuElement title={"Админ"} classname={"menu"} link="/admin" onClick={onclick}/>}
                        </ul>
                    </div>

                    < LoginButton isAuthenticated={isAuthenticated} onClick={isAuthenticated ? handleProfile: handleLogin}/>
                </div>
            </div>
        </header>
    );
};

export default Header;