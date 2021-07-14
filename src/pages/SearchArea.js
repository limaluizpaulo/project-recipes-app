import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import RecipeCard from '../components/RecipeCard';

const SearchArea = () => {
  const magic = 12;
  const { area, meals: m, recipes, setSearchOp } = useContext(GlobalContext);
  const [filter, setFilter] = useState('');
  const meals = filter && recipes.meals ? recipes.meals : m;
  const mealsFilter = meals.slice(0, magic);

  const dropBox = () => {
    const all = { strArea: 'All' };
    const options = [all, ...area];
    return (
      <select
        onChange={ ({ target: { value } }) => {
          console.log('value', value);
          setFilter(value);
          setSearchOp({ inputSearch: value, option: 'area', food: true });
        } }
        value={ filter }
        data-testid="explore-by-area-dropdown"
      >
        {options.map(({ strArea }) => (
          <option data-testid={ `${strArea}-option` } key={ strArea } value={ strArea }>
            {strArea}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div>
      <Header title="Explorar Origem" search />
      <h1 className="title">Search Area</h1>
      {dropBox()}
      <button type="button" data-testid="All-option" onClick={ () => setFilter('') }>
        All
      </button>
      <RecipeCard recipes={ mealsFilter } />
      <Footer />
    </div>
  );
};

export default SearchArea;
