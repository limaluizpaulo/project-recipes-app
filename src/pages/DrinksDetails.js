import React from 'react';
import PropTypes from 'prop-types';

import Details from '../components/Details/Details';

function DrinksDetails({ match: { params: { id } } }) {
  return (
    <Details id={ id } mealsOrDrinks="drinks" />
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
