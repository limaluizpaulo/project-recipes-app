import React, { useContext } from 'react';
import FoodDetails from '../components/foodDetailsPage/FoodDetails';
import FoodInProgressBtn from '../components/foodInProgress/FoodInProgressBtn';
import FoodInProgressList from '../components/foodInProgress/FoodInProgressList';
import '../styles/foodInProgress.css';

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
      <FoodDetails>
        <FoodInProgressList />
      </FoodDetails>
      <FoodInProgressBtn />
    </div>
  );
};

export default FoodInProgress;
