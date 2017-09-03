import React, { Component } from 'react';
import GroupAddIcon from 'material-ui/svg-icons/social/group-add';
import ImportExportIcon from 'material-ui/svg-icons/communication/import-export';
import { connect } from 'react-redux';
import { ListItem, RaisedButton, List, Divider, Subheader, IconButton } from 'material-ui';

import CreateGroupForm from './CreateGroupForm/index';
import './style.sass';
import { createChat, fetchGroups, openChatMessages, importGroupsXlsx } from '../../actions/groups';
import SortedList from '../SortedList/index';
import ImportGroupModal from './ImportGroupModal/index';

@connect(
    state => ({
        groups: state.groups,
        contacts: state.contacts.connected,
        user: state.user
    }),
    {
        fetchGroups,
        createChat,
        openChatMessages,
        importGroupsXlsx,
    }
)
export default class Groups extends Component {

    static propTypes = {};

    state = {
        isNewMode: false,
        isEditMode: false,
        isImportMode: false

    };

    componentDidMount() {
        this.props.fetchGroups();
    }

    openAddMode() {
        this.setState({
            isNewMode: true
        })
    }

    openImportMode() {
        this.setState({
            isImportMode: true
        })
    }

    close() {
        this.setState({
            isNewMode: false,
            isEditMode: false,
            isImportMode: false
        })
    }

    import(...args) {
        this.props.importGroupsXlsx(...args);
        this.close();
    }

    createGroup(...args) {
        this.props.createChat(...args);
        this.close();
    }

    render() {
        let groups = this.props.groups.all.map(id => this.props.groups.byIds[id]);

        return <div className="groups-container">
            <div className="create-group-container">
                {this.state.isNewMode
                    ? <CreateGroupForm
                        contacts={this.props.contacts}
                        onClose={::this.close}
                        onSave={::this.createGroup}
                    />
                    : <div className="create-group-buttons">
                        <RaisedButton
                            label="New"
                            fullWidth={true}
                            primary={true}
                            icon={<GroupAddIcon/>}
                            onClick={::this.openAddMode}
                        />
                        {
                            this.props.user.role === 2 &&
                            <IconButton tooltip="Import" onClick={::this.openImportMode}>
                                <ImportExportIcon/>
                            </IconButton>
                        }
                    </div>
                }
                <ImportGroupModal
                    isOpen={this.state.isImportMode}
                    onClose={::this.close}
                    onImport={::this.import}
                />
            </div>
            <Divider/>
            <Subheader>My groups({this.props.groups.all.length})</Subheader>
            <SortedList
                values={groups}
                onClick={this.props.openChatMessages}
                displayTextProperty="name"/>
        </div>
    }
}