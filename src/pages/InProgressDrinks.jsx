import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CardRecipe from '../components/CardRecipe';
import FetchContext from '../context/FetchContext';
import { filterDrinksById } from '../services/Api';

function InProgressDrinks(props) {
  const {
    data,
    setData, setTypeFunc, setNameRecipes, setImgRecipes } = useContext(FetchContext);
  const { match: { params: { id } } } = props;

  const renderRecipe = () => {
    filterDrinksById(id).then((res) => setData(res));
  };

  return (
    <div>
      {setTypeFunc('cocktails')}
      {setNameRecipes('strDrink')}
      {setImgRecipes('strDrinkThumb')}
      {data.length === 0 && renderRecipe()}
      <CardRecipe id={ id } />
    </div>
  );
}

InProgressDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default InProgressDrinks;
