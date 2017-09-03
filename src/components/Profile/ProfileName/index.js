import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, TextField } from 'material-ui';

export default class ProfileName extends Component {

    state = {
        isEditMode: false
    };

    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    toggleEditMode() {
        this.setState({
            ...this.state,
            isEditMode: !this.state.isEditMode
        })
    }

    change(e) {
        if (e.key !== 'Enter') return;
        this.toggleEditMode();
        if (this.props.user.fullName !== e.target.value) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        const { user } = this.props;
        return (
            this.state.isEditMode ?

                <div className="profile-name-container">
                    <TextField
                        name="userName"
                        floatingLabelText="Name"
                        defaultValue={user.fullName}
                        onBlur={::this.toggleEditMode}
                        onKeyDown={::this.change}
                        autoFocus
                    />
                </div> :

                <div className="profile-name-container">
                    <h3 className="profile-name">{user.fullName}</h3>
                    <div
                        className="profile-name-edit-button"
                        onClick={::this.toggleEditMode}
                    >
                        <FontIcon className="material-icons">
                            mode_edit
                        </FontIcon>
                    </div>
                </div>
        );
    }
}