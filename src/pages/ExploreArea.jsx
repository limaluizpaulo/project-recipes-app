import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../contexts/RecipesContext';
import { getMealsAreas, getMealsByArea, getMealsRecipes } from '../helpers/MealsAPI';

export default function ExploreArea() {
  const [isFetching, setIsFetching] = useState(true);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [recipesByArea, setRecipesByArea] = useState([]);
  const { type, maxCards } = useContext(RecipesContext);

  useEffect(() => {
    const getArea = async () => {
      setIsFetching(true);
      const results = await getMealsAreas(type);
      setAreas(results.map((meal) => meal.strArea));
      setIsFetching(false);
    };
    getArea();
  }, []);

  useEffect(() => {
    const fetchRecipesByArea = async () => {
      setIsFetching(true);
      const results = selectedArea === 'All'
        ? await getMealsRecipes(type) : await getMealsByArea(selectedArea, type);
      setRecipesByArea(results.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };
    fetchRecipesByArea();
  }, [selectedArea]);

  return isFetching ? <p>Laoding</p> : (
    <>
      <Header title="Explorar Origem" hasSearchBar />
      <section>
        <form>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ ({ target }) => setSelectedArea(target.value) }
            value={ selectedArea }
          >
            <option
              data-testid="All-option"
              key="All"
              value="All"
            >
              All
            </option>
            {areas && areas.map((area) => (
              <option
                data-testid={ `${area}-option` }
                key={ area }
                value={ area }
              >
                {area}
              </option>
            ))}
            )
          </select>
        </form>
        {
          recipesByArea && recipesByArea.map((recipe, index) => (
            <Card
              className={ `recipe-card ${type}` }
              index={ index }
              id={ recipe.idMeal }
              key={ recipe.strMeal }
              thumbnail={ recipe.strMealThumb }
              title={ recipe.strMeal }
            />
          ))
        }
      </section>
      <Footer />
    </>
  );
}
