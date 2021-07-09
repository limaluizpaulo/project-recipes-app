import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import RecipesContext from '../Context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function ReceitasFavoritas() {
  const { favoriteFilters } = useContext(RecipesContext);

  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();
  const id = pathname.split('/')[2];

  const removeFavorited = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  const verifyHeart = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.some((element) => element.id === id);
      if (filterLocalStorage) {
        setStateChangeHeart(false);
      }
    }
  };

  useEffect(verifyHeart, []);
  return (
    <>
      <Header />
      <FiltersButtons />
      {favoriteFilters.map(({
        image, category, name, id: idFavorite, area, type }, index) => (
        <div key={ idFavorite }>
            <img
            src={ image }
            alt="xxxx"
            data-testid={ `${index}-horizontal-image` }
            width="50px"
            onClick={ () => history.push(`/${type}s/${idFavorite}`) }
          />
            <span
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => history.push(`/${type}s/${idFavorite}`) }
          >
            { name }

          </span>
            <span data-testid={ `${index}-horizontal-top-text` }>{ category }</span>
            <span>{ area }</span>
            <ShareButton index={ index } idFavorite={ idFavorite } />
            <FavoriteButton
            stateChangeHeart={ stateChangeHeart }
            setStateChangeHeart={ setStateChangeHeart }
            removeFavorited={ removeFavorited }
          />
          </div>
      ))}
    </>

  );
}

export default ReceitasFavoritas;

// imagem, texto de categoria, nome, alcaholicOrNot (é pra dizer se é alcólico ou não )
