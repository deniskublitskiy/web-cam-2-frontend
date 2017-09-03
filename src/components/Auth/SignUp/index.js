import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { CircularProgress, Paper, RaisedButton } from 'material-ui';
import '../style.sass';
import { signUpRequest } from '../../../actions/auth';
import { Link } from 'react-router-dom';

@connect(state => ({isFetching: state.auth.isFetching}), {submit: signUpRequest})
export default class SignUp extends Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }

    redirectToApp() {
        this.props.history.push('/');
    }

    async onSubmit() {
        try {
            await this.props.submit(this.state);
            this.redirectToApp();
        } catch(e) {}
    }

    handleChange({target}) {
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    }

    render() {
        let {
            email,
            firstName,
            lastName,
            password
        } = this.state;
        return (
            <Paper className="auth-form">
                <ValidatorForm
                    ref="form"
                    onSubmit={::this.onSubmit}
                >
                    <div className="form-header">
                        <h1>Sign up</h1>
                        {
                            this.props.isFetching && <CircularProgress className="form-loader"/>
                        }
                    </div>
                    <TextValidator
                        name="email"
                        id="email"
                        value={email}
                        onChange={::this.handleChange}
                        fullWidth={true}
                        floatingLabelText="Email"
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                    />
                    <TextValidator
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={::this.handleChange}
                        fullWidth={true}
                        floatingLabelText="First name"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={::this.handleChange}
                        fullWidth={true}
                        floatingLabelText="Last name"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        type="password"
                        id="password"
                        value={password}
                        onChange={::this.handleChange}
                        name="password"
                        fullWidth={true}
                        floatingLabelText="Password"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <RaisedButton
                        type="submit"
                        secondary={true}
                        label="sign up"
                        fullWidth={true}
                        className="submit-button"
                    />
                    <div className="auth-form-links-container">
                        Are you have account? <Link to="/login">Login</Link>
                    </div>
                </ValidatorForm>
            </Paper>
        );
    }
}