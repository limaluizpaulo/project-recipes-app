import React, { Component } from 'react';

class DoneRecipesCard extends Component {
  render() {
    return (
      <section>
        <div>
          <img
            src=""
            alt=""
            data-testid="${index}-horizontal-image" 
          />
        </div>
        <div>
          <h4 data-testid="${index}-horizontal-top-text" />
          <h2 data-testid="${index}-horizontal-name"></h2>
          <p data-testid="${index}-horizontal-done-date"></p>
          <button>
            <img 
              src="" 
              alt="" 
              data-testid="${index}-horizontal-share-btn" 
            />
          </button>
          <span data-testid="${index}-${tagName}-horizontal-tag" ></span>
        </div>
      </section>
    );
  }
}

export default DoneRecipesCard;
