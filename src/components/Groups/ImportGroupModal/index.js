import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton, TextField } from 'material-ui/';
import { IconButton, RaisedButton } from 'material-ui';

import XlsxFileFormat from '../../SVGIcons/fileformats/xlsx';
import XlsFileFormat from '../../SVGIcons/fileformats/xls';
import CsvFileFormat from '../../SVGIcons/fileformats/csv';

import './style.sass';
import { green500, pink500 } from 'material-ui/styles/colors';
import FileUploadInput from '../../FileUploadInput/index';

export default class ImportGroupModal extends Component {

    static propTypes = {
        onImport: PropTypes.func
    };

    static defaultProps = {
        isOpen: false,
        onImport: () => {}
    };

    async readAsDataUrls(files) {
        let urls = await FileUploadInput.readAsDataUrls(files);
        this.setState({
            file: urls[0]
        });
    };

    onImport() {
        this.props.onImport(this.state.file);
    }

    getActions(actions) {
        return actions.map((action, i) =>
            <FileUploadInput
                key={i}
                accept={action.accept}
                multiple={true}
                onUploaded={::this.readAsDataUrls}
            >
                <IconButton
                    style={{height: 72, width: 72, padding: 16}}
                    iconStyle={{width: 36, height: 36, color: green500}}
                    className="file-format-svg"
                    disabled={i !== 0}
                    tooltip={action.tooltip}
                    tooltipPosition="bottom-center"
                >
                    {action.element}
                </IconButton>
            </FileUploadInput>
        );
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                default={true}
                onClick={this.props.onClose}
            />,
            <RaisedButton
                label="Import"
                primary={true}
                onClick={::this.onImport}
            />
        ];

        return <Dialog
            title="Import groups"
            actions={actions}
            modal={true}
            open={this.props.isOpen}
            contentStyle={{width: 300}}
            actionsContainerClassName="modal-actions-center"
        >
            <div className="import-group-file-type-container">
                {this.getActions([
                    {element: <XlsxFileFormat/>, accept: '.xlsx', tooltip: "Excel(.xlsx)"},
                    {element: <XlsFileFormat/>, accept: '.xls', tooltip: "Excel(.xls)"},
                    {element: <CsvFileFormat/>, accept: 'csv', tooltip: "CSV"}
                ])}
            </div>
        </Dialog>
    }
}