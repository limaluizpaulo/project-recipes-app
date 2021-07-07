import React, { useContext } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksContext from '../context/DrinksContext';
import { fetchRandomDrink } from '../services/DrinksServices';

import '../styles/ExploreDrinks.css';

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
    <>
      <section className="explore-section">
        <Header profile name="Explorar Bebidas" />
        <Container>
          <ButtonGroup className="buttons-explore-drinks">
            <Button
              data-testid="explore-by-ingredient"
              variant="danger"
              size="lg"
              onClick={ () => history.push('/explorar/bebidas/ingredientes') }
            >
              Por Ingredientes
            </Button>

            <Button
              data-testid="explore-surprise"
              variant="danger"
              size="lg"
              onClick={ () => redirectToDrinkDetails() }
            >
              Me Surpreenda!
            </Button>
          </ButtonGroup>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default ExploreDrinks;
