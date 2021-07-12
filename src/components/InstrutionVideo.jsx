import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import identification from '../helper/dictionaryApi';

class InstrutionVideo extends Component {
  render() {
    const { data } = this.props;
    const keyName = identification(data);
    return (
      <section>
        <h3>Video</h3>
        <section className="video">
          <ReactPlayer
            controls
            data-testid="video"
            url={ data[keyName.Youtube] }
            width="100%"
            height="100%"
          />
        </section>
      </section>
    );
  }
}

InstrutionVideo.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default InstrutionVideo;
