import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FloatingActionButton, TextField } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { debounce } from 'lodash';

import './style.sass';

export default class Search extends Component {

    onChangeDebounce = debounce(this.props.onChange, 500, {
        leading: false
    });

    onChange(e) {
        this.onChangeDebounce(e.target.value);
    }

    render() {
        return <div className="contact-search-form">
            <TextField
                onChange={::this.onChange}
                floatingLabelText="Search"
                defaultValue={this.props.searchText}
            />
            <FloatingActionButton
                mini={true}
                secondary={true}
            >
                <ActionSearch/>
            </FloatingActionButton>
        </div>
    }
}

Search.propTypes = {
    onChange: PropTypes.func,
    searchText: PropTypes.string
};