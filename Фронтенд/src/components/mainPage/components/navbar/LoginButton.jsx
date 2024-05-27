import React from 'react';
import ProfileBurgerMenu from "./ProfileBurgerMenu";

const LoginButton = ({ isAuthenticated, onClick }) => {
    return (
        <div className="b-topline__login" onClick={onClick}>
            {isAuthenticated ? (
                    <ProfileBurgerMenu />
            ) : (
                    <button className="login-button">Войти</button>
            )}
        </div>
    );
};

export default LoginButton;