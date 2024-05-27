import React, { useEffect } from 'react';
import './styles/ProfileBurgerMenu.css'
import {useNavigate} from "react-router-dom";
import {store} from "../../../../store";
import {removeUser} from "../../../../store/slices/userSlice";

const ProfileBurgerMenu = () => {
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate('/profile')
    }

    const handleQuit = () => {
        localStorage.removeItem('userToken');
        store.dispatch(removeUser());
        console.log(localStorage)
        navigate('/');
    }

    useEffect(() => {
        const profileMenu = document.getElementById('profile-menu');
        const menuItems = document.querySelector('.menu-items');

        const handleMouseOver = () => {
            profileMenu.classList.add('open');
        };

        const handleMouseOut = () => {
            profileMenu.classList.remove('open');
        };

        profileMenu.addEventListener('mouseover', handleMouseOver);
        profileMenu.addEventListener('mouseleave', handleMouseOut);

        menuItems.addEventListener('mouseenter', handleMouseOver);
        menuItems.addEventListener('mouseleave', handleMouseOut);

        return () => {
            // Очистка событий при размонтировании компонента
            profileMenu.removeEventListener('mouseover', handleMouseOver);
            profileMenu.removeEventListener('mouseleave', handleMouseOut);

            menuItems.removeEventListener('mouseenter', handleMouseOver);
            menuItems.removeEventListener('mouseleave', handleMouseOut);
        };
    }, []);

    return (
        <div className="profile-menu" id="profile-menu">
            <div className="profile-icon">

            </div>
            <ul className="menu-items">
                <li className='menu-item' onClick={handleProfile} >Профиль</li>
                <li className='menu-item'>Настройки</li>
                <li className='menu-item' onClick={handleQuit} >Выйти</li>
            </ul>
        </div>
    );
};

export default ProfileBurgerMenu;