import React from 'react';
import './Profile.css'
import Header from "../../mainPage/components/navbar/Header";
import {useSelector} from "react-redux";
import ProfileForm from "./ProfileForm";
import Footer from "../../mainPage/components/footer/Footer";

const Profile = () => {
    const userName = useSelector(state => state.user.fullName);

    return (
        <div className='profile__main'>
            <Header />
            <div className="container">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <div className="profile__avatar__img"></div>
                        <div className="profile__avatar__email">
                            {userName}
                        </div>
                    </div>
                    <div className="profile-form">
                        <ProfileForm
                            classname='name'
                            title='Ваше полное имя'
                            storename='fullName'
                        />
                        <ProfileForm
                            classname='email'
                            title='Ваш email'
                            storename='email'
                        />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;