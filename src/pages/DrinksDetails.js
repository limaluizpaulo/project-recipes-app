import React from 'react';
import PropTypes from 'prop-types';

import Details from '../components/Details/Details';

function DrinksDetails({ match: { params: { id } } }) {
  const MAX_RECOMMENDATIONS = 6;

  const recipe = useRecipeByID('drinks');
  const recommendations = useRecommendation('meals', MAX_RECOMMENDATIONS);

  return (
    <Details
      id={ id }
      recipe={ recipe }
      recommendations={ recommendations }
    />
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinksDetails;
