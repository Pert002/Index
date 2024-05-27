import React from 'react';

const LoginMenuButton = ({classname, content, onClick}) => {
    return (
        <div className={classname} onClick={onClick}>
            {content}
        </div>
    );
};

export default LoginMenuButton;