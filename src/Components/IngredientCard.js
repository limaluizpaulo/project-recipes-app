import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class IngredientCard extends Component {
  constructor() {
    super();

    this.renderCard = this.renderCard.bind(this);
  }

  renderCard() {
    const { recipeType, ingredients } = this.props;
    const numeroMaximoDeReceitas = 12;

    const card = ingredients.map((item, index) => {
      if (index < numeroMaximoDeReceitas) {
        const ingredientImg = (nameIngredient) => {
          switch (recipeType) {
          case 'comidas':
            return `https://www.themealdb.com/images/ingredients/${nameIngredient}-Small.png`;
          case 'bebidas':
            return `https://www.thecocktaildb.com/images/ingredients/${nameIngredient}-Small.png`;
          default:
            break;
          }
        };
        const generateName = () => {
          switch (recipeType) {
          case 'comidas':
            return (item.strIngredient);
          case 'bebidas':
            return (item.strIngredient1);
          default:
            break;
          }
        };
        const nameCard = () => {
          switch (recipeType) {
          case 'comidas':
            return (
              <p data-testid={ `${index}-card-name` }>
                { item.strIngredient }
              </p>
            );
          case 'bebidas':
            return (
              <p data-testid={ `${index}-card-name` }>
                { item.strIngredient1 }
              </p>
            );
          default:
            break;
          }
        };
        return (
          <Link to={ `/${recipeType}/ingredientes/${generateName()}` }>
            <section key={ index } data-testid={ `${index}-ingredient-card` }>
              <img
                width="40px"
                data-testid={ `${index}-card-img` }
                src={ ingredientImg(generateName()) }
                alt="thumb"
              />
              { nameCard() }
            </section>
          </Link>
        );
      }
      return null;
    });
    return card;
  }

  render() {
    return (
      <div>
        { this.renderCard() }
      </div>
    );
  }
}

IngredientCard.propTypes = {
  recipeType: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientCard;
