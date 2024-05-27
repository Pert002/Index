import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import {setUser} from "../../../store/slices/userSlice";
import {store} from "../../../store";

const ProfileForm = ({classname, title, storename}) => {
    const [isEditing, setIsEditing] = useState(false);
    const storeName = useSelector(state => state.user[storename])
    const [editedText, setEditedText] = useState(storeName);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        const updatedData = {
            [storename]: editedText,
        }
        store.dispatch(setUser(updatedData));
        console.log(store.getState());
        setEditedText(editedText);
    };

    const handleInputChange = (e) => {
        setEditedText(e.target.value);
    };

    return (
        <div className={`profile__form__${classname} profile__form-element`}>
            <div className='profile__form__title'>{title}:</div>
            {isEditing ? (
                <input className='profile__form__input' type="text" value={editedText} onChange={handleInputChange}/>
            ) : (
                <div className='profile__form__data'>{editedText}</div>
            )}
            {isEditing ? (
                <button className='profile__form__save profile__form__button' onClick={handleSaveClick}></button>
            ) : (
                <button className='profile__form__edit profile__form__button' onClick={handleEditClick}></button>
            )}
        </div>
    );
};

export default ProfileForm;