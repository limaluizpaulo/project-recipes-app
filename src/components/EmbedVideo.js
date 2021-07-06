import React from 'react';
import PropTypes from 'prop-types';

function EmbedVideo(props) {
  const { value } = props;
  if (value) {
    return (
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ value.url }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
      />
    );
  }
  return (
    <div data-testid="video">
      No video found for this recipe.
      <br />
    </div>
  );
}

EmbedVideo.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EmbedVideo;
