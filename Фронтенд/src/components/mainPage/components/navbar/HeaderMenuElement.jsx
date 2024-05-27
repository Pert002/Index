import React from 'react';
import {useNavigate} from "react-router-dom";

const HeaderMenuElement = ({title, classname, link}) => {
    const navigate = useNavigate();
    const onclick = () => {
        navigate(link);
    }
    return (
        <button className={classname} onClick={onclick}>
            {title}
        </button>
    );
};

export default HeaderMenuElement;