import React from 'react';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

class RecipeDetails extends React.Component {
  render() {
    return (
      <section>
        <div>
          <img data-testid="recipe-photo" src="" alt="" />
          <h1 data-testid="recipe-title">Detalhes Bebidas</h1>
          <button
            data-testid="share-btn"
            type="button"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ favoriteIcon } alt="favoriteIcon" />
          </button>
          <span data-testid="recipe-category" />
        </div>
        <div>
          <h4>Ingredientes</h4>
          <ul>
          </ul>
        </div>
        <div>
          <h4>Instruções</h4>
          <p data-testid="instructions"></p>
        </div>
        <div>
          <h4>Video</h4>
          <iframe
            src={}
            data-testid="video"
            frameborder="0"
          >
          </iframe>
        </div>
        <div>
          <h4>Recomendadas</h4>
          <div data-testid="${index}-recomendation-card" >Carrosel de cards</div> 
          </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>

      </section>
    );
  }
}

export default RecipeDetails;
