import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import DoneRecipesCard from '../components/DoneRecipeCard';

class DoneRecipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: this.getDoneRecipes(),
    };

    this.getDoneRecipes = this.getDoneRecipes.bind(this);
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  getDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) {
      return recipes;
    }
  }

  render() {
    const { recipes } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <section>
        <Header title="Receitas Feitas" searchIcon />
        <DoneRecipesButtons />
        {recipes ? recipes.map((recipe, index) => (
          <DoneRecipesCard
            key={ index }
            recipe={ recipe }
            index={ index }
            pathname={ pathname }
          />)) : null }
      </section>
    );
  }
}

DoneRecipes.propTypes = {
  location: PropTypes.objectOf(Object),
}.isRequired;

export default DoneRecipes;
