import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class FoodInProgressInfo extends Component {
  render() {
    const {
      detailsRecipe,
      copyLink,
      setDisable,
      onClickShare,
      onClickFavoriteIcon,
      renderIngredients,
      renderFavorite,
    } = this.props;
    return (
      <section>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt="Imagem da Bebida"
          data-testid="recipe-photo"
          width="350"
        />
        <h1 data-testid="recipe-title">{detailsRecipe[0].strMeal}</h1>
        <p>{copyLink ? 'Link copiado!' : null}</p>
        <button
          type="button"
          onClick={ onClickShare }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
        </button>
        <button
          type="button"
          onClick={ onClickFavoriteIcon }
        >
          {renderFavorite()}
        </button>
        <p data-testid="recipe-category">
          {`Categoria: ${detailsRecipe[0].strCategory}`}
        </p>
        <p data-testid="instructions">
          {`Instrução: ${detailsRecipe[0].strInstructions}`}
        </p>
        <h3>Ingredientes</h3>
        <ul>{renderIngredients()}</ul>

        <Link to="/receitas-feitas">
          <button disabled={ setDisable } data-testid="finish-recipe-btn" type="button">
            Finalizar receita
          </button>
        </Link>
      </section>
    );
  }
}

FoodInProgressInfo.propTypes = {
  detailsRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  copyLink: PropTypes.bool.isRequired,
  setDisable: PropTypes.bool.isRequired,
  onClickShare: PropTypes.func.isRequired,
  onClickFavoriteIcon: PropTypes.func.isRequired,
  renderIngredients: PropTypes.func.isRequired,
  renderFavorite: PropTypes.func.isRequired,
};

export default FoodInProgressInfo;
