import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../helpers/Button';
import { getRandomRecipe } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';

function ExploreRecipes() {
  const history = useHistory();
  const { pathname } = useLocation();
  const food = pathname.includes('bebidas') ? 'Bebidas' : 'Comidas';
  const { type } = useContext(RecipesContext);

  const getRandom = async () => {
    const typeId = food === 'Comidas' ? 'idMeal' : 'idDrink';
    const results = await getRandomRecipe(type);
    const recipe = results[0];
    history.push(`/${food.toLowerCase()}/${recipe[typeId]}`);
  };

  return (
    <div>
      <Header title={ `Explorar ${food}` } />
      <Button
        label="Por Ingredientes"
        testid="explore-by-ingredient"
        func={ () => history.push(`/explorar/${food.toLowerCase()}/ingredientes`) }
      />
      <Button
        label="Por Local de Origem"
        testid="explore-by-area"
        func={ () => history.push(`/explorar/${food.toLowerCase()}/area`) }
      />
      <Button
        label="Me Surpreenda!"
        testid="explore-surprise"
        func={ getRandom }
      />
      <Footer />
    </div>
  );
}

export default ExploreRecipes;
