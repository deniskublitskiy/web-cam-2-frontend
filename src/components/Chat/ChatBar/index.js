import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.sass';
import { Chip, Avatar } from 'material-ui';
import SeetingsIcon from 'material-ui/svg-icons/action/settings';
import moment from 'moment';

export default class ChatBar extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        members: PropTypes.array,
        createdAt: PropTypes.string
    };

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

    render() {
        let members = this.props.members.map((member, index) => <Chip
                className="members-contacts-chip"
                key={index}
            >
                {
                    member.avatar ?
                        <Avatar src={member.avatar}/> :
                        <Avatar
                            backgroundColor={member.color}>
                            {this.textShortCut(member.fullName)}
                        </Avatar>
                }
                {member.fullName}
            </Chip>
        );

        return <div className="chat-bar">
            <div className="chat-bar-title">
                {this.props.name}
                <span className="chat-bar-subtitle">(members count: {this.props.members.length})</span>
            </div>
            <div className="chat-bar-info">
                created <b>{moment().calendar(this.props.createdAt)}</b>
            </div>
            <div className="chat-bar-info">
                by <b>{this.props.createdBy.fullName}</b>
            </div>
            <div className="members-contacts-chips">
                {members}
            </div>
            <div className="chat-bar-tools">
                <SeetingsIcon/>
            </div>
        </div>
    }
}