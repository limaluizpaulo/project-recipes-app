import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import pathTreament from '../helpers/HelperFunctions';

export default function Card(props) {
  const { id, thumbnail, title, index, category, hidden } = props;
  const { pathname } = useLocation();
  const dataTestId = (category) ? `${index}-recomendation-card` : `${index}-recipe-card`;
  const dataTestIdTitle = (category) ? `${index}-recomendation-title`
    : `${index}-card-name`;
  const newPathname = pathTreament(pathname);

  return (
    <Link
      to={ `${newPathname}/${id}` }
      data-testid={ dataTestId }
      hidden={ hidden }
    >
      <img
        src={ thumbnail }
        alt={ title }
        data-testid={ `${index}-card-img` }
        id={ index }
        width="150"
      />
      {category && (<span>{category}</span>)}
      <span data-testid={ dataTestIdTitle }>{title}</span>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};
