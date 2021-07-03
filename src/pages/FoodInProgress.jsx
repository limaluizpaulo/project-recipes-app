import React, { useContext } from 'react';
import FoodDetails from '../components/FoodDetails';

import RecipeContext from '../context/Context';
import useFood from '../hooks/useFood';

const FoodInProgress = () => {
  const { selectedFood } = useContext(RecipeContext);
  useFood();
  if (!selectedFood) {
    return (
      <p>loading</p>
    );
  }
  return (
    <div>
      <FoodDetails />
    </div>
  );
};

export default FoodInProgress;
