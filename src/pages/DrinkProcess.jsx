import React, { Component } from 'react';
import Proptypes from 'prop-types';
// import data from '../data2';

import '../Style/Progress.css';

class DrinkProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      chec: false,
      drinks: [],
      ingredients: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
    this.getDrink = this.getDrink.bind(this);
  }

  componentDidMount() {
    this.getDrink();
    this.handleStorange();
  }

  handleStorange() {
    const checSave = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setState({ chec: checSave });
  }

  handleChange(e) {
    console.log(e.target.checked);
    this.setState((state) => ({ ...state,
      className: 'Risk',
      chec: !state.chec }), () => {
      const { chec } = this.state;
      localStorage.setItem('inProgressRecipes', JSON.stringify(chec));
    });
  }

  async getDrink() {
    // console.log('aqui getRecipe');
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await result.json();
    // console.log(drinks);
    drinks.forEach((cur) => {
      // console.log(cur);
      const aux = Object.entries(cur);
      // console.log(aux);
      this.setState({ drinks, ingredients: aux });
    });
  }

  render() {
    const { drinks, ingredients, className, chec } = this.state;
    console.log(ingredients);
    return (
      <div>
        <h2>Drinks Process</h2>
        {drinks.map((teste) => (
          <div key={ teste.idDrink }>
            <img
              width="50px"
              data-testid="recipe-photo"
              src={ teste.strDrinkThumb }
              alt="img"
            />
            <h1 data-testid="recipe-title">{teste.strGlass}</h1>
            <p data-testid="recipe-category">{teste.strCategory}</p>
            <p data-testid="instructions">{teste.strInstructions}</p>
          </div>
        ))}
        <div>
          <span>Ingredientes:</span>
          {ingredients.filter(([chave]) => chave === 'strIngredient1'
          || chave === 'strIngredient2' || chave === 'strIngredient3')
            .map(([chave, valor], index) => (
              <p
                className={ className }
                key={ chave }
                data-testid={ `${index}-ingredient-step` }
              >
                -
                {valor}
                <input
                  checked={ chec }
                  onChange={ this.handleChange }
                  type="checkbox"
                />
              </p>
            ))}
        </div>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
}

DrinkProcess.propTypes = {
  match: Proptypes.shape().isRequired,
};

export default DrinkProcess;
