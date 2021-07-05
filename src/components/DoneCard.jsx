import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ filter, all }) {
  const filtered = () => {
    const arrayMeals = all.filter((item) => item.idMeal);
    const arrayDrinks = all.filter((item) => item.idDrink);
    switch (filter) {
    case 'Food':
      return arrayMeals;
    case 'Drinks':
      return arrayDrinks;
    default:
      return all;
    }
  };

  const renderTopText = (strMeal, strArea, strCategory, strAlcoholic) => {
    const textMeal = `${strArea} - ${strCategory}`;
    const textDrink = `${strAlcoholic}`;
    if (strMeal) {
      return textMeal;
    }
    return (
      textDrink
    );
  };

  const filterTags = (tags, index) => {
    if (tags) {
      const resultado = tags.split(',');
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
        { idMeal,
          idDrink,
          strMealThumb,
          strDrinkThumb,
          strMeal,
          strDrink,
          strCategory,
          strArea,
          strTags,
          strAlcoholic },
        index,
      ) => (
        <section key={ index }>
          <hr />
          <Link to={ strMeal ? `comidas/${idMeal}` : `bebidas/${idDrink}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ strMealThumb || strDrinkThumb }
              alt={ strMealThumb || strDrinkThumb }
            />
            <p data-testid={ `${index}-horizontal-name` }>{strMeal || strDrink}</p>
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {renderTopText(strMeal, strArea, strCategory, strAlcoholic)}
          </span>
          <span>
            <img
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="share"
            />
          </span>
          <p data-testid={ `${index}-horizontal-done-date` }>Feita em: 23/06/2020</p>
          {filterTags(strTags, index)}
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
  all: PropTypes.arrayOf.isRequired,
  filter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DoneCard);
