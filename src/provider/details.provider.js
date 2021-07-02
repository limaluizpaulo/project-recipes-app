import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailsContext from '../context/details.context';

function DetailsProvider({ children }) {
  const [detailsFavoriteDrinks, setDetailsFavoriteDrinks] = useState([]);
  const [detailsFavoriteMeals, setDetailsFavoriteMeals] = useState([]);

  const shared = {
    detailsFavoriteDrinks,
    setDetailsFavoriteDrinks,
    detailsFavoriteMeals,
    setDetailsFavoriteMeals,
  };

  return (
    <DetailsContext.Provider value={ { ...shared } }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
