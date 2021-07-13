import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';
import { filterMealsById } from '../services/Api';
import CardRecipe from '../components/CardRecipe';

function InProgressFoods(props) {
  const {
    data,
    setData, setTypeFunc, setNameRecipes, setImgRecipes } = useContext(FetchContext);
  const { match: { params: { id } } } = props;

  const renderRecipe = () => {
    filterMealsById(id).then((res) => setData(res));
  };

  return (
    <div>
      {setTypeFunc('meals')}
      {setImgRecipes('strMealThumb')}
      {setNameRecipes('strMeal')}
      { data.length === 0 && renderRecipe() }
      <CardRecipe id={ id } />
    </div>
  );
}

InProgressFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default InProgressFoods;
