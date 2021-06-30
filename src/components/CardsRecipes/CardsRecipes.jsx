import React, { Component } from 'react';
import './CardsRecipes.css';
import imagem from '../../images/shareIcon.svg';

export default class CardsRecipes extends Component {
  render() {
    return (
      <div className="cardsCss card mb-3 d-flex flex-row">
        <div className="col-md-4">
          <img
            src="https://image.freepik.com/fotos-gratis/prato-da-comida-tradicional-brasileira_259266-423.jpg"
            /* data-testid="${index}-horizontal-image" */
            className="imgCss img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {/* <p data-testid="${index}-horizontal-top-text">Categoria</p> */}
            <h5
              /* data-testid="${index}-horizontal-name" */
              className="card-title"
            >
              Card title
            </h5>
            <p
              className="card-text"
            /* data-testid="${index}-horizontal-done-date" */
            >
              Data
            </p>
            <img
              src={ imagem }
              className="card-text"
              /* data-testid="${index}-horizontal-share-btn" */
              alt="..."
            />
            <button
              type="button"
              className="card-text btn btn-lg btn-primary"
              disabled
            /* data-testid="${index}-${tagName}-horizontal-tag" */
            >
              Tags
            </button>
          </div>
        </div>
      </div>
    );
  }
}
