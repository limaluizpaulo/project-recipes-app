import { indexOf } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import FetchContext from '../context/FetchContext';

function CardRecipe({ id }) {
  const { data, imgRecipes, nameRecipes, typeFunc} = useContext(FetchContext);
  const [checkArr, setCheckArr] = useState([]);
  
  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (progressObject === null) {
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

    if(checkArr.length === 0) {
      const newCheck = filterIngredients.map(() => false)
      // console.log(progressObject.meals[id])
      if(progressObject[typeFunc][id] === undefined) {
        console.log('entrou aqui')
        return setCheckArr(newCheck);
      }

      progressObject[typeFunc][id].map((res) => {
        newCheck[res] = true;
      })
      setCheckArr(newCheck)

    }


    function changeCheck(num) {
      console.log(checkArr[num])
      const newCheck = checkArr.map((res, index) => index === num ? !checkArr[index] : checkArr[index])
      setCheckArr(newCheck);

        if (progressObject.[typeFunc][id] === undefined) {
          progressObject.[typeFunc][id] = [];
          localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
        }

        if (checkArr[num] === false) {
          progressObject.[typeFunc][id] =[...progressObject.[typeFunc][id], num];
          progressObject.[typeFunc][id].sort((a, b) => a-b)
          localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
        }

        if (checkArr[num]) {
          progressObject.[typeFunc][id].splice(progressObject.[typeFunc][id].indexOf(num), 1);
          localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
        }
      
    }

    return filterIngredients.map((ingredient, index) => (
      <li data-testid={`${index}-ingredient-step`} >
        <label htmlFor={ ingredient } >
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
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
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