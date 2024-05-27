import React, {useEffect, useState} from 'react';
import LoginForm from "../LoginForm";
import '../styles/Passres.css'

const PasswordResetContent = () => {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isEmail, setIsEmail] = useState(false);

    useEffect(() => {
        setIsEmail(!!email);
    }, [email]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleError = () => {
        if (!email) {
            setEmailError('Заполните поле email');
        }
    }

    const handleResetPassword = () => {
        console.log(email);
        setIsEmailSent(true);
    };

    return (
        <div className='passres__content'>
            <h1 className="passres__content__title">Сброс пароля</h1>
            {isEmailSent ? (
                <div className="passres__content__centercolumn">
                    <div className='passres__message'>Письмо с инструкциями по восстановлению пароля отправлено на вашу почту.</div>
                </div>
            ) : (
                <div className="passres__content__centercolumn">
                    <p className='passres__content__text'>Введите свой адрес электронной почты для восстановления пароля:</p>
                    <LoginForm
                        formClass={'passres__content__email'}
                        labelFor={'passresEmail'}
                        labelContent={"Адрес электронной почты"}
                        type="email"
                        inputText={"Введите email"}
                        onChange={e => handleEmailChange(e)}
                        error={{ field: 'passresEmail', message: emailError }}
                    />
                    <button className="passres-button" onClick={isEmail ? handleResetPassword : handleError}>Восстановить пароль</button>
                </div>
            )}
        </div>
    );
};

export default PasswordResetContent;
