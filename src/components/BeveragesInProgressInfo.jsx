import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class BeveragesInProgressInfo extends Component {
  constructor() {
    super();
    this.onClickFinishRecipe = this.onClickFinishRecipe.bind(this);
  }

  onClickFinishRecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const { match: { params: { id } }, detailsRecipe } = this.props;
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const currentDate = `${day}/0${month + 1}/${year}`;
    const newRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: detailsRecipe[0].strCategory,
      alcoholicOrNot: detailsRecipe[0].strAlcoholic,
      name: detailsRecipe[0].strDrink,
      image: detailsRecipe[0].strDrinkThumb,
      doneDate: currentDate,
      tags: [],
    };
    if (doneRecipes) {
      const checkRegister = doneRecipes.filter((recipe) => recipe.id === id);
      if (checkRegister.length > 0) return null;
      return localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, newRecipe]),
      );
    }
    return localStorage.setItem(
      'doneRecipes',
      JSON.stringify([newRecipe]),
    );
  }

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
          src={ detailsRecipe[0].strDrinkThumb }
          alt="Imagem da Bebida"
          data-testid="recipe-photo"
          width="350"
        />
        <h1 data-testid="recipe-title">{detailsRecipe[0].strDrink}</h1>
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
          {`Categoria: ${detailsRecipe[0].strAlcoholic}`}
        </p>
        <p data-testid="instructions">
          {`Instrução: ${detailsRecipe[0].strInstructions}`}
        </p>
        <h3>Ingredientes</h3>
        <ul>{renderIngredients()}</ul>
        <Link to="/receitas-feitas">
          <button
            disabled={ setDisable }
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ this.onClickFinishRecipe }
          >
            Finalizar receita
          </button>
        </Link>
      </section>
    );
  }
}

BeveragesInProgressInfo.propTypes = {
  detailsRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  copyLink: PropTypes.bool.isRequired,
  setDisable: PropTypes.bool.isRequired,
  onClickShare: PropTypes.func.isRequired,
  onClickFavoriteIcon: PropTypes.func.isRequired,
  renderIngredients: PropTypes.func.isRequired,
  renderFavorite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(BeveragesInProgressInfo);
