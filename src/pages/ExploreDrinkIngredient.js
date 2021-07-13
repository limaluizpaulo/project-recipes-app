import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { exploreIngredientsDrink } from '../services/api';
import { drinkByIngredient } from '../services/searchApi';
import '../styles/ExploreDrinkAndFoodIngredient(page).css';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinkIngredient() {
  const { firstDrinkIngredients,
    setFirstDrinkIngredients,
    setDrinkPerIngredient,
    changeDrink,
    setChangeDrink } = useContext(Context);
  const numOfIngredients = 12;

  useEffect(() => {
    const fetchDrinkIngredients = async () => {
      const drinks = await exploreIngredientsDrink();
      setFirstDrinkIngredients(drinks.slice(0, numOfIngredients));
    };
    fetchDrinkIngredients();
  }, [setFirstDrinkIngredients]);

  async function handleClick({ target }) {
    setChangeDrink(!changeDrink);
    const { drinks } = await drinkByIngredient(target.alt);
    setDrinkPerIngredient(drinks.slice(0, numOfIngredients));
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="ingredient-container">
        {firstDrinkIngredients.map((ingredient, index) => (
          <Link
            to="/bebidas"
            key={ index }
          >
            <Card
              onClick={ handleClick }
              data-testid={ `${index}-ingredient-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient1 }
              />
              <Card.Body>
                <Card.Title
                  className="ingredientCard-title"
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient.strIngredient1}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredient;
