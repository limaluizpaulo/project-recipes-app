import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksContext from '../context/DrinksContext';
import { fetchRandomDrink } from '../services/DrinksServices';

function ExploreDrinks() {
  const { setRandomDrink } = useContext(DrinksContext);

  const history = useHistory();

  async function redirectToDrinkDetails() {
    const drink = await fetchRandomDrink();
    const randomDrink = drink.drinks;

    setRandomDrink(randomDrink);

    const { idDrink } = randomDrink[0];

    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <Container>
      <Header profile name="Explorar Bebidas" />

      <Container>
        <Container>

          <Button
            data-testid="explore-by-ingredient"
            variant="outline-secondary"
            size="lg"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          >
            Por Ingredientes
          </Button>
        </Container>

        <Container>

          <Button
            data-testid="explore-surprise"
            variant="outline-secondary"
            size="lg"
            onClick={ () => redirectToDrinkDetails() }
          >
            Me Surpreenda!

          </Button>
        </Container>

      </Container>

      <Footer />
    </Container>
  );
}

export default ExploreDrinks;
