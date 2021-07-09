import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import '../Style/Progress.css';

const copy = require('clipboard-copy');

const number = 2;

class DrinkProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      active: true,
      redirect: false,
      drinks: [],
      ingredients: [],
      count: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const { count } = this.state;
    if (e.target.checked) {
      console.log('if');
      this.setState((state) => ({ count: state.count + 1 }), () => {
        console.log(count);
      });
    } else {
      this.setState((state) => ({ count: state.count - 1 }));
    }
    if (count === number) {
      this.setState({ active: false });
    }
    this.setState((state) => ({ ...state,
      className: 'Risk' }), () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(''));
    });
  }

  handleClick() {
    this.setState({ redirect: true });
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
    const { drinks, ingredients, className, active, redirect, link } = this.state;
    // console.log(ingredients);
    if (redirect) return <Redirect to="/receitas-feitas" />;
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
                  // name={ index }
                  onChange={ this.handleChange }
                  type="checkbox"
                />
              </p>
            ))}
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => {
              const { location: { pathname } } = this.props;
              copy(`http://localhost:3000${pathname}`);
              global.alert('Link copiado!');
            } }
          >
            Compartilhar
          </button>
          <p>{link}</p>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          <button
            onClick={ this.handleClick }
            disabled={ active }
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    );
  }
}

DrinkProcess.propTypes = {
  match: Proptypes.shape().isRequired,
  location: Proptypes.shape().isRequired,
};

export default DrinkProcess;
