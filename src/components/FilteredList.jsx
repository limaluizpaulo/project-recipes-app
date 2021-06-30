import React from 'react';
import { useHistory } from 'react-router';
import Card from './Card';

function FilteredList({ filteredDrinks, filteredRecipes }) {
  const { location: { pathname } } = useHistory();

  const NUMBER_OF_ITEMS = 12;
  return (
    <section>
      {
        pathname.includes('/comidas')
          ? (
            <div>
              {
                filteredRecipes.slice(0, NUMBER_OF_ITEMS)
                  .map((recipe, index) => (<Card
                    data-testid={ `${index}-recipe-card` }
                    key={ recipe.idrecipe }
                    recipe={ recipe }
                    index={ index }
                  />))
              }
            </div>
          )
          : (
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
          )
      }
    </section>
  );
}

export default FilteredList;
