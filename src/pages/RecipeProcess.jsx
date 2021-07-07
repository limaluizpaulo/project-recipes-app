import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import data from '../data';

import '../Style/Progress.css';

// const URL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
// const LENGTH_DOZE = 12;
// const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

class RecipeProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      redirect: false,
      chec: false,
      // response: [],
    };

    // this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
  }

  componentDidMount() {
    // this.handleFetch();
    this.handleStorange();
  }

  handleStorange() {
    const checSave = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setState({ chec: checSave });
  }

  // componentWillUnmount() {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(data));
  // }

  // async handleFetch() {
  //   try {
  //     const result = await fetch(URL_RECIPES);
  //     const { meals } = await result.json();
  //     const resultFinal = meals.slice(0, LENGTH_DOZE);
  //     this.setState({ response: resultFinal });
  //   } catch (_error) {
  //     global.alert(messageAlert);
  //   }
  // }

  handleChange(e) {
    console.log(e.target.checked);
    this.setState((state) => ({ ...state,
      className: 'Risk',
      chec: !state.chec }), () => {
      const { chec } = this.state;
      localStorage.setItem('inProgressRecipes', JSON.stringify(chec));
    });
  }

  handleClick() {
    console.log('entrou');
    this.setState({ redirect: true });
  }

  render() {
    const { className, redirect, chec } = this.state;
    if (redirect) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        <h2>Recipe Process</h2>
        {data.map((teste) => (
          <div key={ teste.title }>
            <img width="50px" data-testid="recipe-photo" src={ teste.img } alt="img" />
            <h1 data-testid="recipe-title">{teste.title}</h1>
            <p data-testid="recipe-category">{teste.categoria}</p>
            <div>
              <span>Ingredientes:</span>
              {teste.ingredientes.map((ing, index) => (
                <p
                  className={ className }
                  key={ ing }
                  data-testid={ `${index}-ingredient-step` }
                >
                  -
                  {ing}
                  <input
                    name={ index }
                    checked={ chec }
                    onChange={ this.handleChange }
                    type="checkbox"
                  />
                </p>
              ))}
            </div>
            <p data-testid="instructions">{teste.instrucao}</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <button
              data-testid="finish-recipe-btn"
              type="button"
              onClick={ this.handleClick }
            >
              Finalizar Receita
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default RecipeProcess;
