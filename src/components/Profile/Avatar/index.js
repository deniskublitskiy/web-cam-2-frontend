import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar as MaterialAvatar, FloatingActionButton, FontIcon } from 'material-ui'

export default class Avatar extends Component {
    get deleteAvatarButton() {
        return (
            <FloatingActionButton
                mini={true}
                onClick={::this.deleteAvatar}
                disabled={!this.props.user.avatar}
            >
                <FontIcon className="material-icons">
                    delete_forever
                </FontIcon>
            </FloatingActionButton>
        );
    }

    get getUploadButton() {
        return (
            <FloatingActionButton
                mini={true}
                secondary={true}
                onClick={::this.openUpload}
            >
                <FontIcon className="material-icons">
                    file_upload
                </FontIcon>
            </FloatingActionButton>
        );
    }

    get image() {
        let {user} = this.props;
        return user.avatar
            ? <MaterialAvatar
                className="profile-avatar-container"
                src={user.avatar}
                size={100}
            />
            : <MaterialAvatar
                className="profile-avatar-container"
                backgroundColor={user.color}
                size={100}
            >
                {textShortCut(user.fullName)}
            </MaterialAvatar>
    }

    get imageUpload() {
        return (
            <div className="profile-avatar-upload-container">
                {this.getUploadButton}
                {this.deleteAvatarButton}
                <input
                    accept="image/*"
                    type="file"
                    onChange={::this.upload}
                    style={{display: 'none'}}
                    ref="fileInput"
                />
            </div>
        );
    };

    openUpload() {
        this.refs.fileInput.click();
    }

    deleteAvatar() {
        this.props.onImageChange('');
        this.refs.fileInput.value = '';
    }


    loadEnd(e) {
        this.props.onImageChange(e.target.result);
        this.refs.fileInput.value = '';
    }

    readFile(file) {
        let reader = new FileReader();
        reader.onloadend = ::this.loadEnd;
        reader.readAsDataURL(file);
    }

    upload(e) {
        let file = [].find.call(e.target.files, file => file.type.match(/image/i));
        if (file) {
            this.readFile(file)
        } else {
            console.error('Impossible photo format')
        }
    }

    render() {
        return (
            <div className="profile-avatar-container">
                {this.image}
                {this.imageUpload}
            </div>
        );

    }
}

Avatar.propTypes = {
    onImageChange: PropTypes.func.isRequired
};


//TODO Move to utilities
/**
 * Get text shortcut. Abbreviation from uppercase letters
 *
 * Example:
 * textShortCut(Niki Spain) => NS
 *
 * @param text
 * @returns {string}
 */
function textShortCut(text) {
    let shortCut = text.match(/[A-Z,А-Я]/g);
    return shortCut ? shortCut.join('') : '';
}