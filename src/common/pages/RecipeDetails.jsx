import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import store, { addRecommended, setLoading } from '../../context/store';
import { DRINKS, fetchAPI, MEALS } from '../../services';
import RenderDetails from '../components/RenderDetails';

// import RecipeIngredients from '../components/RecipeIngredients';
// import LikeButton from '../components/LikeButton';
// import ShareButton from '../components/ShareButton';
// import RecommendedRecipes from '../components/RecommendedRecipes';

export default function RecipeDetails() {
  const { recipes: { loading, foods }, setRecipes } = useContext(store);

  // const renderRecipe = () => (
  //   <div>
  //     <img
  //       data-testid="recipe-photo"
  //       src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
  //       alt="recipe-img"
  //       width="350px"
  //     />
  //     <div>
  //       <div className="titleButtons">
  //         <h1 data-testid="recipe-title">
  //           { recipeDetail.strMeal || recipeDetail.strDrink }
  //         </h1>
  //         <span className="likeShareBtns">
  //           <ShareButton />
  //           <LikeButton recipe={ recipeDetail } />
  //         </span>
  //       </div>
  //       <h5 data-testid="recipe-category">
  //         Categoria:
  //         { recipeDetail.strCategory }
  //       </h5>
  //     </div>
  //     <div>
  //       <h3>Ingredientes</h3>
  //       <RecipeIngredients Details />
  //     </div>
  //     <div>
  //       <h3>Instruções</h3>
  //       <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
  //     </div>
  //     {(foods) ? (
  //       <div>
  //         <h3>Vídeo</h3>
  //         <iframe
  //           title="recipeVideo"
  //           data-testid="video"
  //           width="560"
  //           height="315"
  //           frameBorder="0"
  //           allowFullScreen
  //           allow="autoplay; encrypted-media"
  //           src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
  //         />
  //       </div>
  //     ) : ('')}
  //     <div>
  //       <h3>Receitas Recomendadas</h3>
  //       <RecommendedRecipes />
  //     </div>
  //     <Link
  //       to={ (foods) ? (
  //         `/comidas/${recipeDetail.idMeal}/in-progress`) : (
  //         `/bebidas/${recipeDetail.idDrink}/in-progress`) }
  //     >
  //       <button
  //         type="button"
  //         data-testid="start-recipe-btn"
  //       >
  //         Iniciar Receita
  //       </button>
  //     </Link>
  //   </div>
  // );

  const getRecommended = async () => {
    if (foods === null) {
      setRecipes(setLoading(true));
    } else if (foods) {
      const Drinks = await fetchAPI(DRINKS);
      setRecipes(addRecommended(Drinks.drinks));
      setRecipes(setLoading(false));
    } else {
      const Meals = await fetchAPI(MEALS);
      setRecipes(addRecommended(Meals.meals));
      setRecipes(setLoading(false));
    }
    if (foods) {
      const Drinks = await fetchAPI(DRINKS);
      setRecipes(addRecommended(Drinks.drinks));
      setRecipes(setLoading(false));
    } else {
      const Meals = await fetchAPI(MEALS);
      setRecipes(addRecommended(Meals.meals));
      setRecipes(setLoading(false));
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { if (loading) getRecommended(); });

  // ---------------------------------------------------------------------------------------------

  if (loading) return (<h5>Loading...</h5>);
  return (
    <RenderDetails />
    // <div />
  );
}
