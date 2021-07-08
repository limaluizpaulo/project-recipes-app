import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';

import HeaderDetails from '../components/HeaderDetails';
import IngredientsDetails from '../components/IngredientsDetails';
import InstructionsDetails from '../components/InstructionsDetails';
import Recommended from '../components/Recommended';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import '../styles/reset.css';
import { PageDetails } from '../styles/Details';

function DrinkDetail() {
  const { id } = useParams();
  const {
    drinkDetails,
    setDrinkDetails,
    fetchDrinksById,
    setIngredientsDrink,
  } = useContext(DrinksContext);

  const [load, setLoad] = useState(true);

  const drink = useCallback(async () => {
    const fetch = await fetchDrinksById(id);
    setDrinkDetails(fetch[0]);
    setLoad(false);
  }, [fetchDrinksById, id, setDrinkDetails]);

  useEffect(() => {
    drink();
    return (
      setDrinkDetails([])
    );
  }, [drink, setDrinkDetails]);

  useEffect(() => {
    const SIZE = -1;
    const keysIngredients = Object.keys(drinkDetails)
      .map((key) => (key.indexOf('strIngredient') > SIZE ? drinkDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const quantity = Object.keys(drinkDetails)
      .map((key) => (key.indexOf('strMeasure') > SIZE ? drinkDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const full = quantity.map((item, index) => `${item} ${keysIngredients[index]}`);

    setIngredientsDrink(full);
  }, [drinkDetails, setIngredientsDrink]);
  return !load ? (
    <PageDetails>
      <HeaderDetails />
      <main>
        <IngredientsDetails />
        <InstructionsDetails />
        <Recommended />
      </main>
      <ButtonStartRecipe id={ id } />
    </PageDetails>
  ) : <h1>Loading</h1>;
}

export default DrinkDetail;
