import React from 'react';
import PropTypes from 'prop-types';

import Details from '../components/Details/Details';

function MealsDetails({ match: { params: { id } } }) {
  return (
    <Details id={ id } mealsOrDrinks="meals" />
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
