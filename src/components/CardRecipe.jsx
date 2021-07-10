import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg'
import { Link } from 'react-router-dom';

function CardRecipe({ id }) {
  const { data, imgRecipes, nameRecipes, typeFunc } = useContext(FetchContext);
  const [checkArr, setCheckArr] = useState([]);
  const [msg, setMsg] = useState(false)
  const [favorite, setFavorite] = useState(false);

  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))

  if (progressObject === null) {
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  if (favoriteRecipes === null) {
    const favoriteRecipes = []
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes))
  }

  useEffect(() => {
    if (favoriteRecipes !== null) {
      favoriteRecipes.map((recipe) => {
        recipe.id === id && setFavorite(true)
      })
    }
  }, [])

  if (data.length > 0) {
    const result = Object.keys(data[0]);
    var filterIngredients = result.filter(
      (res) => res.includes('strIngredient') && data[0][res],
    );
  }

  console.log(filterIngredients)

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

      console.log(progressObject[typeFunc][id])
      progressObject[typeFunc][id].splice(progressObject[typeFunc][id].indexOf(num), 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    }

    return filterIngredients.map((ingredient, index) => (
      <li key={ingredient} data-testid={`${index}-ingredient-step`}>
        <label htmlFor={ingredient}>
          <input
            type="checkbox"
            id={ingredient}
            checked={checkArr[index]}
            onClick={() => changeCheck(index)}
          />
          {`${data[0][ingredient]} - ${data[0][filterMeasures[index]]}`}
        </label>
      </li>
    ));
  };

  const shareLink = () => {
    if (typeFunc === 'meals') {
      copy(`http://localhost:3000/comidas/${id}`);
    }
    else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }

    setMsg(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setMsg(false);
    }, TWO_SECONDS)
  }

  const favoriteBtn = () => {
    setFavorite(!favorite)

    if (favorite) {
      favoriteRecipes.map((recipe, index) => {
        recipe.id === id && favoriteRecipes.splice(index, 1);
      })

      return localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes))
    }

    let newFavorite = [];
    if (typeFunc === 'meals') {
      newFavorite = [
        ...favoriteRecipes,
        {
          id: id,
          type: 'comida',
          area: data[0].strArea,
          category: data[0].strCategory,
          alcoholicOrNot: '',
          name: data[0].strMeal,
          image: data[0].strMealThumb,
        }
      ]
    } else {
      newFavorite = [
        ...favoriteRecipes,
        {
          id: id,
          type: 'bebida',
          area: '',
          category: data[0].strCategory,
          alcoholicOrNot: data[0].strAlcoholic,
          name: data[0].strDrink,
          image: data[0].strDrinkThumb,
        }
      ]
    }

    return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite))
  }

  return (
    <div>
      {
        data.map((recipe) => (
          <div key={recipe}>
            <img data-testid="recipe-photo" src={recipe[imgRecipes]} alt="" />
            <h2 data-testid="recipe-title">{recipe[nameRecipes]}</h2>
            { msg && <div>Link copiado!</div>}
            <button data-testid="share-btn" type="button" onClick={shareLink}>
              <img src={shareIcon} alt="botão de compartilhar" />
            </button>
            <button onClick={favoriteBtn}>
              <img data-testid="favorite-btn" type="button" src={favorite ? blackHeartIcon : whiteHeartIcon} alt="botão de favoritar" />
            </button>
            <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
            <ul>
              {renderCheckbox()}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ checkArr.filter((res) => res).length !== filterIngredients.length }
              >
                Finalizar Receita
              </button>
            </Link>
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
