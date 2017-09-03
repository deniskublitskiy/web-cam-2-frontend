import React from 'react';
import { connect } from 'react-redux';

import Avatar from './Avatar';
import './style.sass';
import ProfileName from './ProfileName/';
import { changeUser } from '../../actions/users';


const Profile = ({user, onChange}) =>
    <div className="profile-container">
        <Avatar user={user} onImageChange={imageUrl => onChange({id: user.id, avatar: imageUrl})}/>
        <ProfileName user={user} onChange={fullName => onChange({id: user.id, fullName})}/>
    </div>;

export default connect(
    state => ({
        user: state.user
    }),
    {
        onChange: changeUser
    }
)(Profile)