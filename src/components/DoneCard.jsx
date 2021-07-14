import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { pathTreament } from '../helpers/HelperFunctions';
import shareIcon from '../images/shareIcon.svg';

export default function DoneCard(props) {
  const { id, thumbnail, title, index, category = '',
    hidden = false, className, doneDate, url, tags } = props;
  // const { pathname } = useLocation();
  const dataTestId = (category) ? `${index}-recomendation-card` : `${index}-recipe-card`;
  // const dataTestIdTitle = (category) ? `${index}-recomendation-title`
  //   : `${index}-card-name`;
  const newPathname = url && pathTreament(url);
  const hide = hidden ? 'hidden' : '';
  const [shareCopy, setShareCopy] = useState(false);

  const handleClickShare = async () => {
    await copy(newPathname);
    setShareCopy(true);

    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      setShareCopy(false);
    }, FIVE_SECONDS);
  };

  return (
    <Link
      to={ `${newPathname}/${id}` }
      data-testid={ dataTestId }
      hidden={ hidden }
      className={ `${className} ${hide}` }
    >
      <img
        src={ thumbnail }
        className="recipe-card-thumb"
        alt={ title }
        data-testid={ `${index}-horizontal-image` }
        id={ index }
        width="150"
      />
      <div className="actions">
        { shareCopy && (<p>Link copiado!</p>) }
        <button type="button" onClick={ handleClickShare }>
          <img
            src={ shareIcon }
            alt="Share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {/* <button type="button">
            <img src={ whiteHeartIcon } alt="Favorite" data-testid="favorite-btn" />
          </button> */}
      </div>
      <span
        data-testId={ `${index}-horizontal-top-text` }
        className="subtitle"
      >
        {category}
      </span>
      <span
        data-testid={ `${index}-horizontal-name` }
        className="recipe-card-title"
      >
        {title}
      </span>
      <span data-testid={ `${index}-horizontal-done-date` }>
        Feita em
        {' '}
        {doneDate}
      </span>
      <span>
        {tags.map((tag, i) => (
          <tag
            data-testid={ `${i}-${tag}-horizontal-tag` }
            key={ `${tag}-${id}` }
          >
            {tag}
          </tag>))}
      </span>
    </Link>
  );
}

DoneCard.propTypes = {
  tags: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};
