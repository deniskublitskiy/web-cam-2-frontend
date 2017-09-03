import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, CircularProgress, ListItem } from 'material-ui';
import moment from 'moment';

const styles = {
    width: 'auto',
    height: 'auto',
    top: 'auto'
};

const messageTextStyles = {
    paddingRight: 100
};

export default class MessageItem extends Component {

    /**
     * Get text shortcut. Abbreviation from uppercase letters
     *
     * Example:
     * textShortCut(Niki Spain) => NS
     *
     * @param text
     * @returns {string}
     */
    textShortCut(text) {
        let shortCut = text.match(/[A-ZА-Я]/g);
        return shortCut ? shortCut.join('') : '';
    }

    static propTypes = {
        value: PropTypes.number.isRequired,
        text: PropTypes.string,
        author: PropTypes.shape({
            id: PropTypes.number,
            avatar: PropTypes.string,
            fullName: PropTypes.string
        }),
        createdAt: PropTypes.string,
        isSending: PropTypes.bool,
        userId: PropTypes.number
    };

    get timestamps() {
        return <div className="message-item-timestamp">
            {moment(this.props.createdAt).calendar()}
        </div>
    }

    get loader() {
        return <CircularProgress size={30}/>
    }

    get avatar() {
        return this.props.author.avatar ?
            <Avatar
                className="message-item-avatar"
                src={this.props.author.avatar}
            /> :
            <Avatar
                className="message-item-avatar"
                backgroundColor={this.props.author.color}
            >
                {this.textShortCut(this.props.author.fullName)}
            </Avatar>
    }

    get text() {

        return <div className={"message-item-text" + (!this.isOutGoing ? " align-right" : "")}>
            {this.props.text}
        </div>
    }

    get outGoing() {
        return <div className="message-item">
            {this.avatar}
            {this.text}
            {this.props.isSending
                ? this.loader
                : this.timestamps
            }
        </div>
    }

    get incoming() {
        return <div className="message-item">
            {this.timestamps}
            {this.text}
            {this.avatar}
        </div>
    }

    get isOutGoing() {
        return this.props.author.id === this.props.userId
    }

    render() {
        return <ListItem value={this.props.value}>
            {this.isOutGoing ? this.outGoing : this.incoming}
        </ListItem>;
    }
}