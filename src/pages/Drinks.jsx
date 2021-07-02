import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import FilteredList from '../components/FilteredList';
import Card from '../components/Card';
import Header from '../components/Header';

import '../styles/Card.css';

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

  function renderDrinksDefault() {
    if (!drinksByCategory && isFiltred === false) {
      return (
        <section className="cards-field">
          {
            drinks.slice(0, NUMBER_OF_ITEMS)
              .map((drink, index) => (<Card
                key={ drink.idDrink }
                drink={ drink }
                index={ index }
              />))
          }
        </section>
      );
    }
    return (
      <section className="cards-field">
        {
          drinksByCategory.slice(0, NUMBER_OF_ITEMS)
            .map((drink2, index2) => (<Card
              key={ drink2.idDrink }
              drink={ drink2 }
              index={ index2 }
            />))
        }
      </section>
    );
  }

  function renderButtonCategories() {
    return (
      <section className="category-field">
        <button
          type="button"
          className="btn-category btn btn-primary"
          data-testid="All-category-filter"
          onClick={ (event) => setCategory(event.target.innerText) }
        >
          All
        </button>
        {
          categories.slice(0, NUMBER_OF_CATEGORIES)
            .map((categoryDrinks, index) => (
              <button
                type="button"
                className="btn-category btn btn-primary"
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
              </button>
            ))
        }
      </section>
    );
  }

  return (
    <>
      <Header profile name="Bebidas" search />

      {renderButtonCategories()}

      {
        isFiltred ? <FilteredList filteredDrinks={ filteredDrinks } />
          : renderDrinksDefault()
      }
    </>
  );
}

export default Drinks;
