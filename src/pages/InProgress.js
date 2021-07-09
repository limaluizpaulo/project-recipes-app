import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function InProgress() {
  const { inProgress } = useContext(RecipesContext);

  function handleFinished() {
    // localStorage.setItem('doneRecipes', JSON.stringify(
    //   [{ id,
    //     type: path.includes('bebidas') ? 'bebida' : 'comida',
    //     area: path.includes('bebidas') ? '' : singleContent[0].strArea,
    //     category: singleContent[0].strCategory,
    //     alcoholicOrNot: path.includes('bebidas') ? 'Alcoholic' : '',
    //     name: singleContent[0][title],
    //     image: singleContent[0][imgSrc],
    //   }],
    // ));
  }

  return (
    <>
      <img data-testid="recipe-photo" scr="" alt="" />

      <p data-testid="recipe-title">nao sei ainda</p>

      <Button>
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Button>

      <Button>
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="" />
      </Button>

      <p data-testid="recipe-category">nao sei ainda</p>

      {inProgress.map((item, i) => (
        <p key={ item } data-testid={ `${i}-ingredient-step` }>{item}</p>))}

      <p data-testid="instructions">nao sei ainda</p>

      <Button
        data-testid="finish-recipe-btn"
        onClick={ handleFinished }
      >
        Finalizar Receita
      </Button>
    </>
  );
}
