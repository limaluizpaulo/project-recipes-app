import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';

function CardRecipe({ id }) {
  const { data, imgRecipes, nameRecipes, typeFunc } = useContext(FetchContext);
  const [checkArr, setCheckArr] = useState([]);

  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (progressObject === null) {
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  const renderCheckbox = () => {
    const result = Object.keys(data[0]);

    const filterIngredients = result.filter(
      (res) => res.includes('strIngredient') && data[0][res],
    );
    const filterMeasures = result.filter(
      (res) => res.includes('strMeasure') && data[0][res],
    );

    if (checkArr.length === 0) {
      const newCheck = filterIngredients.map(() => false);
      setCheckArr(newCheck);
      if (progressObject[typeFunc][id] === undefined) {
        progressObject[typeFunc][id] = [];
        console.log(progressObject);
        return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
      }

      progressObject[typeFunc][id].map((res) => {
        newCheck[res] = true;
        return setCheckArr(newCheck);
      });
    }

    function changeCheck(num) {
      const newCheck = checkArr.map(
        (res, index) => (index === num ? !checkArr[index] : checkArr[index]),
      );
      setCheckArr(newCheck);

      if (checkArr[num] === false) {
        progressObject[typeFunc][id] = [...progressObject[typeFunc][id], num];
        progressObject[typeFunc][id].sort((a, b) => a - b);
        return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
      }

      progressObject[typeFunc][id].splice(progressObject[typeFunc][id].indexOf(num), 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    }

    return filterIngredients.map((ingredient, index) => (
      <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <label htmlFor={ ingredient }>
          <input
            type="checkbox"
            id={ ingredient }
            checked={ checkArr[index] }
            onClick={ () => changeCheck(index) }
          />
          {`${data[0][ingredient]} - ${data[0][filterMeasures[index]]}`}
        </label>
      </li>
    ));
  };

  return (
    <div>
      {
        data.map((recipe) => (
          <div key={ recipe }>
            <img data-testid="recipe-photo" src={ recipe[imgRecipes] } alt="" />
            <h2 data-testid="recipe-title">{recipe[nameRecipes]}</h2>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
            <ul>
              {renderCheckbox()}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </div>
        ))
      }
    </div>
  );
}

CardRecipe.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CardRecipe;
