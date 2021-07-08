import React, { useContext, useEffect, useState } from 'react';
import FetchContext from '../context/FetchContext';
import { filterDrinksById, filterMealsById } from '../services/Api';

function CardRecipe({ id }) {
  const { data, imgRecipes, nameRecipes, typeFunc} = useContext(FetchContext);
  const [checkArr, setCheckArr] = useState([]);
  
  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (progressObject === null) {
    console.log('teste')
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  const renderCheckbox = () => {
    const result = Object.keys(data[0]);
    const filterIngredients = result.filter((res) => res.includes('strIngredient'))
      .filter((result) => data[0][result] !== '' && data[0][result] !== null)

    const filterMeasures = result.filter((res) => res.includes('strMeasure'))
      .filter((result) => data[0][result] !== '' && data[0][result] !== null)

    const arrIngredient = filterIngredients.map((res) => filterIngredients.indexOf(res) + 1)

    console.log(arrIngredient)

    if (typeFunc === 'comidas') {
        progressObject.meals[id] = arrIngredient;
        localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
      }

    if (typeFunc === 'bebidas') {
      progressObject.cocktails[id] = arrIngredient;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    }  

    if(checkArr.length === 0) {
      const newCheck = filterIngredients.map(() => false)
      setCheckArr(newCheck);
    }

    function changeCheck(num) {
      const newCheck = checkArr.map((res, index) => index === num ? !checkArr[index] : checkArr[index])
      setCheckArr(newCheck);  
    }

    return filterIngredients.map((ingredient, index) => (
      <li data-testid={`data-testid=${index}-ingredient-step`}>
        <label htmlFor={ ingredient }>
          <input
            type="checkbox"
            id={ ingredient }
            checked={ checkArr[index] }
            onClick={ () => changeCheck(index)}          
          />
          {`${data[0][ingredient]} - ${data[0][filterMeasures[index]]}`}
        </label>
      </li>
    ))
  }

  return (
    <div>
      {
        data.map((recipe) => (
          <div>
            <img data-testid="recipe-photo" src={recipe[imgRecipes]} alt="" />
            <h2 data-testid="recipe-title">{recipe[nameRecipes]}</h2>
            <button data-testid="share-btn" type="button"></button>
            <button data-testid="favorite-btn" type="button"></button>
            <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
            <ul>
              {renderCheckbox()}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <button data-testid="finish-recipe-btn">Finalizar Receita</button>
          </div>
        ))
      }
    </div>
  )
}

export default CardRecipe;