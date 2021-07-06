import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeHeaderList = ({ header }) => {
  const { index, alcoholicOrNot, area, category, type, id, name } = header;
  return (
    <div>
      <span data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot || `${area} - ${category}`}
      </span>
      <Link to={ `/${type}s/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
    </div>
  );
};

RecipeHeaderList.propTypes = {
  header: PropTypes.shape().isRequired,
};

export default RecipeHeaderList;
