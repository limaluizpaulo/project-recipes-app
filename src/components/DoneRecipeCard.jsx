import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipesCard extends Component {
  render() {
    const { recipe, index } = this.props;
    const { name, area, category, doneDate, tags, image, alcoholicOrNot } = recipe;
    console.log(tags);
    return (
      <section>
        <div>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            width="100px"
          />
        </div>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </h5>
          <h5 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h5>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          <button type="button">
            <img
              src={ shareIcon }
              alt="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {tags ? tags.map((tag, indexTag) => (
            <span
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>)) : null}
        </div>
      </section>
    );
  }
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(string),
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  index: PropTypes.string,
}.isRequired;

export default DoneRecipesCard;
