import React, { Component } from 'react';
import { List, makeSelectable } from 'material-ui/List';
import MessageItem from '../MessageItem/index';
import './style.sass';
import PropTypes from 'prop-types';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

export default class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.array,
        userId: PropTypes.number
    };
    static defaultProps = {
        messages: []
    };

    render() {

        let messages = this.props.messages.map((message, i) =>
            <MessageItem
                value={0}
                key={i}
                {...message}
                userId={this.props.userId}
            />);

        return <div>
            <SelectableList defaultValue={0}>
                {messages}
            </SelectableList>
        </div>
    }
}