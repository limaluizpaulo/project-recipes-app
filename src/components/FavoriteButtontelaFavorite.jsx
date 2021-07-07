import React, { Component } from 'react';

import PropTypes from 'prop-types';
import black from '../images/blackHeartIcon.svg';

class FavoriteButtonTelaFavorite extends Component {
  constructor(props) {
    super(props);

    this.removeFavoriteRecipe = this.removeFavoriteRecipe.bind(this);
  }

  removeFavoriteRecipe(id) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const newFavorites = favorites.filter((item, index) => index !== id);
      localStorage.favoriteRecipes = JSON.stringify(newFavorites);
      return newFavorites;
    }
  }

  render() {
    const { id } = this.props;
    return (
      <button
        type="button"
        onClick={ () => this.removeFavoriteRecipe(id) }
      >
        <img
          data-testid={ `${id}-horizontal-favorite-btn` }
          src={ black }
          alt="favoriteIcon"
        />
      </button>
    );
  }
}

FavoriteButtonTelaFavorite.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteButtonTelaFavorite;
