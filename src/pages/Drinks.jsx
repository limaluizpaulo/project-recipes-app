import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import DrinksContext from '../context/DrinksContext';
import FilteredList from '../components/FilteredList';
import Card from '../components/Card';

function Drinks() {
  const { drinksFilter: { filteredDrinks },
    allDrinks: { drinks }, allCategories: { categories } } = useContext(DrinksContext);
  const history = useHistory();
  const NUMBER_OF_ITEMS = 12;
  const NUMBER_OF_CATEGORIES = 5;

  useEffect(() => {
    if (filteredDrinks && filteredDrinks.length === 1) {
      history.push(`/bebidas/${filteredDrinks[0].idDrink}`);
    }
  }, [filteredDrinks, history]);

  function renderDrinksDefault() {
    return (
      <div>
        {
          drinks.slice(0, NUMBER_OF_ITEMS)
            .map((drink, index) => (<Card
              key={ drink.idDrink }
              drink={ drink }
              index={ index }
            />))
        }
      </div>
    );
  }

  function renderButtonCategories() {
    return (
      <div>
        {
          categories.slice(0, NUMBER_OF_CATEGORIES)
            .map((category, index) => (
              <Button
                key={ index }
                data-testid={ `${category.strCategory}-category-filter` }
              >
                {category.strCategory}
              </Button>
            ))
        }
      </div>
    );
  }

  return (
    <>
      <h1>Bebidas</h1>
      <SearchBar />
      {renderButtonCategories()}
      {
        filteredDrinks.length === 0
          ? renderDrinksDefault()
          : <FilteredList filteredDrinks={ filteredDrinks } />
      }
    </>
  );
}

export default Drinks;
