import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavoriteRecipesButtons from '../components/FavoriteRecipesButtons';
import FavoriteRecipesCard from '../components/FavoriteRecipeCard';

class FavoriteRecipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: this.getFavoriteRecipes(),
    };

    this.getFavoriteRecipes = this.getFavoriteRecipes.bind(this);
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      return recipes;
    }
  }

  render() {
    const { recipes } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <section>
        <Header title="Receitas Favoritas" searchIcon />
        <FavoriteRecipesButtons />
        {recipes ? recipes.map((recipe, index) => (
          <FavoriteRecipesCard
            key={ index }
            recipe={ recipe }
            index={ index }
            pathname={ pathname }
          />)) : null }
      </section>
    );
  }
}

FavoriteRecipes.propTypes = {
  location: PropTypes.objectOf(Object),
}.isRequired;

export default FavoriteRecipes;
