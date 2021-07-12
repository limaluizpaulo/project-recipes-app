import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
// import LikeButton from '../components/LikeButton';
// import ShareButton from '../components/ShareButton';
import CategoryButton from '../components/CategoryButton';
import { getStorage, setStorage, handleClickType } from '../../functions';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

const FAVORITE_RECIPES = 'favoriteRecipes';

export default function FavoriteRecipes() {
  // const [state, setState] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    () => getStorage('favoriteRecipes'),
  ); // pego o que tá no storage, e jogo nesse estado. Aí vou fazer o MAP nesse favoriteStorage

  const handleClickAll = () => setFavoriteRecipes(getStorage(FAVORITE_RECIPES));

  // aqui vai ser a função lá do passo 1
  // const setFavorited = (favorited) => (
  //   setState(favorited)
  // );

  // const favoriteMeal = (index, area, category) => (
  //   <h5
  //     data-testid={ `${index}-horizontal-top-text` }
  //   >
  //     { `${area} - ${category}`}
  //   </h5>
  // );

  // const favoriteDrink = (alcoholicOrNot, index) => (
  //   <h5 data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</h5>
  // );

  const handleLikeClick = (id) => {
    const newFavorites = favoriteRecipes.filter((fav) => fav.id !== id);
    setStorage('favoriteRecipes', newFavorites);
    setFavoriteRecipes(newFavorites);
  };

  // const renderFavorites = () => (
  //   favoriteRecipes.map((favorited, index) => (
  //     <div key={ index }>
  //       <img
  //         data-testid={ `${index}-horizontal-image` }
  //         src={ favorited.image }
  //         alt="card"
  //         width="150px"
  //       />
  //       { favorited.type === 'comida'
  //         ? favoriteMeal(index, favorited.area, favorited.category)
  //         : favoriteDrink(favorited.alcoholicOrNot, index) }

  //       <h1 data-testid={ `${index}-horizontal-name` }>{ favorited.name }</h1>
  //       <ShareButton id={ favorited.id } type={ favorited.type } index={ index } path />
  //       <LikeButton
  //         recipe
  //         captureFavorited={ setFavorited }
  //         clickFavBtn={ handleLikeClick }
  //         id={ favorited.id }
  //         favPage
  //         index={ index }
  //       />
  //     </div>
  //   ))
  // );

  useEffect(() => {
    setFavoriteRecipes(getStorage('favoriteRecipes'));
  }, [state]);

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      <CategoryButton
        foodOrDrink={ handleClickType }
        setState={ setFavoriteRecipes }
        clickAll={ handleClickAll }
        path={ FAVORITE_RECIPES }
      />
      {/* { renderFavorites() } */}
      { favoriteRecipes.map((recipe, i) => (
        <FavoriteRecipeCard
          recipe={ recipe }
          index={ i }
          handleLikeClick={ handleLikeClick }
          key={ i }
        />
      )) }
    </div>
  );
}

// passo 1 = criar a função que vai capturar o estado favorited(no likebutton)
// passo 2 = enviar essa função via props para o likebutton.
// passo 3 = no likebutton, eu faço a captura do estado favorited.
// passo 4 = Dentro dessa função, devo setar o estado da página(meu primeiro estado que chamei de ESTADO , no favoriteRecipes).
// uso o USEEFFECT pra puxar a atualização do local storage.       pathname vai o ESTADO, findlocation será a função q vou criar no passo 1                      useEffect(captureFavorited, [state]);
