import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List/index';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import './style.sass';
import { Avatar, IconButton, IconMenu } from 'material-ui';
import { pinkA200, transparent } from 'material-ui/styles/colors';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="Actions"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon/>
    </IconButton>
);

const rightIconMenu = (menu, id) =>
    <IconMenu iconButtonElement={iconButtonElement}>
        {menu(id)}
    </IconMenu>
;

export default class ContactList extends Component {

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
        let shortCut = text.match(/[A-Z,А-Я]/g);
        return shortCut ? shortCut.join('') : '';
    }

    render() {
        let contacts = this.props.contacts || [];
        contacts = contacts
            .sort(this.props.sortFunc)
            .map((contact, i, array) => {
                let isHasStartLetter =
                    i === 0 || array[i - 1].fullName.charAt(0) !== contact.fullName.charAt(0);
                return <div key={i}>
                    {isHasStartLetter && i !== 0 && <Divider inset={true}/>}
                    <ListItem
                        innerDivStyle={{paddingLeft: 100}}
                        primaryText={contact.fullName}
                        secondaryText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem deserunt dignissimos ducimus eaque eveniet excepturi exercitationem ipsa ipsam itaque laudantium, minima mollitia nihil nobis non numquam perspiciatis provident quisquam soluta, tenetur unde ut voluptate. Necessitatibus nisi provident quia repudiandae sit tenetur. Eligendi iusto molestias quasi saepe similique. Ab alias amet aperiam asperiores, aspernatur consectetur dolore eaque earum enim error eum facere impedit ipsam magni minima minus necessitatibus nisi nobis nostrum numquam odit officia porro provident, quas qui quia quod reiciendis sit suscipit voluptate? Alias animi dicta distinctio illo inventore iure magnam necessitatibus quas sed suscipit. Deleniti quibusdam sequi velit."
                        insetChildren={true}
                        rightIconButton={this.props.menu && rightIconMenu(this.props.menu, contact.id)}
                        leftAvatar={
                            <div style={{left: 46}}>
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
                            </div>
                        }
                        leftIcon={
                            isHasStartLetter ?
                                <Avatar
                                    style={{
                                        paddingTop: 5
                                    }}
                                    backgroundColor={transparent}
                                    color={pinkA200}
                                >
                                    {contact.fullName.charAt(0)}
                                </Avatar>
                                : null
                        }
                    />
                </div>;
            });

        return <List>{contacts}</List>
    }
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    menu: PropTypes.func,
    sortFunc: PropTypes.func
};