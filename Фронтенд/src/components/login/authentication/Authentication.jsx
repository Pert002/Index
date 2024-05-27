import React from 'react';
import "../styles/Authentication.css";
import "../styles/LoginMenu.css";
import LoginMenu from "../LoginMenu";
import AuthenticationContent from "./AuthenticationContent";

const Authentication = () => {
    return (
        <div className="authentication">
            <LoginMenu />
            <AuthenticationContent />
        </div>
    );
};

export default Authentication;