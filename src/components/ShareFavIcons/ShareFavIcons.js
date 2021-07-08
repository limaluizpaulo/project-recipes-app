import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import IconButton from '../IconButton/IconButton';

const copy = require('clipboard-copy');

function ShareFavIcons(
  { isFav, shareCopyLocation, favSave, recipe, shareSetCopyLocation },
) {
  return (
    <>
      <IconButton
        onClick={ () => {
          copy(`http://localhost:3000${shareCopyLocation}`);
          shareSetCopyLocation(true);
        } }
        dataTest="share-btn"
        src={ shareIcon }
        alt="Share Icon"
      />
      {
        isFav
          ? (
            <IconButton
              onClick={
                () => favSave(recipe, !isFav)
              }
              dataTest="favorite-btn"
              src={ blackHeartIcon }
              alt="Favorited"
            />
          )
          : (
            <IconButton
              onClick={
                () => favSave(recipe, !isFav)
              }
              dataTest="favorite-btn"
              src={ whiteHeartIcon }
              alt="Not Favorited"
            />
          )
      }
    </>
  );
}

ShareFavIcons.propTypes = {
  isFav: PropTypes.bool.isRequired,
  shareCopyLocation: PropTypes.string.isRequired,
  favSave: PropTypes.func.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  shareSetCopyLocation: PropTypes.func.isRequired,
};

export default ShareFavIcons;
