import React, { Component } from 'react';
import { Divider, Paper } from 'material-ui';

import MessageList from './MessageList/index';
import MessageForm from './MessageForm/index';

import './style.sass';
import { connect } from 'react-redux';
import { sendChatMessageRequest } from '../../actions/groups';
import ChatBar from './ChatBar/index';


@connect(
    state => ({
        chat: state.groups.current,
        userId: state.user.id
    }),
    {
        sendChatMessage: sendChatMessageRequest
    }
)
export default class Chat extends Component {
    onSendMessage(message) {
        this.props.sendChatMessage(message, this.props.chat.id, this.props.userId);
    }

    render() {
        let messages = this.props.chat.messages.map(message => ({
            ...message,
            author: this.props.chat.members.find(member => member.id == message.authorId)
        }));

        return <Paper>
            <div className="chat-component">
                <ChatBar
                    name={this.props.chat.name}
                    members={this.props.chat.members}
                    createdAt={this.props.chat.createdAt}
                    createdBy={this.props.chat.members.find(member => member.id === this.props.chat.createdById) || {}}
                />
                <Divider/>
                <MessageList messages={messages} userId={this.props.userId}/>
                <MessageForm onSubmit={::this.onSendMessage}/>
            </div>
        </Paper>
    }
}