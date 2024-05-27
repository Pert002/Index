import React, {useCallback, useLayoutEffect, useState} from 'react';
import Header from "../../mainPage/components/navbar/Header";
import Footer from "../../mainPage/components/footer/Footer";
import {getApiInstance} from "../../../api";
import { useParams } from "react-router-dom";
import '../styles/ForumMessages.css'
import {useSelector} from "react-redux";
import ForumLoginForm from "./ForumLoginForm";

const ForumMessages = () => {
    const [forumMessages, setForumMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [errorMessageText, setErrorMessageText] = useState('');
    const [title, setTitle] = useState('');
    const [cantSendMessages, setCantSendMessages] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const author = useSelector((state) => state.user.id);
    const api = getApiInstance();
    const token = localStorage.getItem('userToken');
    const { id } = useParams();

    const role = useSelector((state) => state.user.role);

    const handleGetForumMessages = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = (await api.forumMessages(token, id)).data;
            setTitle(response.title);
            setForumMessages(response.messages);
        } catch (e) {
            console.log(e.message)
        }
        setIsLoading(false)
    }, [api, token, id]);

    const handleCheckRole = useCallback(() => {
        if (role === 'unauthorized') {
            setCantSendMessages(true)
        } else if (role === 'admin') {
            setIsAdmin(true)
        }
    }, [role])

    useLayoutEffect(() => {
        handleGetForumMessages()
        handleCheckRole()
    }, [handleGetForumMessages, handleCheckRole]);

    const handleTextChange = (e) => {
        setMessageText(e.target.value);
        setErrorMessageText('');
    }

    const handleClearMessageText = () => {
        setMessageText('');
        setErrorMessageText('');
    }

    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    const handleDeleteMessage = useCallback(async (message) => {
        console.log(message)
        try {
            await api.deleteMessage(id, token, message);
            setForumMessages((prevMessages) => prevMessages.filter(m => m.id !== id));
        } catch (e) {
            console.log(e.message);
        }
    }, [api, token, id]);

    const handleSendNewMessage = useCallback(async () => {
        if (!messageText) {
            setErrorMessageText('Введите Ваше сообщение');
            return
        }
        try {
            const response = (await api.sendNewMessage(token, id, messageText, author)).data;
            setForumMessages(response.messages)
        } catch (e) {
            console.log(e);
        }
        setMessageText('');
        setErrorMessageText('');
    }, [api, messageText, id, token, author])

    return (
        <div className="forum-messages">
            <Header />
            <div className="container">
                <div className="forum-messages__body">
                    <div className="forum-messages__title">
                        {title}
                    </div>
                    {!isLoading && (
                        <div className="forum-messages__content">
                            <ul>
                                {forumMessages.map(message => (
                                    <li key={message._id}>
                                        <div className='forum-messages__message'>
                                            {isAdmin && (<button className='topics__message-delete' onClick={e => {handleDeleteMessage(message)}
                                            }></button>)}
                                            {message.message}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="forum-messages__textarea">
                                <textarea
                                    cols='auto'
                                    rows='5'
                                    placeholder='Введите сообщение'
                                    id='98'
                                    value={messageText}
                                    onChange={e => {
                                        handleTextChange(e);
                                        setErrorMessageText('');
                                    }}
                                />
                                {errorMessageText && (<div style={{ color: 'red', position: "absolute", bottom: '-15%' }}>{errorMessageText} </div>)}
                                <button
                                    className="clear-textarea"
                                    onClick={handleClearMessageText}
                                ></button>
                                <button
                                    className="forum-messages__send-message"
                                    onClick={() => {
                                        if (!cantSendMessages) {
                                            handleSendNewMessage()
                                        } else {
                                            handleShowForm()
                                        }
                                    }}
                                >
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showForm && <ForumLoginForm onClose={handleCloseForm} />}
            <Footer/>
        </div>
    );
};

export default ForumMessages;