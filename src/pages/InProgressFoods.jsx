import React, { useContext, useEffect } from 'react';
import FetchContext from '../context/FetchContext';
import { filterMealsById } from '../services/Api';
import CardRecipe from '../components/CardRecipe';

function InProgressFoods(props) {
  const { data, setData, setTypeFunc, setNameRecipes, setImgRecipes} = useContext(FetchContext);
  const { match: { params: { id } } } = props;

  const renderRecipe = () => {
    filterMealsById(id).then((res) => setData(res));
  };

  const stateSet = () => {
    setTypeFunc('comidas')
    setImgRecipes('strMealThumb');
    setNameRecipes('strMeal');
  } 

  return (
    <div>
      { stateSet() }
      { data.length === 0 && renderRecipe() }
      <CardRecipe  id={ id } />
    </div>
  );
}

export default InProgressFoods;
