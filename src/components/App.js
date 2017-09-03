import React, { Component } from 'react';
import { connect } from 'react-redux';


import SideBar from './SideBar';
import Chat from './Chat';
import Video from './Video';
import { fetchUser } from '../actions/users';

import './style.sass';
import { addContactRequestSuccess } from '../actions/contacts';
import TestsConstructor from './Tests/TestsConstructor/index';
import QuestionConstructor from './Tests/QuestionConstructor/index';
import { Paper } from 'material-ui';

@connect(state => ({user: state.user}), {
    fetchUser,
    addContactRequestSuccess
})
export default class App extends Component {

    async componentDidMount() {
        if (this.props.user.id) {
            return;
        }

        try {
            await this.props.fetchUser(localStorage.getItem('user.id'));
        } catch (e) {
            this.props.history.push('/login')
        }
    }


    render() {
        return (
            <div>
                <SideBar/>
                <div className="video-container">
                    <Video/>
                </div>
                <div className="chat-container">
                    <Chat/>
                </div>
                {
                    this.props.user.role === 2 &&
                    <div className="tests-constructor-container">
                        <Paper style={{padding: 15}}>
                            <QuestionConstructor/>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}
