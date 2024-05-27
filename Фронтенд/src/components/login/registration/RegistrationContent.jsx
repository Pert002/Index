import React, {useEffect, useState} from 'react';
import LoginForm from "../LoginForm";
import {setUser} from "../../../store/slices/userSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {store} from "../../../store";

const RegistrationContent = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [subscribe, setSubscribeToNewsletter] = useState(false);

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isFullName, setIsFullName] = useState(false);

    useEffect(() => {
        setIsEmail(!!email);
        setIsPassword(!!password);
        setIsFullName(!!fullName);
    }, [email, password, fullName]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        setFullNameError('');
    }

    const handleError = () => {
        if (!fullName) {
            setFullNameError('Заполните поле "имя"')
        }

        if (!email) {
            setEmailError('Заполните поле email');
        }

        if (!password) {
            setPasswordError('Заполните поле пароль');
        }
    }

    const handleFormSubmit = () => {

        if (!fullName) {
            setFullNameError('Заполните поле "имя"')
        }

        if (!email) {
            setEmailError('Заполните поле email');
        }

        if (!password) {
            setPasswordError('Заполните поле пароль');
        }

        axios.post('http://localhost:4444/auth/register', {
            email,
            password,
            fullName,
            subscribe,
        })
            .then(user => {

                localStorage.setItem('user', JSON.stringify({
                    token: user.data.token,
                }));

                store.dispatch(setUser({
                    email: user.data.email,
                    id: user.data._id,
                    token: user.data.token,
                }))
                console.log(user.data);
                console.log(store.getState());
                navigate('/');

            })
            .catch(error => {
                // Обрабатываем ошибку
                console.error('Ошибка отправки данных на сервер:', error);
            });
    };

    return (
        <div className="reg__content">
            <h1 className="reg__content__title">Регистрация</h1>
            <div className="reg__content__centercolumn">
                <p className="reg__content__text"> Регистрируясь на сайте "  ", Вы получаете полный доступ ко всем публичным материалам агентства,
                    Вы сможете настроить интересующие Вас темы новостной рассылки, а также подписаться на новости о конкретной компании
                    или регионе из нашей Базы Данных.
                </p>
                <h2 className="reg__content__request">Заполните все поля формы регистрации:</h2>
                <LoginForm
                    formClass={"reg__content__full-name"}
                    labelFor={"loginFullName"}
                    labelContent={"Ваше имя"}
                    type="text"
                    inputText={"Введите ваше полное имя"}
                    onChange={e => handleFullNameChange(e)}
                    error={{ field: 'loginFullName', message: fullNameError }}
                />
                <LoginForm
                    formClass={"reg__content__email"}
                    labelFor={"loginEmail"}
                    labelContent={"Адрес электронной почты"}
                    type="email"
                    inputText={"Введите email"}
                    onChange={e => handleEmailChange(e)}
                    error={{ field: 'loginEmail', message: emailError }}
                />
                <LoginForm
                    formClass={"reg__content__password"}
                    labelFor={"loginPassword"}
                    labelContent={"Пароль"}
                    type="password"
                    inputText={"Введите пароль"}
                    onChange={e => handlePasswordChange(e)}
                    error={{ field: 'loginPassword', message: passwordError }}
                />
                <div className="reg__content__newsletter__content">
                    <input
                        type="checkbox"
                        className="reg__content__newsletter"
                        id="newsletterCheckbox"
                        checked={subscribe}
                        onChange={() => {setSubscribeToNewsletter(!subscribe); console.log(subscribe) }}
                    />
                    <label htmlFor="newsletterCheckbox" className="reg__content__newsletter-label">
                        Подписаться на рассылку
                    </label>
                </div>
                <button className="reg-button" onClick={(isEmail && isPassword && isFullName) ? handleFormSubmit : handleError}>Зарегистрироваться</button>
            </div>
        </div>
    );
};

export default RegistrationContent;