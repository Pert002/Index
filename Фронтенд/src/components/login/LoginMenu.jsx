import React from 'react';
import Logo from "../mainPage/components/navbar/Logo";
import {useNavigate} from "react-router-dom";
import LoginMenuButton from "./LoginMenuButton";

const LoginMenu = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        // Перенаправление на маршрут "/"
        navigate('/');
    };

    const handleAuthenticationClick = () => {
        navigate('/authentication');
    }

    const handleRegistrationClick = () => {
        navigate('/registration');
    }

    const handlePasswordResetClick = () => {
        navigate('/passres');
    }

    return (
        <div className="login__menu">
            <Logo onClick={handleLogoClick} classname={"b-logo login-logo"}/>
            <div className="login__menu-text">личный кабинет</div>
            <LoginMenuButton classname={"login-menu-button login-menu__authorization"} onClick={handleAuthenticationClick} content={"Авторизация"}/>
            <LoginMenuButton classname={"login-menu-button login-menu__registration"} onClick={handleRegistrationClick} content={"Регистрация"}/>
            <LoginMenuButton classname={"login-menu-button login-menu__registration"} onClick={handlePasswordResetClick} content={'Сброс пароля'} />
        </div>
    );
};

export default LoginMenu;