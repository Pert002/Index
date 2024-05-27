import React from 'react';
import "../styles/LoginMenu.css";
import LoginMenu from "../LoginMenu";
import PasswordResetContent from "./PasswordResetContent";

const Authentication = () => {
    return (
        <div className="authentication">
            <LoginMenu />
            <PasswordResetContent />
        </div>
    );
};

export default Authentication;