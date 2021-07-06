import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { value: {
    url,
    food,
    recipe,
    blackHeart,
    whiteHeart,
    shareIcon,
    copied,
    saveToFavorites,
    removeFromFavorites,
    copyUrl,
    favorite,
  } } = props;
  const recipeTitle = recipe.strMeal;
  const favoriteIcon = (favorite)
    ? blackHeart : whiteHeart;
  const category = recipe.strCategory;
  if (url.match(food)) {
    return (
      <div className="title">
        <div className="title-left">
          <h4 data-testid="recipe-title">{recipeTitle}</h4>
          <h6 data-testid="recipe-category">{category}</h6>
        </div>
        <div className="title-right">
          <button
            src={ favoriteIcon }
            type="button"
            data-testid="favorite-btn"
            onClick={ (favorite) ? removeFromFavorites : saveToFavorites }
          >
            <img src={ favoriteIcon } alt="adicionar ou remover dos favoritos" />
          </button>
          <button
            onClick={ copyUrl }
            src={ shareIcon }
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="compartilhar receita" />
          </button>
          <br />
          { copied ? <span>Link copiado!</span> : ''}
        </div>
      </div>
    );
  }

  return (
    <div className="title">
      <div className="title-left">
        <h4 data-testid="recipe-title">{recipe.strDrink}</h4>
        <h6 data-testid="recipe-category">{recipe.strAlcoholic}</h6>
      </div>
      <div className="title-right">
        <button
          src={ favoriteIcon }
          type="button"
          data-testid="favorite-btn"
          onClick={ (favorite) ? removeFromFavorites : saveToFavorites }
        >
          <img src={ favoriteIcon } alt="adicionar ou remover dos favoritos" />
        </button>
        <button
          onClick={ copyUrl }
          src={ shareIcon }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="compartilhar receita" />
        </button>
        { copied ? <p>Link copiado!</p> : ''}
      </div>
    </div>
  );
}

Title.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Title;
