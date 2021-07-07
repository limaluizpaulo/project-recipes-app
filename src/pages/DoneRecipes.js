import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import DoneRecipesCard from '../components/DoneRecipeCard';

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
      const foods = this.getDoneRecipes().filter((recipe) => recipe.type === 'comida');
      this.setState({ recipes: foods });
    } else if (target.innerText === 'Drink') {
      const drinks = this.getDoneRecipes().filter((recipe) => recipe.type === 'bebida');
      this.setState({ recipes: drinks });
    } else {
      this.getDoneRecipes();
    }
  }

  render() {
    const { recipes } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <section>
        <Header title="Receitas Feitas" searchIcon />
        <DoneRecipesButtons statusButton={ this.statusButton } />
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
