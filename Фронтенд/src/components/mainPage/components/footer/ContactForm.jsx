import React, {useEffect, useState} from 'react';
import './styles/ContactForm.css'
import LoginForm from "../../../login/LoginForm";

const ContactForm = ({onClose}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [textError, setTextError] = useState('');

    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isText, setIsText] = useState(false);

    useEffect(() => {
        setIsEmail(!!email);
        setIsName(!!name);
        setIsText(!!text);
    }, [name, email, text]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
        setTextError('');
    }

    const handleError = () => {
        if (!name) {
            setNameError('Заполните поле "имя" ');
        }

        if (!email) {
            setEmailError('Заполните поле email');
        }

        if (!text) {
            setTextError('Введите Ваш текст обращения');
        }
    }

    const handleFormSubmit = () => {
        onClose();
        const rerror = {field: 'contactFormText', message: textError}
        console.log(rerror);
    }

    return (
        <div className='contact-form'>
            <div className="contact-form__bg">

            </div>
            <div className="contact-form__content">
                <div className="contact-form__title">
                    Служба внутреннего контроля
                </div>
                <button className='contact-form__close' onClick={onClose}></button>
                <LoginForm
                    formClass={'contact-form__name contact-form__field'}
                    labelFor={"contactFormName"}
                    labelContent={"Имя"}
                    type="text"
                    inputText={"Введите Ваше имя"}
                    onChange={e => handleNameChange(e)}
                    error={{field: 'contactFormName', message: nameError}}
                />
                <LoginForm
                    formClass={'contact-form__email contact-form__field'}
                    labelFor={"contactFormEmail"}
                    labelContent={"Email"}
                    type="email"
                    inputText={"Введите email"}
                    onChange={e => handleEmailChange(e)}
                    error={{field: 'contactFormEmail', message: emailError}}
                />
                <div className="contact-form__text contact-form__field">
                    <label htmlFor="contactFormText">Текст сообщения</label>
                    <div className="input-container">
                        <textarea
                            cols="30"
                            rows="10"
                            onChange={e => handleTextChange(e)}
                        >

                        </textarea>
                    </div>
                    {textError && <div style={{color: 'red'}}>Введите Ваш текст обращения</div>}
                </div>
                <button className="contact-form__button"
                    onClick={(isEmail && isName && isText) ? handleFormSubmit : handleError}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default ContactForm;