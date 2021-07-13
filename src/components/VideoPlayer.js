import React from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({ videoLink, testID, recipeTitle }) {
  return (
    <div className="video-player">
      <iframe
        data-testid={ testID }
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
        frameBorder="0"
        width="853"
        height="480"
        src={ videoLink }
        title={ recipeTitle }
      />
    </div>
  );
}
VideoPlayer.propTypes = {
  videoLink: PropTypes.string,
  testID: PropTypes.string,
  recipeTitle: PropTypes.string,
}.isRequired;

export default VideoPlayer;
