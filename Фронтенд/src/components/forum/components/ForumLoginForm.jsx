import React, {useEffect, useState} from 'react';
import '../styles/ForumLoginForm.css'
import LoginForm from "../../login/LoginForm";
import axios from "axios";
import {store} from "../../../store";
import {setUser} from "../../../store/slices/userSlice";

const ForumLoginForm = ({onClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    useEffect(() => {
        setIsEmail(!!email);
        setIsPassword(!!password);
    }, [email, password]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    }

    const handleError = () => {
        if (!email) {
            setEmailError('Заполните поле email');
        }

        if (!password) {
            setPasswordError('Заполните поле пароль');
        }
    }

    const handleFormSubmit = () => {

        if (!email) {
            setEmailError('Заполните поле email');
        }

        if (!password) {
            setPasswordError('Заполните поле пароль');
        }

        axios.post('http://localhost:4444/auth/login', {
            email,
            password,
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

            })
            .catch(error => {
                // Обрабатываем ошибку
                console.error('Ошибка отправки данных на сервер:', error);
            });
    };

    return (
        <div className='forum__login-form'>
            <div className="forum__login-form__bg">

            </div>
            <div className="forum__login-form__content">
                <div className="forum__login-form__title">
                    Вы не авторизованы!
                </div>
                <div className="forum__login-form__text">
                    Для того, чтобы общаться на форуме, пожалуйста, авторизуйтесь!
                </div>
                <button className='forum__login-form__close' onClick={onClose}></button>

                <LoginForm
                    formClass={"forum__login-form__email"}
                    labelFor={"loginEmail"}
                    labelContent={"Адрес электронной почты"}
                    type="email"
                    inputText={"Введите email"}
                    onChange={e => handleEmailChange(e)}
                    error={{ field: 'loginEmail', message: emailError }}
                />
                <LoginForm
                    formClass={"forum__login-form__password"}
                    labelFor={"loginPassword"}
                    labelContent={"Пароль"}
                    type="password"
                    inputText={"Введите пароль"}
                    onChange={e => handlePasswordChange(e)}
                    error={{ field: 'loginPassword', message: passwordError }}
                />
                <button className='forum__login-form__button' onClick={(isEmail && isPassword) ? handleFormSubmit : handleError}>Войти</button>
            </div>
        </div>
    );
};

export default ForumLoginForm;