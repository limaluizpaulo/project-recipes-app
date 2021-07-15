import React, { useContext } from 'react';
import FoodDetails from '../components/foodDetailsPage/FoodDetails';
import FoodInProgressBtn from '../components/foodInProgress/FoodInProgressBtn';
import FoodInProgressList from '../components/foodInProgress/FoodInProgressList';
import '../styles/foodInProgress.css';
import loadingIcon from '../images/loading.gif';
import RecipeContext from '../context/Context';
import useFood from '../hooks/useFood';

const FoodInProgress = () => {
  const { selectedFood } = useContext(RecipeContext);
  useFood();
  if (!selectedFood) {
    return (
      <div className="foodInProgress__loading">
        <img src={ loadingIcon } alt="loading" />
      </div>
    );
  }
  return (
    <div className="foodInProgress">
      <FoodDetails>
        <FoodInProgressList />
      </FoodDetails>
      <FoodInProgressBtn />
    </div>
  );
};

export default FoodInProgress;
