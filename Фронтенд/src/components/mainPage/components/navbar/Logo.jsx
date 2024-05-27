import React from 'react';

const Logo = ({classname}) => {
    return (
        <a className={classname} href='/'>
            <span className='b-logo-letter'>In</span>
            <span className='b-logo-dex'>dex</span>
        </a>
    );
};

export default Logo;