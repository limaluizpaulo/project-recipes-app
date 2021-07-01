import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import DrinksContext from '../context/DrinksContext';
import FilteredList from '../components/FilteredList';
import Card from '../components/Card';

function Drinks() {
  const { drinksFilter: { filteredDrinks },
    allDrinks: { drinks }, allCategories: { categories }, drinksFilteredByCategory:
    { drinksByCategory }, setCategory, category, setIsFiltred, isFiltred,
  } = useContext(DrinksContext);

  const history = useHistory();
  const NUMBER_OF_ITEMS = 12;
  const NUMBER_OF_CATEGORIES = 5;

  useEffect(() => {
    if (filteredDrinks && filteredDrinks.length === 1) {
      history.push(`/bebidas/${filteredDrinks[0].idDrink}`);
    }
  }, [filteredDrinks, history]);

  useEffect(() => {

  }, []);
  function renderDrinksDefault() {
    if (drinksByCategory.length === 0 && isFiltred === false) {
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
    return (
      <div>
        {
          drinksByCategory.slice(0, NUMBER_OF_ITEMS)
            .map((drink2, index2) => (<Card
              key={ drink2.idDrink }
              drink={ drink2 }
              index={ index2 }
            />))
        }
      </div>
    );
  }

  function renderButtonCategories() {
    return (
      <div>
        <Button
          data-testid="All-category-filter"
          onClick={ (event) => setCategory(event.target.innerText) }
        >
          All
        </Button>
        {
          categories.slice(0, NUMBER_OF_CATEGORIES)
            .map((categoryDrinks, index) => (
              <Button
                key={ index }
                data-testid={ `${categoryDrinks.strCategory}-category-filter` }
                onClick={ (event) => {
                  setIsFiltred(false);
                  if (category === event.target.innerText) {
                    setCategory('All');
                  } else {
                    setCategory(event.target.innerText);
                  }
                } }
              >
                {categoryDrinks.strCategory}
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
        isFiltred ? <FilteredList filteredDrinks={ filteredDrinks } />
          : renderDrinksDefault()
      }

    </>
  );
}

export default Drinks;
