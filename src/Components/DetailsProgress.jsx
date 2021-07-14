/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { saveFavorite, isFavoriteIcon, setValue } from '../services/services';
import Share from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

import '../styles/DetailsProgress.css';

export default function DetailsProgress(props) {
  const savedRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { id, fetchAPI, type, setDisabled } = props;
  const recipe = type === 'Meal' ? 'meals' : 'cocktails';
  console.log(savedRecipe);
  const obj = savedRecipe ? savedRecipe[recipe][id].reduce((acc, curr) => ({
    ...acc,
    [curr]: ['striped', true],
  }), {}) : {};
  const clipboard = new ClipboardJS('.shr');
  const tipo = type === 'Meal' ? 'comida' : 'bebida';

  const [isCopy, setIsCopy] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const [classes, setClasses] = React.useState(obj);
  const [isFavorite, setIsFavorite] = React.useState(isFavoriteIcon(id));

  function copyLink() {
    console.log(clipboard.info);
    setIsCopy(true);
  }

  function isChecked(ide) {
    const { checked } = document.getElementById(`${ide}`);
    return checked;
  }

  React.useEffect(() => {
    fetchAPI(id)
      .then((res) => setItem(res[0]));
  }, []);

  React.useEffect(() => {
    const values1 = savedRecipe ? savedRecipe[recipe][id] : [];
    const values2 = Object.entries(item).filter((entrie) => {
      const [key, value] = entrie;
      return key.startsWith('strIngredient') && value;
    });

    setDisabled(values1.length !== values2.length);
  }, [classes]);

  return (
    <div className="tela-details">
      <div className="img-principal">
        <img
          data-testid="recipe-photo"
          src={ item[`str${type}Thumb`] }
          alt="some"
        />
      </div>
      <button
        type="button"
        data-testid="share-btn"
        className="btn-img btn-search"
        data-clipboard-text={ `http://localhost:3000/${tipo}s/${id}` }
        onClick={ copyLink }
      >
        {isCopy ? 'Link copiado!' : <img alt="share-btn" src={ Share } />}
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        className="btn-img btn-search"
        onClick={ () => saveFavorite(id, item, tipo, setIsFavorite) }
        src={ isFavorite ? blackHeart : whiteHeart }
      >
        <img alt="favorite-btn" src={ isFavorite ? blackHeart : whiteHeart } />
      </button>
      <div className="receita-details">
        <h3 className="titulos" data-testid="recipe-title">{item[`str${type}`]}</h3>
        <h6 className="font-media" data-testid="recipe-category">
          {type === 'Meal'
            ? item.strCategory : item.strAlcoholic}

        </h6>
        <form className="textos">
          {
            Object.entries(item).filter((entrie) => {
              const [key, value] = entrie;
              return key.startsWith('strIngredient') && value;
            }).map((el, i) => (
              <div
                key={ el[0] }
                data-testid={ `${i}-ingredient-step` }
              >
                <label
                  className={ classes[el[1]]
                    ? classes[el[1]][0] : 'normal' }
                  htmlFor={ el[0] }
                >
                  <input
                    type="checkbox"
                    id={ el[0] }
                    name={ el[0] }
                    onChange={ () => setValue({
                      ide: el[0],
                      value: el[1],
                      id,
                      recipe,
                      isChecked,
                      classes,
                      setClasses,
                    }) }
                    checked={ classes[el[1]] ? classes[el[1]][1] : false }
                  />
                  {`${el[1]} ${item[`strMeasure${i + 1}`]}`}
                </label>
              </div>
            ))
          }

        </form>
        <p className="textos" data-testid="instructions">{item.strInstructions}</p>
      </div>
    </div>
  );
}

DetailsProgress.propTypes = PropTypes.shape({}).isRequired;
