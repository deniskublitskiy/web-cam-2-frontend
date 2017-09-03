import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FileUploadInput extends Component {

    static propTypes = {
        /**
         * file_extension|audio/*|video/*|image/*|media_type
         */
        accept: PropTypes.string,
        children: PropTypes.node.isRequired,
        multiple: PropTypes.bool,
        onUploaded: PropTypes.func.isRequired
    };

    static defaultProps = {
        accept: '',
        multiple: false
    };

    static readAsDataUrls(files) {
        return new Promise((resolve, reject) => {
            let result = [];
            [].forEach.call(files, file => {
                let reader = new FileReader();
                reader.onerror = reject;
                reader.onloadend = e => {
                    result.push(e.target.result);
                    if (result.length === files.length) {
                        resolve(result);
                    }
                };
                reader.readAsDataURL(file);
            })
        })
    }

    openUploadDialog() {
        this.refs.fileInput.click();
    };


    upload(e) {
        this.props.onUploaded(e.target.files);

    }

    render() {
        let childrenWithProps = React.cloneElement(
            React.Children.only(this.props.children), {
                onClick: ::this.openUploadDialog
            });

        return <div>
            {childrenWithProps}
            <input
                type="file"
                accept={this.props.accept}
                hidden={true}
                ref="fileInput"
                multiple={this.props.multiple}
                onChange={::this.upload}
            />
        </div>;
    }
}