import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DetailsContext from '../context/details.context';

function DetailsProvider({ children }) {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const shared = {
    details,
    setDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  };

  useEffect(() => {
    const formattedIngredients = Object.entries(details)
      .filter((item) => item[0].includes('Ingredient') && item[1])
      .map((item) => item[1]);
    setIngredients(formattedIngredients);

    const formattedMeasures = Object.entries(details)
      .filter((item) => item[0].includes('Measure') && item[1])
      .map((item) => item[1]);
    setMeasures(formattedMeasures);
  }, [details]);

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
