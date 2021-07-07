import React, { Component } from 'react';
import data from '../data2';

import '../Style/Progress.css';

class DrinkProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    if (e.target.checked) {
      this.setState({ className: 'Risk' });
    }
  }

  render() {
    const { className } = this.state;
    return (
      <div>
        <h2>Drinks Process</h2>
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
                  <input onChange={ this.handleChange } type="checkbox" />
                </p>
              ))}
            </div>
            <p data-testid="instructions">{teste.instrucao}</p>
            <button data-testid="share-btn" type="button">Compartilhar</button>
            <button data-testid="favorite-btn" type="button">Favoritar</button>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finalizar Receita
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default DrinkProcess;
