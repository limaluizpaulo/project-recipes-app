import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavoriteRecipesButtons from '../components/FavoriteRecipeButton';
import FavoriteRecipesCard from '../components/FavoriteRecipeCard';

class FavoriteRecipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
    };

    this.getFavoriteRecipes = this.getFavoriteRecipes.bind(this);
    this.statusButton = this.statusButton.bind(this);
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      this.setState({ recipes });
      return recipes;
    }
  }

  statusButton({ target }) {
    if (target.innerText === 'Food') {
      const foods = this.getFavoriteRecipes() ? (
        this.getFavoriteRecipes().filter((recipe) => recipe.type === 'comida')) : null;
      this.setState({ recipes: foods });
    } else if (target.innerText === 'Drink') {
      const drinks = this.getFavoriteRecipes() ? (
        this.getFavoriteRecipes().filter((recipe) => recipe.type === 'bebida')) : null;
      this.setState({ recipes: drinks });
    } else {
      this.getFavoriteRecipes();
    }
  }

  render() {
    const { recipes } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <section>
        <Header title="Receitas Favoritas" searchIcon />
        <FavoriteRecipesButtons statusButton={ this.statusButton } />
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
