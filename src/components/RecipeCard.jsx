import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RecipeContext from '../context';
// import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RecipeCard({ recipe: { id, name, image }, index }) {
  const { pathname } = useLocation();
  const path = pathname.includes('comidas') ? '/comidas' : '/bebidas';
  const { setIdDetail } = useContext(RecipeContext);

  return (
    <Link
      to={ `${path}/${id}` }
      onClick={ () => setIdDetail(id) }
      style={ { width: '48%' } }
      className="my-1"
    >
      <Card>
        <Card.Img
          variant="top"
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body className="py-1 d-flex justify-content-center">
          <Card.Title
            className="text-center"
            data-testid={ `${index}-card-name` }
          >
            {name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
