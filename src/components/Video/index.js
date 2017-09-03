import React, { Component } from 'react';

import VideoContainer from './VideoContainer/index';
import './style.sass';
import { connect } from 'react-redux';
import VideoControls from './VideoControls/index';
import { endCall, startCallingRequest } from '../../actions/call';

@connect(
    state => ({
        videos: state.videos,
        chat: state.groups.current,
        isCall: state.call.isCall
    }),
    {
        onCallClick: startCallingRequest,
        endCall
    }
)
export default class Video extends Component {
    static propTypes = {};

    onCall() {
        this.props.onCallClick(this.props.chat.id);
    }

    onEndCall() {
        this.props.endCall(this.props.chat.id);
    }

    render() {
        let videos = this.props.videos.map((video, index) =>
            <VideoContainer key={index} src={video.src}/>
        );
        return <div className="video-component">
            <div className="videos-container">
                {videos}
            </div>
            <div className="video-controls-container">
                <VideoControls
                    onCallClick={::this.onCall}
                    isCallDisabled={this.props.isCall}
                    onEndCallClick={::this.onEndCall}
                    isCallEndDisabled={!this.props.isCall}
                />
            </div>
        </div>
    }
}