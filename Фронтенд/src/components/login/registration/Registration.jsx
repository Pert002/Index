import React from 'react';
import "../styles/LoginMenu.css";
import "../styles/Registration.css";
import LoginMenu from "../LoginMenu";
import RegistrationContent from "./RegistrationContent";

const Registration = () => {
    return (
        <div className="registration">
            <LoginMenu />
            <RegistrationContent />
        </div>
    );
};

export default Registration;