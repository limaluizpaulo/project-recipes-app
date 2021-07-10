import React, { useContext, useEffect, useState } from 'react';
import { /* useLocation */ useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import RecipesContext from '../Context/RecipesContext';
import ShareButtonPerfil from '../components/ShareButtonPerfil';
import ScreenFavoriteButton from '../components/FavoriteButton';

function ReceitasFavoritas() {
  const { favoriteFilters } = useContext(RecipesContext);

  // const [stateChangeHeart, setStateChangeHeart] = useState(true);
  // const { pathname } = useLocation();
  const history = useHistory();
  // const idObj = pathname.split('/')[2];

  // const removeFavorited = () => {
  //   const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favorited) {
  //     const filterLocalStorage = favorited.filter((element) => element.idObj !== idObj);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
  //   }
  // };

  // const verifyHeart = () => {
  //   const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favorited) {
  //     const filterLocalStorage = favorited.some((element) => element.idObj === idObj);
  //     if (filterLocalStorage) {
  //       setStateChangeHeart(false);
  //     }
  //   }
  // };

  // useEffect(verifyHeart, []);
  return (
    <>
      <Header />
      <FiltersButtons />
      { favoriteFilters === null ? <p /> : favoriteFilters.map(({ image, category, name, id, area, type, alcoholicOrNot }, index) => (
        <div key={ id }>
          <img
            src={ image }
            alt="xxxx"
            data-testid={ `${index}-horizontal-image` }
            width="50px"
            onClick={ () => history.push(`/${type}s/${id}`) }
          />
          <span
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => history.push(`/${type}s/${id}`) }
          >
            { name }

          </span>
          {
            area && <span data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</span>
          }
          <ShareButtonPerfil type={ type } id={ id } index={ index } />
          <ScreenFavoriteButton
            // stateChangeHeart={ stateChangeHeart }
            // setStateChangeHeart={ setStateChangeHeart }
            // removeFavorited={ removeFavorited }
            index={ index }
          />
          {
            alcoholicOrNot && <h3 data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</h3>
          }
        </div>
      ))}
    </>

  );
}

export default ReceitasFavoritas;

// imagem, texto de categoria, nome, alcaholicOrNot (é pra dizer se é alcólico ou não )
