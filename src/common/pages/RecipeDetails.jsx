import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import store, { addRecipesDRLoading, setFetchOnDone,
  setDoneLoading } from '../../context/store';
import { getStorage } from '../../functions';
import { DRINKS, fetchAPI, FETCH_ID_D, FETCH_ID_M, MEALS } from '../../services';
import Loading from '../components/Loading';
import RenderDetails from '../components/RenderDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const [btnFinish, setBtnFinish] = useState(undefined);
  const { recipes: { fetchOn, loading, done, foods }, setRecipes } = useContext(store);

  const getDetailRecommendByID = async () => {
    const LOADING_TIME = 2500;
    const DONE_TIME = 1500;
    if (foods === null) {
      setRecipes(setFetchOnDone(true));
    } else if (foods) {
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      const Drinks = await fetchAPI(DRINKS);
      setTimeout(() => {
        setRecipes(addRecipesDRLoading(mealsDetails.meals[0], Drinks.drinks, true));
        setTimeout(() => {
          setRecipes(setDoneLoading(true));
        }, DONE_TIME);
      }, LOADING_TIME);
      setRecipes(setFetchOnDone(false));
    } else {
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      const Meals = await fetchAPI(MEALS);
      setTimeout(() => {
        setRecipes(addRecipesDRLoading(drinksDetails.drinks[0], Meals.meals, true));
        setTimeout(() => {
          setRecipes(setDoneLoading(true));
        }, DONE_TIME);
      }, LOADING_TIME);
      setRecipes(setFetchOnDone(false));
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

  useEffect(() => { if (fetchOn) { getDetailRecommendByID(); } });
  useEffect(checkBtnFinish, []);

  // ---------------------------------------------------------------------------------------------

  if (!done) { return (<Loading loading={ loading } />); }
  return (
    <RenderDetails btnFinish={ btnFinish } id={ id } />
  );
}
