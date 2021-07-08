import React, { useContext } from 'react';
import CardRecipe from '../components/CardRecipe';
import FetchContext from '../context/FetchContext';
import { filterDrinksById } from '../services/Api';

function InProgressDrinks(props) {
  const { data, setData, setTypeFunc, setNameRecipes, setImgRecipes } = useContext(FetchContext);
  const { match: { params: { id } } } = props;

  const renderRecipe = () => {
    filterDrinksById(id).then((res) => setData(res));
  };

  const stateSet = () => {
    setTypeFunc('bebidas');
    setNameRecipes('strDrink');
    setImgRecipes('strDrinkThumb');
  } 

  return (
    <div>
      { stateSet() }
      { data.length === 0 && renderRecipe()}
       <CardRecipe  id={ id } />
    </div>
  );
}

export default InProgressDrinks;
