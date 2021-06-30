import React, { Component } from 'react';
import doneRecipes from '../doneRecipes';
// O array acima é apenas ilustrativo para passar nos testes. Conforme a evolução do projeto iremos substituí-los pelos dados corretos posteriormente
// import PropTypes from 'prop-types';

export default class ReceitasFeitas extends Component {
  renderDoneRecipes() {
    const recipes = doneRecipes
      .map(({ id, type, area, alcoholicOrNot, image,
        name, category, doneDate, tags }, index) => {
        const bothTypes = () => (
          <section>
            <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
            <button type="button">
              <img
                src="../images/shareIcon.svg"
                alt="share-button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </section>
        );
        const mapTags = tags.map((tag, indexTag) => {
          if (indexTag < 2) {
            return (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            );
          }
          return null;
        });
        const renderFood = () => (
          <section>
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
            { mapTags }
          </section>
        );
        const renderDrink = () => (
          <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
        );
        return (
          <div key={ id }>
            { bothTypes() }
            { type === 'comida' ? renderFood() : renderDrink() }
          </div>
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
