import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import CategoryButton from '../components/CategoryButton';
import { getStorage } from '../../functions';

export default function FavoriteRecipes() {
  const [state, setState] = useState(false);
  const [favoriteStorage,
    setFavoriteStorage] = useState(() => getStorage('favoriteRecipes')); // pego o que tá no storage, e jogo nesse estado. Aí vou fazer o MAP nesse favoriteStorage

  const handleClickCategory = () => console.log('handleClickCategory'); // esse consoles.log e o de baixo foram apenas pra poder chamar certinho lá no CategoryButton.
  const getRecipes = () => console.log('getRecipes');

  // aqui vai ser a função lá do passo 1
  const setFavorited = (favorited) => (
    setState(favorited)
  );
  const favoriteMeal = (index, area, category) => (
    <h5
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${area} - ${category}`}
    </h5>
  );

  const favoriteDrink = (alcoholicOrNot, index) => (
    <h5 data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</h5>
  );

  const renderFavorites = () => (
    favoriteStorage.map((favorited, index) => (
      <div key={ index }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ favorited.image }
          alt="card"
          width="150px"
        />
        { favorited.type === 'comida'
          ? favoriteMeal(index, favorited.area, favorited.category)
          : favoriteDrink(favorited.alcoholicOrNot, index) }

        <h1 data-testid={ `${index}-horizontal-name` }>{ favorited.name }</h1>
        <ShareButton id={ favorited.id } type={ favorited.type } index={ index } path />
        <LikeButton
          recipe
          captureFavorited={ setFavorited }
          favPage
          index={ index }
        />
      </div>
    ))
  );
  
  useEffect(() => {
    setFavoriteStorage(getStorage('favoriteRecipes'));
  }, [state]);
  
  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      <CategoryButton
        clickCategory={ handleClickCategory }
        clickAll={ getRecipes }
        path
      />
      { renderFavorites() }
    </div>
  );
}

// passo 1 = criar a função que vai capturar o estado favorited(no likebutton)
// passo 2 = enviar essa função via props para o likebutton.
// passo 3 = no likebutton, eu faço a captura do estado favorited.
// passo 4 = Dentro dessa função, devo setar o estado da página(meu primeiro estado que chamei de ESTADO , no favoriteRecipes).
// uso o USEEFFECT pra puxar a atualização do local storage.       pathname vai o ESTADO, findlocation será a função q vou criar no passo 1                      useEffect(captureFavorited, [state]);
