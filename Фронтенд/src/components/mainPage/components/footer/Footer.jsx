import React, {useState} from 'react';
import './styles/Footer.css'
import ContactForm from "./ContactForm";

const Footer = () => {
    const [showForm, setShowForm] = useState(false); // Состояние для отображения/скрытия формы

    const handleContactForm = () => {
        setShowForm(true);
    }

    const handleCloseContactForm = () => {
        setShowForm(false);
    }

    return (
        <div className='footer'>
            <div className="wrapper">
                <div className="footer__contacts">
                    <div className="footer__contacts__item">
                        <p className="footer__contacts__item__title">
                            Адрес
                        </p>
                        <div className="footer__contacts__item__text">
                            Улица Пушкина, дом Колотушкина
                        </div>
                    </div>
                    <div className="footer__contacts__item">
                        <p className="footer__contacts__item__title">
                            Контакты
                        </p>
                        <div className="footer__contacts__item__text contact">
                            123
                            321
                            123
                        </div>
                    </div>
                    <div className="footer__contacts__item">
                        <p className="footer__contacts__item__title">
                            Наши каналы
                        </p>
                        <div className="footer__contacts__item__text">

                        </div>
                    </div>
                    <div className="footer__contacts__item">
                        <p className="footer__contacts__item__title">
                            Служба внутреннего контроля
                        </p>
                        <div className="footer__contacts__item__text">
                            Высказать свое замечание или предложение Вы можете заполнив
                            <span className='footer__contacts__form' onClick={handleContactForm}> онлайн-форму</span>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && <ContactForm onClose={handleCloseContactForm} />}
        </div>
    );
};

export default Footer;