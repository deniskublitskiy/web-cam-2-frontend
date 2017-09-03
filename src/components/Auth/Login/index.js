import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { CircularProgress, Paper, RaisedButton } from 'material-ui';
import '../style.sass';
import { loginRequest } from '../../../actions/auth';
import { Link } from 'react-router-dom';

@connect(state => ({isFetching: state.auth.isFetching}), {submit: loginRequest})
export default class Login extends Component {

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
            password
        } = this.state;
        return (
            <Paper className="auth-form">
                <ValidatorForm
                    ref="form"
                    onSubmit={::this.onSubmit}
                >
                    <div className="form-header">
                        <h1>Login</h1>
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
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={::this.handleChange}
                        fullWidth={true}
                        floatingLabelText="Password"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <RaisedButton
                        type="submit"
                        secondary={true}
                        label="login"
                        fullWidth={true}
                        className="submit-button"
                    />
                    <div className="auth-form-links-container">
                        Do not have an account yet? <Link to="/signup">Sign Up</Link>
                    </div>
                </ValidatorForm>
            </Paper>
        );
    }
}