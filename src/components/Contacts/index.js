import React, { Component } from 'react';
import {
    CircularProgress, Divider, FloatingActionButton, FontIcon, MenuItem, RefreshIndicator,
    Subheader
} from 'material-ui';
import { connect } from 'react-redux';

import Search from './ContactSearch';
import ContactList from './ContactList';
import { contactRequest, fetchContacts, searchContacts } from '../../actions/contacts';

import './style.sass'


const mapStateToProps = state => ({
    connectedContacts: state.contacts.connected,
    allContacts: state.contacts.all,
    searchText: state.contacts.searchText,
    isAllContactsFetching: state.contacts.isAllContactsFetching,
    allContactsCount: state.contacts.allContactsCount
});

const sortFunc = (contactA, contactB) =>
    contactA.fullName.localeCompare(contactB.fullName);

@connect(
    mapStateToProps,
    {
        setSearchText: searchContacts,
        loadContacts: fetchContacts,
        contactRequest
    }
)
export default class Contacts extends Component {

    get allContactsAddMenuItem() {
        return id => <MenuItem onClick={() => {
            this.props.contactRequest(id)
        }}>
            Add
        </MenuItem>;
    }

    get contacts() {
        let {searchText, connectedContacts} = this.props;

        return searchText
            ? connectedContacts.filter(contact => contact.fullName.includes(searchText))
            : connectedContacts;
    }

    componentDidMount() {
        this.props.loadContacts();
    }

    get myContacts() {
        return <div>
            <Subheader inset={false}>My contacts ({this.contacts.length})</Subheader>
            <ContactList
                contacts={this.contacts}
                sortFunc={sortFunc}
            />
        </div>
    }

    get loader() {
        return <div className="contact-list-loader">
            <CircularProgress />
        </div>
    }

    get isFetching() {
        return this.props.isAllContactsFetching;
    }

    get allContacts() {
        return <div>
            <Divider/>
            <Subheader inset={false}>All {!this.isFetching && `(${this.props.allContactsCount})`}</Subheader>
            {this.isFetching && this.loader}
            {!this.isFetching &&
            <ContactList
                menu={this.allContactsAddMenuItem}
                contacts={this.props.allContacts}
            />}

        </div>
    }

    render() {

        return (
            <div>
                <Divider/>
                <Search
                    searchText={this.props.searchText}
                    onChange={this.props.setSearchText}
                />
                {this.myContacts}
                {this.props.searchText && this.allContacts}
                {/*<div className="contact-list-load-more">*/}
                    {/*<RefreshIndicator*/}
                        {/*left={0}*/}
                        {/*top={0}*/}
                        {/*style={{*/}
                            {/*transform: 'translate(-50%, 0)',*/}
                            {/*left: '50%',*/}
                            {/*top: 0*/}
                        {/*}}*/}
                        {/*status="loading"*/}
                        {/*percentage={100}/>*/}
                {/*</div>*/}
            </div>
        );
    }
};