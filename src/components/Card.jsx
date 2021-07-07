import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import pathTreament from '../helpers/HelperFunctions';

export default function Card(props) {
  // const history = useHistory();
  const { id, thumbnail, title, index, category } = props;
  const { pathname } = useLocation();
  const dataTestId = (category) ? `${index}-recomendation-card` : `${index}-recipe-card`;
  const newPathname = pathTreament(pathname);
  return (
    <Link to={ `${newPathname}/${id}` } data-testid={ dataTestId }>
      {/* <button
      data-testid={ dataTestId }
      type="button"
      onClick={ () => {
        history.push(`${newPathname}/${id}`);
      } }
    > */}
      <img src={ thumbnail } alt={ title } data-testid={ `${index}-card-img` } />
      {category && (<span>{category}</span>)}
      <span data-testid={ `${index}-card-name` }>{title}</span>
      {/* </button> */}
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
