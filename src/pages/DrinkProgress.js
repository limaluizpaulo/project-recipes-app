import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { recipeById } from '../services/requests';
import { filterObj } from '../utils';
import { checkFavoriteId, updateStorageRecipe } from '../services/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const blackOrWhite = (favorited) => (favorited ? blackHeartIcon : whiteHeartIcon);

const DrinkProgress = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});
  const [selecteds, setSelects] = useState([]);
  const [msgCopy, setMsgCopy] = useState(false);
  const [iconFavorit, setIconFavorit] = useState(false);
  const [quantIngred, setQuantIngred] = useState();

  const isFavorite = checkFavoriteId(id);

  const qtd = filterObj(/Ingredient/, drink).length;

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  useEffect(() => {
    if (isFavorite) setIconFavorit(true);
  }, [isFavorite]);

  useEffect(() => {
    recipeById(id).then(setDrink);
    setQuantIngred(qtd);
  }, [id, setDrink, qtd]);

  const findSelecteds = (ingredient) => selecteds.find((item) => item === ingredient);

  const handleSelect = (item) => {
    if (!findSelecteds(item)) {
      updateStorageRecipe(id, [...selecteds, item]);
      setSelects([...selecteds, item]);
    } else {
      const removeSelected = selecteds.filter((ingredient) => ingredient !== item);
      updateStorageRecipe(id, removeSelected);
      setSelects(removeSelected);
    }
  };

  const renderCheckBox = () => {
    const ingredients = filterObj(/Ingredient/, drink);
    return ingredients.map(([key, ingredient]) => (
      <label
        className={ findSelecteds(key) && 'checked' }
        checked={ findSelecteds(key) && 'checked' }
        data-testid="ingredient-step"
        htmlFor="ingredient"
        key={ `${key} - ${ingredient}` }
      >
        {ingredient}
        <input onClick={ () => handleSelect(key) } type="checkbox" id="ingredient" />
      </label>
    ));
  };

  const addFavorite = () => {
    const favorites = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];

    if (!iconFavorit) {
      const { idDrink, strArea, strCategory, strDrink, strDrinkThumb } = drink;
      const add = [...favorites, {
        id: idDrink,
        type: 'bebida',
        area: strArea || '',
        category: strCategory,
        alcoholicOrNot: 'Alcoholic',
        name: strDrink,
        image: strDrinkThumb,
      }];
      localStorage.favoriteRecipes = JSON.stringify(add);
    } else {
      const remove = favorites.filter(({ id: idL }) => idL !== id);
      localStorage.favoriteRecipes = JSON.stringify(remove);
    }
    setIconFavorit(!iconFavorit);
  };

  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderCheckBox()}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <p data-testid="0-recomendation-card">recomendation</p>
      <button
        onClick={ () => copy(`http://localhost:3000/bebidas/${id}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        { msgCopy ? 'Link copiado!' : 'Compartilhar' }
      </button>
      <button onClick={ addFavorite } type="button">
        <img
          data-testid="favorite-btn"
          src={ blackOrWhite(iconFavorit) }
          alt={ blackOrWhite(iconFavorit) }
        />
      </button>
      <Link to="/receitas-feitas">
        <button
          type="button"
          disabled={ selecteds.length !== quantIngred }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkProgress;
