import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import black from '../images/blackHeartIcon.svg';

import '../css/FavoriteRecipeCard.css';

class FavoriteRecipesCard extends Component {
  constructor() {
    super();

    this.state = {
      copied: false,
    };

    this.copyLink = this.copyLink.bind(this);
  }

  copyLink() {
    this.setState({ copied: true });

    const { recipe } = this.props;
    const { type, id } = recipe;
    copy(`http://localhost:3000/${type}s/${id}`);
  }

  render() {
    const { recipe, index, removeFavoriteRecipe } = this.props;
    const { name, area, category, image, alcoholicOrNot, type, id } = recipe;
    const { copied } = this.state;
    return (
      <section className="card-container">
        <Link to={ `/${type}s/${id}` }>
          <div className="card-container-img">
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              width="130px"
            />
          </div>
        </Link>
        <div className="card-container-text">
          <h6 data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </h6>
          <h6 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h6>
          <Link to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>
          <div className="card-container-buttons">
            <Button
              type="button"
              onClick={ this.copyLink }
              className="like-and-share"
            >
              {copied ? 'Link copiado!'
                : (
                  <img
                    src={ shareIcon }
                    alt="shareIcon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />)}
            </Button>
            <Button
              className="like-and-share"
              type="button"
              onClick={ () => removeFavoriteRecipe(index) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ black }
                alt="favoriteIcon"
              />
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

FavoriteRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  index: PropTypes.string,
}.isRequired;

export default FavoriteRecipesCard;
