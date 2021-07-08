import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Card from './Card';

function FilteredList({ filteredDrinks, filteredRecipes }) {
  const { location: { pathname } } = useHistory();

  const NUMBER_OF_ITEMS = 12;

  function invokeAlert(fn, message) {
    fn(message);
  }

  function renderFilteredRecipes() {
    if (filteredRecipes) {
      return (
        <section className="cards-field">
          {
            filteredRecipes.slice(0, NUMBER_OF_ITEMS)
              .map((recipe, index) => (<Card
                data-testid={ `${index}-recipe-card` }
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
              />))
          }
        </section>
      );
    }
    invokeAlert(alert,
      'Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  function renderFilteredDrinks() {
    if (filteredDrinks) {
      return (
        <section className="cards-field">
          {
            filteredDrinks.slice(0, NUMBER_OF_ITEMS)
              .map((drink, index) => (<Card
                data-testid={ `${index}-recipe-card` }
                key={ drink.idDrink }
                drink={ drink }
                index={ index }
              />))
          }
        </section>
      );
    }
    invokeAlert(alert,
      'Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <section className="cards-field">
      {
        pathname.includes('/comidas')
          ? renderFilteredRecipes()
          : renderFilteredDrinks()
      }
    </section>
  );
}

FilteredList.propTypes = {
  filteredDrinks: PropTypes.string,
  filteredRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilteredList.defaultProps = {
  filteredDrinks: undefined,
};

export default FilteredList;
