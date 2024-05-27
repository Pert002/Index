import React, {useEffect, useState} from 'react';
import LoginForm from "../LoginForm";
import {setAuthenticated, setUser} from "../../../store/slices/userSlice";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {store} from "../../../store";


export async function loginUser(email, password) {

    return await axios.post(
        'http://localhost:4444/auth/login',
        {
            email: email,
            password: password
        },
        {
            headers: {
                'content-type': 'application/json'
            },
        },
    )
}
const AuthenticationContent = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [passwordTypeBool, setPasswordTypeBool] = useState(false);
    const [passwordType, setPasswordType] = useState('password');

    useEffect(() => {
        setIsEmail(!!email);
        setIsPassword(!!password);
    }, [email, password]);

    const handleChangePasswordType = () => {
        setPasswordType(passwordTypeBool ? 'password' : 'text');
        setPasswordTypeBool(!passwordTypeBool);
    }

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

        loginUser(email, password)
            .then(user => {
                localStorage.setItem('userToken', user.data.token);

                store.dispatch(setUser({
                    email: user.data.email,
                    id: user.data._id,
                    token: user.data.token,
                    fullName: user.data.fullName,
                    role: user.data.role
                }));
                store.dispatch(setAuthenticated());
                console.log(user.data);
                console.log(store.getState());
                navigate('/');
            })
            .catch(error => {
                console.error("Ошибка запроса на сервер:", error);
            });
    };

    return (
        <div className="auth__content">
            <h1 className="auth__content__title">Авторизация</h1>
            <div className="auth__content__centercolumn">
                <LoginForm
                    formClass={"auth__content__email"}
                    labelFor={"loginEmail"}
                    labelContent={"Адрес электронной почты"}
                    type="email"
                    inputText={"Введите email"}
                    onChange={e => handleEmailChange(e)}
                    error={{field: 'loginEmail', message: emailError}}
                />
                <LoginForm
                    formClass={"auth__content__password"}
                    labelFor={"loginPassword"}
                    labelContent={"Пароль"}
                    type={passwordType}
                    inputText={"Введите пароль"}
                    onChange={e => handlePasswordChange(e)}
                    error={{field: 'loginPassword', message: passwordError}}
                >
                    <button onClick={handleChangePasswordType} className='view-password'></button>
                </LoginForm>
                <button className="auth-button"
                        onClick={(isEmail && isPassword) ? handleFormSubmit : handleError}>Войти
                </button>
            </div>
        </div>
    );
};


export default AuthenticationContent;