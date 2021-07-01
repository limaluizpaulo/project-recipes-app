import React from 'react';
import { useHistory } from 'react-router';

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
        <div>
          {
            filteredRecipes.slice(0, NUMBER_OF_ITEMS)
              .map((recipe, index) => (<Card
                data-testid={ `${index}-recipe-card` }
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
              />))
          }
        </div>
      );
    }
    invokeAlert(alert,
      'Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  function renderFilteredDrinks() {
    if (filteredDrinks) {
      return (
        <div>
          {
            filteredDrinks.slice(0, NUMBER_OF_ITEMS)
              .map((drink, index) => (<Card
                data-testid={ `${index}-recipe-card` }
                key={ drink.idDrink }
                drink={ drink }
                index={ index }
              />))
          }
        </div>
      );
    }
    invokeAlert(alert,
      'Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <section>
      {
        pathname.includes('/comidas')
          ? renderFilteredRecipes()
          : renderFilteredDrinks()
      }
    </section>
  );
}

export default FilteredList;
