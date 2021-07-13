import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';

function RenderIngredients({ id }) {
  const { data, typeFunc, setIngredient } = useContext(FetchContext);
  const [checkArr, setCheckArr] = useState([]);
  const result = Object.keys(data[0]);

  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const filterIngredients = result.filter(
    (res) => res.includes('strIngredient') && data[0][res],
  );
  const filterMeasures = result.filter(
    (res) => res.includes('strMeasure') && data[0][res],
  );

  if (checkArr.length === 0) {
    const newCheck = filterIngredients.map(() => false);
    setCheckArr(newCheck);
    setIngredient(newCheck);
    if (progressObject[typeFunc][id] === undefined) {
      progressObject[typeFunc][id] = [];
      return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    }

    progressObject[typeFunc][id].map((res) => {
      newCheck[res] = true;
      setIngredient(newCheck);
      return setCheckArr(newCheck);
    });
  }

  function changeCheck(num) {
    const newCheck = checkArr.map(
      (res, index) => (index === num ? !checkArr[index] : checkArr[index]),
    );
    setCheckArr(newCheck);
    setIngredient(newCheck);

    if (checkArr[num] === false) {
      progressObject[typeFunc][id] = [...progressObject[typeFunc][id], num]
        .sort((a, b) => a - b);
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
        { `${data[0][ingredient]} - ${data[0][filterMeasures[index]]}` }
      </label>
    </li>
  ));
}

export default RenderIngredients;
