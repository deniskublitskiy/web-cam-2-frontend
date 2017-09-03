import React, { Component } from 'react';
import { FloatingActionButton, IconButton, Paper } from 'material-ui';
import CallIcon from 'material-ui/svg-icons/communication/call'
import CallEndIcon from 'material-ui/svg-icons/communication/call-end'

import './style.sass';
import { white } from 'material-ui/styles/colors';

const callButtonIconStyle = {fill: 'green'};
const callEndButtonIconStyle = {fill: 'red'};

export default class VideoControls extends Component {
    render() {
        return <Paper>
                <div className="video-controls-panel">
                    <IconButton backgroundColor={white}
                                iconStyle={callButtonIconStyle}
                                tooltip="Call" touch={true}
                                tooltipPosition="bottom-center"
                                disabled={this.props.isCallDisabled}
                                disableTouchRipple={true}
                                onClick={this.props.onCallClick}
                    >
                        <CallIcon />
                    </IconButton>
                    <IconButton backgroundColor={white}
                                iconStyle={callEndButtonIconStyle}
                                tooltip="End call" touch={true}
                                tooltipPosition="bottom-center"
                                disabled={this.props.isCallEndDisabled}
                                disableTouchRipple={true}
                                onClick={this.props.onEndCallClick}
                    >
                        <CallEndIcon />
                    </IconButton>
                    {/*<div className="video-controls-connection-time">*/}
                        {/*10:10*/}
                    {/*</div>*/}
                </div>
            </Paper>
    }
}