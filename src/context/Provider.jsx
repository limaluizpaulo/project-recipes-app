import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import { apiRequestMeal, apiRequestDrink } from '../services/helpers/apiServises';
import messageAlert from '../services/helpers/alertMessage';

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [radioValue, setValueRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pathname, setPathname] = useState('');
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');
  const [selectedFood, setSelectedFood] = useState();
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    async function setDataRecipes() {
      const NUMBER_RENDER = 12;
      let response;

      if (pathname === '/comidas') {
        response = await apiRequestMeal(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }
      if (pathname === '/bebidas') {
        response = await apiRequestDrink(radioValue, inputValue) || [];
        setData(response.slice(0, NUMBER_RENDER));
      }

      if (response && response.length === 0) {
        messageAlert(alert,
          'Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    if (pathname) {
      setDataRecipes();
    }
  }, [radioValue, inputValue, pathname]);

  const createObjectFromFood = () => {
    const {
      idMeal,
      idDrink,
      strCategory,
      strAlcoholic,
      strArea,
      strMeal,
      strDrink,
      strDrinkThumb,
      strMealThumb,
    } = selectedFood;

    return ({
      id: idMeal || idDrink,
      type: idMeal ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strDrinkThumb || strMealThumb,
    });
  };
  const objContext = {
    selectedFood,
    setSelectedFood,
    createObjectFromFood,
    data,
    setData,
    setValueRadio,
    setInputValue,
    setPathname,
    inputValue,
    radioValue,
    selectedTypeItem,
    setSelectedTypeItem,
    ingredients,
    setIngredients,
  };
  return (
    <RecipeContext.Provider value={ objContext }>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
