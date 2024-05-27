import React, {useCallback, useLayoutEffect, useState} from 'react';
import Header from "../../mainPage/components/navbar/Header";
import Footer from "../../mainPage/components/footer/Footer";
import {getApiInstance} from "../../../api";
import {Link} from "react-router-dom";
import '../styles/ForumTopics.css'
import {useSelector} from "react-redux";
import {format } from "date-fns";

const ForumTopics = () => {
    const [forumTopics, setForumTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTopic, setNewTopic] = useState('');
    const [errorCreatingNewTopic, setErrorCreatingNewTopic] = useState('')
    const [textAreaVisible, setTextAreaVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const api = getApiInstance();
    const token = localStorage.getItem('userToken');

    // roles: [
    //     'authorized',
    //     'unauthorized',
    //     'admin'
    // ]

    const role = useSelector((state) => state.user.role);
    const userId = useSelector((state) => state.user.id);

    const handleGetForumTopics = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = (await api.forumTopics(token)).data
            setForumTopics(response)
        } catch (e) {
            console.log(e.message)
        }
        setIsLoading(false);
    }, [api, token]);

    const handleCheckIsAdmin = useCallback(() => {
        if (role === 'admin') {
            setIsAdmin(true);
        }
    }, [role]);

    useLayoutEffect(() => {
        handleGetForumTopics()
        handleCheckIsAdmin()
    }, [handleGetForumTopics, handleCheckIsAdmin]);

    const handleCreateNewForum = useCallback ( async() => {
        if (!newTopic) {
            setErrorCreatingNewTopic('Заполните поле "название новой темы"!');
            return
        }

        try {
            const response = (await api.sendNewForum(token, newTopic, userId)).data;
            response.id = response['_id']
            delete response['_id']
            setForumTopics((prevTopics) => [...prevTopics, response]);
        } catch (e) {
            console.log(e.message)
        }
        setNewTopic('');
        setErrorCreatingNewTopic('');
        setTextAreaVisible(false);
    }, [api, token, newTopic, userId]);

    const handleShowTextArea = () => {
        setTextAreaVisible(true);
    }

    const handleTextChange = (e) => {
        setNewTopic(e.target.value);
    }

    const handleCloseNewForum = () => {
        setTextAreaVisible(false);
        setErrorCreatingNewTopic('');
        setNewTopic('');
    }

    const handleDeleteTopic = useCallback(async (topic) => {
        const id = topic.id;
        try {
            await api.deleteTopic(id, token);
            setForumTopics((prevTopics) => prevTopics.filter(t => t.id !== id));
        } catch (e) {
            console.log(e.message);
        }
    }, [api, token]);


    return (
        <div className="forum-topics">
            <Header />
                <div className="container">
                    <div className="forum-topics__content">
                        <div className="forum-topics__title">Добро пожаловать на форум!</div>
                        {!textAreaVisible && (role !== 'unauthorized') && (<button
                            className="forum-topics__new-forum-button forum-topics__button"
                            onClick={handleShowTextArea}
                        >
                            Создать тему
                        </button>)}
                        {textAreaVisible && (
                            <div className="forum-messages__new-forum-textarea">
                                <label htmlFor='97'> Название новой темы </label>
                                <input
                                    type='text'
                                    placeholder='Введите название новой темы'
                                    id='97'
                                    onChange={e => {
                                        handleTextChange(e);
                                        setErrorCreatingNewTopic('');
                                    }}
                                />
                                {errorCreatingNewTopic && (<div style={{ color: 'red' }}>{errorCreatingNewTopic} </div>)}
                                <button
                                    className="forum-messages__send-new-forum forum-topics__button"
                                    onClick={handleCreateNewForum}
                                >
                                    Создать
                                </button>
                                <button
                                    className="forum-messages__cancel-new-forum forum-topics__button"
                                    onClick={handleCloseNewForum}
                                >
                                    Отмена
                                </button>
                            </div>
                            )}
                        {!isLoading && (
                            <table className="topics">
                                <tbody>
                                <tr>
                                    <th className='topics__theme'>
                                        Форумы
                                    </th>
                                    <th className="topics__theme">
                                        Сообщений
                                    </th>
                                    <th className="topics__theme">
                                        Последнее сообщение
                                    </th>
                                </tr>
                                {forumTopics.map(topic => (
                                    <tr key={topic.id}>
                                        <td className='topics__topic'>
                                            {isAdmin && (<button className='topics__topic-delete' onClick={e => {handleDeleteTopic(topic)}
                                            }></button>)}
                                            <Link to={{pathname: `/forum/${topic.id}`}}>{topic.title}</Link></td>
                                        <td className="topics__topic-messages">
                                            {topic.countOfMessages}
                                        </td>
                                        <td className="topics__topic-last-message-date">
                                            {topic.lastMessage ? (format(new Date(topic.lastMessage.date), 'dd.MM.yyyy')) : 'Пустая тема'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default ForumTopics;