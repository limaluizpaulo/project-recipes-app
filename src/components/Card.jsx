import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import pathTreament from '../helpers/HelperFunctions';
import RecipesContext from '../contexts/RecipesContext';

export default function Card(props) {
  const history = useHistory();
  const { setIdRecipe, idRecipe } = useContext(RecipesContext);
  const { id, thumbnail, title, index, category } = props;
  const { pathname } = useLocation();
  const dataTestId = (category) ? `${index}-recomendation-card` : `${index}-recipe-card`;
  const newPathname = pathTreament(pathname);
  return (
    // <Link to={ `${newPathname}/${id}` }>
    <button
      data-testid={ dataTestId }
      type="button"
      onClick={ () => {
        setIdRecipe(id);
        history.push(`${newPathname}/${id}`);
      } }
    >
      <img src={ thumbnail } alt={ title } data-testid={ `${index}-card-img` } />
      {category && (<span>{category}</span>)}
      <span data-testid={ `${index}-card-name` }>{title}</span>
    </button>
    // </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
