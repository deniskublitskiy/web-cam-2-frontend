import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import AttachFileIcon from 'material-ui/svg-icons/editor/attach-file';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

export default class ChatAttachments extends Component {
    attachFile() {
        this.refs.attachFileInput.click();
    }

    uploadClickHandler(e) {
        let {files} = e.target;
        if (files.length === 0) {
            return;
        }
        this.uploadAttachments(files);
    }

    uploadAttachments(files = new FileList()) {
        [].forEach.call(files, file => {
            let reader = new FileReader();
            reader.onloadend = e => {
            };
            reader.readAsDataURL(file);
        });
    }

    render() {
        return <div>
            <IconButton tooltip="Attach file" tooltipPosition="bottom-center" touch={true}>
                <AttachFileIcon onClick={::this.attachFile}/>
            </IconButton>
            <IconButton tooltip="Attach image" tooltipPosition="bottom-center" touch={true}>
                <AddPhotoIcon/>
                <input
                    ref="attachFileInput"
                    type="file"
                    multiple={true}
                    hidden={true}
                    onChange={::this.uploadClickHandler}
                />
            </IconButton>
        </div>;
    }
};