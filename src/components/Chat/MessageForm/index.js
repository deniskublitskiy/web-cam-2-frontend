import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';

import './style.sass';
import SendIcon from 'material-ui/svg-icons/content/send';
import ChatAttachments from '../ChatAttachments/index';

export default class MessageForm extends Component {

    state = {
        message: ''
    };

    static propTypes = {
        onSubmit: PropTypes.func

    };

    reset() {
        this.setState({
            message: ''
        });
    }

    submitHandler(e) {
        e.preventDefault();
        let { message } = this.state;
        if (message.trim().length) {
            this.props.onSubmit && this.props.onSubmit(message);
            this.reset();
        }
    }

    changeHandler(e) {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return <form className="chat-message-form-container"
                     onSubmit={::this.submitHandler}
        >
            <div>
                <TextField
                    name="message"
                    floatingLabelText="Message..."
                    floatingLabelFixed={true}
                    rows={1}
                    rowsMax={3}
                    multiLine={true}
                    fullWidth={true}
                    value={this.state.message}
                    onChange={::this.changeHandler}
                />
                <ChatAttachments/>
            </div>
            <div>
                <RaisedButton
                    label="Send"
                    type="submit"
                    labelPosition="before"
                    primary={true}
                    icon={<SendIcon />}
                />
            </div>
        </form>;
    }
}