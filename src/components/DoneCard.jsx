import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ filter }) {
  const filtered = () => {
    const finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const arrayMeals = finishedRecipes.filter(({ type }) => type === 'comida');
    const arrayDrinks = finishedRecipes.filter(({ type }) => type === 'bebida');
    switch (filter) {
    case 'Food':
      return arrayMeals;
    case 'Drinks':
      return arrayDrinks;
    default:
      return finishedRecipes;
    }
  };

  const renderTopText = (type, area, category, alcoholicOrNot) => {
    const textMeal = `${area} - ${category}`;
    const textDrink = `${alcoholicOrNot}`;
    if (type === 'comida') {
      return textMeal;
    }
    return (
      textDrink
    );
  };

  const filterTags = (tags, index) => {
    if (tags !== '') {
      const resultado = String(tags).split(',');
      return (
        resultado.map((tag) => (
          <p
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      );
    }
    return '';
  };

  return (
    <section>
      {filtered().map((
        { id,
          type,
          image,
          name,
          area,
          category,
          alcoholicOrNot,
          tags,
          doneDate,
        },
        index,
      ) => (
        <section key={ index }>
          <hr />
          <Link to={ `${type}s/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Foto da receita"
            />
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {renderTopText(type, area, category, alcoholicOrNot)}
          </span>
          <span>
            <img
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="share"
            />
          </span>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {`Feita em: ${doneDate || ''}`}
          </p>
          {console.log(typeof tags)}
          {filterTags(tags, index)}
          {/* falta a logica de compartilhar */}
        </section>
      ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  all: state.done.allDone,
});

DoneCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DoneCard);
