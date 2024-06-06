import React, {useLayoutEffect, useState} from 'react';
import './styles/Header.css'
import Logo from "./Logo";
import LoginButton from './LoginButton'
import HeaderMenuElement from "./HeaderMenuElement";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {store} from "../../../../store";
import {setColor} from "../../../../store/slices/chartsColorSlice";

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
    const chartsColor = useSelector((state) => state.chartsColor.color);
    const [isOpen, setIsOpen] = useState(false);

    const colors = [
        'rgb(191, 191, 191)',
        'rgb(245, 195, 195)',
        'rgb(35, 75, 155)',
        'rgb(230, 30, 60)'
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleColorChange = (color) => {
        store.dispatch(setColor({
            color: color
        }))
        setIsOpen(false);
    };
    return (
        <header>
            <div className="b-header">
                <div className="b-topline wrapper">
                    <Logo classname={"b-logo"} onClick={handleLogoClick}/>
                    <div className="b-menu">
                        <ul className="header-menu">
                            <HeaderMenuElement title={"О проекте"} classname={"menu"} link="/about_project"
                                               onClick={onclick}/>
                            <HeaderMenuElement title={"Новости"} classname={"menu"} link="/news" onClick={onclick}/>
                            <HeaderMenuElement title={"Индекс"} classname={"menu"} link="/index" onClick={onclick}/>
                            <HeaderMenuElement title={"Форум"} classname={"menu"} link="/forum" onClick={onclick}/>
                            {(role === 'admin') &&
                                <HeaderMenuElement title={"Админ"} classname={"menu"} link="/admin" onClick={onclick}/>}
                        </ul>
                    </div>

                    < LoginButton isAuthenticated={isAuthenticated} onClick={isAuthenticated ? handleProfile : handleLogin}/>
                    <div className="color-dropdown">
                        <button onClick={toggleDropdown} style={{backgroundColor: chartsColor}}>Выбрать цвет графиков</button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        className='color-button'
                                        style={{backgroundColor: color}}
                                        onClick={() => handleColorChange(color)}
                                    ></button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;