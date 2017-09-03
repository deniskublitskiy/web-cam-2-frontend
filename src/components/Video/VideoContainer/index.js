import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Paper, Slider } from 'material-ui';

import './style.sass';

export default class VideoContainer extends Component {
    static propTypes = {};

    state = {
        src: '',
        isLoading: true
    };

   onloadedmetadata() {
        this.setState({
            isLoading: false
        })
    }

    render() {
        return <Paper className="video-container-component-wrap">
            <div className="video-container-component">
                {this.state.isLoading && <CircularProgress className="loader"/>}
                <video
                    ref="video"
                    autoPlay
                    src={this.props.src}
                    onLoadedMetadata={::this.onloadedmetadata}
                    controls={true}
                >
                    Video stream not available.
                </video>
                {/*<div className="video-controls">*/}
                    {/*<Slider className="video-volume-slider"/>*/}
                {/*</div>*/}
            </div>
        </Paper>;

    }
}