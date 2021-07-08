import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import store, { addRecipesDRLoading, setLoading } from '../../context/store';
import { getStorage } from '../../functions';
import { DRINKS, fetchAPI, FETCH_ID_D, FETCH_ID_M, MEALS } from '../../services';
import RenderDetails from '../components/RenderDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const [btnFinish, setBtnFinish] = useState(undefined);
  const { recipes: { loading, foods }, setRecipes } = useContext(store);

  const getDetailRecommendByID = async () => {
    if (foods === null) {
      setRecipes(setLoading(true));
    } else if (foods) {
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      const Drinks = await fetchAPI(DRINKS);
      setRecipes(addRecipesDRLoading(mealsDetails.meals[0], Drinks.drinks, false));
    } else {
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      const Meals = await fetchAPI(MEALS);
      setRecipes(addRecipesDRLoading(drinksDetails.drinks[0], Meals.meals, false));
    }
  };

  const checkBtnFinish = () => {
    const doneRecipeInLS = getStorage('doneRecipes');
    const inProgressInLS = getStorage('inProgressRecipes');

    const checkDoneRecipes = doneRecipeInLS.find((item) => item.id === id);
    const checkinProgress = Object.keys(inProgressInLS).length;
    // !checkcheckDoneRecipes &&  !checkinProgress: undefined = "Iniciar Receita"
    // checkcheckDoneRecipes : true = "Receita Feita" -> Desaparecer com o botão
    // checkcheckinProgress : true = "Receita Iniciada" -> Continuar receita

    if (checkDoneRecipes) {
      setBtnFinish(null); // receita está pronta = btnFinish : null // Desaparecer botão
    }
    if (checkinProgress) {
      setBtnFinish(true); // receita iniciada = btnFinish : true  // "Continuar Receita"
    }
    if (!checkinProgress && !checkDoneRecipes) {
      setBtnFinish(false); // receita não iniciada = btnFinish : false  // "Iniciar Receita"
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (loading) { getDetailRecommendByID(); } });
  useEffect(checkBtnFinish, []);

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <RenderDetails btnFinish={ btnFinish } id={ id } />
  );
}
