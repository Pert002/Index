import React from 'react';

const IndexButton = ({buttonText, onClick, isSelected}) => {
    return (
        <button className={isSelected ? 'index__button__selected' : 'index__button'} onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default IndexButton;