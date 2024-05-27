import React from 'react';
import './styles/AuthenticationForm.css'

const LoginForm = ({
      formClass,
      labelFor,
      labelContent,
      inputText,
      type,
      onChange,
      error,
      children
      }) => {
    return (
        <div className={formClass}>
            <label htmlFor={labelFor}>{labelContent}</label>
            <div className="input-container">
                <input
                       type={type}
                       placeholder={inputText}
                       id={labelFor}
                       onChange={onChange}
                />
                {children}
            </div>
            {error && error.field === labelFor && <div style={{ color: 'red' }}>{error.message}</div>}

        </div>
    );
};

export default LoginForm;