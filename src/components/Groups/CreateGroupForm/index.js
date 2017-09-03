import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroupAddIcon from 'material-ui/svg-icons/social/group-add';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { Avatar, Chip, IconButton, MenuItem, RaisedButton } from 'material-ui';

import './style.sass';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default class CreateGroupForm extends Component {

    static propTypes = {
        contacts: PropTypes.array,
        onClose: PropTypes.func,
        onSave: PropTypes.func
    };

    static defaultProps = {
        contacts: []
    };

    state = {
        values: [],
        name: ''
    };

    handleChange(e, index, values) {
        this.setState({
            name: values
                .map(value => this.props.contacts.find(contact => contact.id === value).fullName, this)
                .join(', '),
            [e.target.name]: e.target.value,
            values
        })
    }

    selectionRenderer = values => values.length
        ? `${values.length} users selected`
        : '';

    handleRequestDelete(e, value, i) {
        let values = this.state.values;
        values = [...values.slice(0, i), ...values.slice(i + 1)];
        this.setState({
            values,
            name: values
                .map(value => this.props.contacts.find(contact => contact.id === value).fullName, this)
                .join(', '),
        })
    }

    handleNameChange({target}) {
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    }

    menuItems = contacts => contacts.map((contact, i) =>
        <MenuItem
            key={i}
            checked={this.state.values.includes(contact.id)}
            value={contact.id}
            primaryText={contact.fullName}
        />
    );

    onSubmit() {
        this.props.onSave({
            name: this.state.name
        }, this.state.values);
        this.reset();
    }

    reset() {
        this.setState({
            values: [],
            name: ''
        });
    }

    textShortCut(text) {
        let shortCut = text.match(/[A-Z,А-Я]/g);
        return shortCut ? shortCut.join('') : '';
    }

    render() {

        let chips = this.state.values.map((value, i) => {
                let contact = this.props.contacts.find(contact => contact.id === value);
                return <Chip
                    key={i}
                    onRequestDelete={e => this.handleRequestDelete(e, value, i)}
                    className="selected-contact-chip"
                >
                    {
                        contact.avatar ?
                            <Avatar
                                src={contact.avatar}
                            /> :
                            <Avatar
                                backgroundColor={contact.color}
                            >
                                {this.textShortCut(contact.fullName)}
                            </Avatar>
                    }
                    {contact.fullName}
                </Chip>
            }
        );

        return <div className="create-group-form">
            <ValidatorForm
                onSubmit={::this.onSubmit}
            >
                <div className="create-group-form-label">
                    Create group
                </div>
                <div className="close-button">
                    <IconButton
                        className="close-button"
                        onClick={this.props.onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
                <TextValidator
                    name="name"
                    value={this.state.name}
                    floatingLabelText="Name of the group"
                    fullWidth={true}
                    onChange={::this.handleNameChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    multiLine={true}
                    rows={1}
                />
                <SelectValidator
                    name="contacts"
                    multiple={true}
                    hintText="Select user"
                    value={this.state.values}
                    onChange={::this.handleChange}
                    selectionRenderer={this.selectionRenderer}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    fullWidth={true}
                >
                    {this.menuItems(this.props.contacts)}
                </SelectValidator>
                <div className="selected-contacts-chips">
                    {chips}
                </div>
                <RaisedButton
                    primary={true}
                    type="submit"
                    label="Create"
                    fullWidth={true}
                    icon={<GroupAddIcon/>}
                />
            </ValidatorForm>
        </div>;
    }
}