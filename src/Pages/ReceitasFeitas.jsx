import React, { Component } from 'react';
import doneRecipes from '../doneRecipes';
// O array acima é apenas ilustrativo para passar nos testes. Conforme a evolução do projeto iremos substituí-los pelos dados corretos posteriormente
// import PropTypes from 'prop-types';

export default class ReceitasFeitas extends Component {
  renderDoneRecipes() {
    const recipes = doneRecipes
      .map(({ id, image, name, category, doneDate, tags }, index) => {
        const mapTags = tags.map((tag) => (
          <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
        ));
        return (
          <section key={ id }>
            <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
            <span data-testid={ `${index}-horizontal-top-text` }>
              { category }
            </span>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
            <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
              Compartilhar a receita // será trocado posteriormente
            </button>
            { mapTags }
          </section>
        );
      });
    return recipes;
  }

  render() {
    return (
      <div>
        <main>
          <button type="button" data-testid="filter-by-all-btn">
            All
          </button>
          <button type="button" data-testid="filter-by-food-btn">
            Food
          </button>
          <button type="button" data-testid="filter-by-drink-btn">
            Drinks
          </button>
          { this.renderDoneRecipes() }
        </main>
      </div>
    );
  }
}
