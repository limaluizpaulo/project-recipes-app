import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaRecipes, fetchRecipesByArea } from '../services/RecipesServices';
import RecipesContext from '../context/RecipesContext';

import '../styles/ExploreFoodArea.css';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);
  const [valueArea, setValueArea] = useState('All');
  const [recipesByArea, setRecipesByArea] = useState([]);

  const { allRecipes: { recipes } } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    async function getAreas() {
      const data = await fetchAreaRecipes();
      const areasItens = data.meals.map((area) => area.strArea);
      setAreas(areasItens);
    }

    getAreas();
  }, []);

  useEffect(() => {
    async function getRecipesByArea() {
      const NUMBER_OF_RECIPES = 12;
      if (valueArea !== 'All') {
        const data = await fetchRecipesByArea(valueArea);
        const twelveRecipes = data.meals.slice(0, NUMBER_OF_RECIPES);
        setRecipesByArea(twelveRecipes);
      } else {
        setRecipesByArea(recipes.slice(0, NUMBER_OF_RECIPES));
      }
    }

    getRecipesByArea();
  }, [valueArea, recipes]);

  function handleChange(event) {
    const { value } = event.target;

    setValueArea(value);
  }

  function redirectToRecipe(id) {
    history.push(`/comidas/${id}`);
  }

  return (
    <section className="explore-section-ingredients">
      <Header profile name="Explorar Origem" search />
      <section className="explore-section-area">

        <Form className="input-select">
          <select
            className="select"
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
          >
            <option data-testid="All-option" value="All">All</option>
            {
              areas.map((area, index) => (
                <option
                  data-testid={ `${area}-option` }
                  key={ index }
                  value={ area }
                >
                  {area}
                </option>
              ))
            }
          </select>
        </Form>

        <section className="areas-field">
          {
            recipesByArea.map((recipe, index) => (
              <Button
                key={ index }
                variant
                type="button"
                className="area-ingredient"
                onClick={ () => redirectToRecipe(recipe.idMeal) }
              >
                <Card
                  style={ { background: '#dc35463d', height: '100%', width: '12rem' } }
                  border="danger"
                  data-testid={ `${index}-recipe-card` }
                >
                  <Card.Img
                    className="area-image"
                    data-testid={ `${index}-card-img` }
                    variant="top"
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                  />
                  <Card.Body className="title-container">
                    <Card.Title
                      data-testid={ `${index}-card-name` }
                      className="card-title"
                    >
                      {recipe.strMeal}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Button>
            ))
          }
        </section>
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodsArea;
