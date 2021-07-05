import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import store, { } from '../../context/store';
// import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';
import RenderDetails from '../components/RenderDetails';

export default function RecipeDetails() {
  // const { id } = useParams();
  const { recipes: { loading } } = useContext(store);
  console.log(loading);

  // const getRecommended = async () => {
  //   if (foods === null) {
  //     setRecipes(setLoading(true));
  //   } else if (foods) {
  //     const Drinks = await fetchAPI(DRINKS);
  //     setRecipes(addRecommended(Drinks.drinks));
  //     setRecipes(setLoading(false));
  //   } else {
  //     const Meals = await fetchAPI(MEALS);
  //     setRecipes(addRecommended(Meals.meals));
  //     setRecipes(setLoading(false));
  //   }
  //   if (foods) {
  //     const Drinks = await fetchAPI(DRINKS);
  //     setRecipes(addRecommended(Drinks.drinks));
  //     setRecipes(setLoading(false));
  //   } else {
  //     const Meals = await fetchAPI(MEALS);
  //     setRecipes(addRecommended(Meals.meals));
  //     setRecipes(setLoading(false));
  //   }
  // };

  // const getRecipeDetailByID = async () => {
  //   if (foods === null) {
  //     setRecipes(setLoading(true));
  //   } else if (foods) {
  //     const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
  //     setRecipes(addRecDetail(mealsDetails.meals[0]));
  //     setRecipes(setLoading(false));
  //   } else {
  //     const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
  //     setRecipes(addRecDetail(drinksDetails.drinks[0]));
  //     setRecipes(setLoading(false));
  //   }
  // };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  // useEffect(() => { if (loading) getRecipeDetailByID(); });
  // useEffect(() => { if (loading) getRecommended(); });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <RenderDetails />
  );
}
