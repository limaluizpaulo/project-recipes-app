import React from 'react';
import { getItem } from '../helpers/HelperFunctions';
import Button from '../helpers/Button';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

function ReceitasFeitas() {
  const doneRecipesStorage = getItem('doneRecipes');
  return doneRecipesStorage && (
    <>
      <Header title="Refeitas Feitas" />
      <section>
        <Button testid="filter-by-all-btn" label="All" />
        <Button testid="filter-by-food-btn" label="Food" />
        <Button testid="filter-by-drink-btn" label="Drinks" />
      </section>
      <section>
        {doneRecipesStorage.map((recipe, index) => (
          <DoneCard
            index={ index }
            key={ recipe.id }
            title={ recipe.name }
            area={ recipe.area }
            category={ recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
              : recipe.category }
            thumbnail={ recipe.image }
            doneDate={ recipe.doneDate }
            url={ recipe.url }
            id={ recipe.id }
            tags={ recipe.tags }
          />
        ))}
      </section>
    </>
  );
}

export default ReceitasFeitas;
