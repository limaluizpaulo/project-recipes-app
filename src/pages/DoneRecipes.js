import React, { Component } from 'react';
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
    return (
      <section>
        <Header title="Receitas Feitas" searchIcon />
        <DoneRecipesButtons />
        {recipes ? recipes.map((recipe, index) => (
          <DoneRecipesCard key={ index } recipe={ recipe } index={ index } />)) : null }
      </section>
    );
  }
}

export default DoneRecipes;
