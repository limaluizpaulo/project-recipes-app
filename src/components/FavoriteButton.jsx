import React, { Component } from 'react';
import PropTypes from 'prop-types';
import white from '../images/whiteHeartIcon.svg';
import black from '../images/blackHeartIcon.svg';
import {
  setFavoriteRecipes,
  getFavoriteRecipes,
  removeFavoriteRecipe } from './RecipeDetailsFunc';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };

    this.verifyFavorite = this.verifyFavorite.bind(this);
    this.stateSet = this.stateSet.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.stateSet(getFavoriteRecipes(id));
  }

  stateSet(status) {
    this.setState({ favorite: status });
  }

  verifyFavorite(recipe) {
    const { id, pathname } = this.props;
    const verifyPath = pathname.includes('comida');
    let title = 'Bebidas';
    if (verifyPath) {
      title = 'Comidas';
    }

    const isFav = getFavoriteRecipes(id);

    if (isFav) {
      this.setState({ favorite: false });
      return removeFavoriteRecipe(id);
    }
    setFavoriteRecipes(recipe, title);
    this.setState({ favorite: true });
  }

  render() {
    const { favorite } = this.state;
    const { recipeDetails } = this.props;
    return (
      <button
        className="like-and-share"
        type="button"
        onClick={ () => this.verifyFavorite(recipeDetails) }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? black : white }
          alt="favoriteIcon"
        />
      </button>
    );
  }
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteButton;
