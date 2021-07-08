import React from 'react';
import PropTypes from 'prop-types';

import Details from '../components/Details/Details';
import useRecipeByID from '../hooks/useRecipeByID';
import useRecommendation from '../hooks/useRecommendation';

function MealsDetails({ match: { params: { id } } }) {
  const MAX_RECOMMENDATIONS = 6;

  const recipe = useRecipeByID('meals', 'strMeals');
  const recommendations = useRecommendation('drinks', MAX_RECOMMENDATIONS, 'strDrinks');

  return (
    <Details
      id={ id }
      recipe={ recipe }
      recommendations={ recommendations }
    />
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
