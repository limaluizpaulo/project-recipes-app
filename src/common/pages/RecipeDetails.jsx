import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import store, { addRecDetail, addRecommended, setLoading } from '../../context/store';
import { DRINKS, fetchAPI, FETCH_ID_D, FETCH_ID_M, MEALS } from '../../services';
import RenderDetails from '../components/RenderDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const { recipes: { loading, foods }, setRecipes } = useContext(store);

  const getDetailRecommendByID = async () => {
    if (foods === null) {
      setRecipes(setLoading(true));
    } else if (foods) {
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      const Drinks = await fetchAPI(DRINKS);
      setRecipes(addRecDetail(mealsDetails.meals[0]));
      setRecipes(addRecommended(Drinks.drinks));
      setRecipes(setLoading(false));
    } else {
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      const Meals = await fetchAPI(MEALS);
      setRecipes(addRecDetail(drinksDetails.drinks[0]));
      setRecipes(addRecommended(Meals.meals));
      setRecipes(setLoading(false));
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (loading) getDetailRecommendByID(); });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <RenderDetails />
  );
}
