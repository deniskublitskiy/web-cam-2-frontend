import React from 'react';
import Drawer from 'material-ui/Drawer';
import { FontIcon, Tab, Tabs } from 'material-ui';

import Contacts from '../Contacts';
import Profile from '../Profile';
import Groups from '../Groups';

const SideBar = ({}) => (
    <Drawer
        open={true}
        width={300}
    >
        <Profile/>
        <Tabs width={200}>
            <Tab
                label="Contacts"
                icon={<FontIcon className="material-icons">contact_mail</FontIcon>}
            >
                <Contacts/>
            </Tab>
            <Tab
                label="Groups"
                icon={<FontIcon className="material-icons">people_outline</FontIcon>}
            >
                <Groups/>
            </Tab>
        </Tabs>
    </Drawer>
);

export default SideBar;
