import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import DoneRecipesCard from '../components/DoneRecipeCard';

import '../css/Page.css';
import '../css/Buttons.css';

class DoneRecipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
    };

    this.getDoneRecipes = this.getDoneRecipes.bind(this);
    this.statusButton = this.statusButton.bind(this);
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  getDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) {
      this.setState({ recipes });
      return recipes;
    }
  }

  statusButton({ target }) {
    if (target.innerText === 'Food') {
      const foods = this.getDoneRecipes() ? (
        this.getDoneRecipes().filter((recipe) => recipe.type === 'comida')) : null;
      this.setState({ recipes: foods });
    } else if (target.innerText === 'Drink') {
      const drinks = this.getDoneRecipes() ? (
        this.getDoneRecipes().filter((recipe) => recipe.type === 'bebida')) : null;
      this.setState({ recipes: drinks });
    } else {
      this.getDoneRecipes();
    }
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="page">
        <div className="recipes-done-container">
          <Header title="Receitas Feitas" searchIcon />
          <DoneRecipesButtons statusButton={ this.statusButton } />
          {recipes ? recipes.map((recipe, index) => (
            <DoneRecipesCard
              key={ index }
              recipe={ recipe }
              index={ index }
            />)) : null }
        </div>
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  location: PropTypes.objectOf(Object),
}.isRequired;

export default DoneRecipes;
