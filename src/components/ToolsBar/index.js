import React, { Component } from 'react';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const menu = <IconMenu
    iconButtonElement={
        <IconButton>
            <MoreVertIcon />
        </IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
>
    <MenuItem primaryText="Sign out"/>
</IconMenu>;

export default class Groups extends Component {

    static propTypes = {};

    render() {
        return <AppBar
            iconElementRight={menu}
        />
    }
}