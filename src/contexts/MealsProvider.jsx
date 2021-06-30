import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import { getMealsCategories } from '../helpers/MealsAPI';

function MealsProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);

  useEffect(() => {
    const categories = async () => {
      const results = await getMealsCategories();
      setMealsCategories(results);
    };
    categories();
  }, []);

  const context = { mealsCategories };
  return (
    <MealsContext.Provider value={ context }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
