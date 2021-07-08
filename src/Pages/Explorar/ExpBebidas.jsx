import React, { useContext } from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../../context/Context';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import { fetchDrinkRandom } from '../../apis/CocktailsApis';

export default function ExpBebidas() {
  const { openSearchBar } = useContext(Context);
  const history = useHistory();

  const getDrinkRandom = async () => {
    const { drinks } = await fetchDrinkRandom();
    // const randomMealJSON = await randomMeal.json();
    return history.push(`/bebidas/${drinks[0].idDrink}`);
  };

  return (
    <Container>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <ButtonGroup vertical>
        <Button
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          data-testid="explore-by-ingredient"
          variant="outline-primary"
          size="lg"
          className="mb-2"
        >
          Por Ingredientes
        </Button>
        <Button
          // onClick={ () => history.push(`/bebidas/${id}`) }
          onClick={ () => getDrinkRandom() }
          data-testid="explore-surprise"
          variant="outline-dark"
          size="lg"
          className="mb-2"
        >
          Me Surpreenda!
        </Button>
        {/* <Button
          href="/explorar"
          variant="danger"
          size="lg"
          className="mb-2"
        >
          Voltar
        </Button> */}
      </ButtonGroup>
      <Footer />
    </Container>
  );
}
