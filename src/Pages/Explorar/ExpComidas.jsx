import React, { useContext } from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../../context/Context';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import { fetchMealRandom } from '../../apis/MealsApis';

export default function ExpComidas() {
  const { openSearchBar } = useContext(Context);
  const history = useHistory();

  const getMealRandom = async () => {
    const { meals } = await fetchMealRandom();
    // const randomMealJSON = await randomMeal.json();
    return history.push(`/comidas/${meals[0].idMeal}`);
  };

  return (
    <Container>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <ButtonGroup vertical>
        <Button
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          data-testid="explore-by-ingredient"
          variant="outline-primary"
          size="lg"
          className="mb-2"
        >
          Por Ingredientes
        </Button>
        <Button
          onClick={ () => history.push('/explorar/comidas/area') }
          data-testid="explore-by-area"
          variant="outline-danger"
          size="lg"
          className="mb-2"
        >
          Por Local de Origem
        </Button>
        <Button
          data-testid="explore-surprise"
          variant="outline-dark"
          size="lg"
          className="mb-2"
          // onClick={ () => history.push(`/comidas/${id}`) }
          onClick={ () => getMealRandom() }
        >
          Me Surpreenda!
        </Button>
        {/* <Button
          href="/explorar/"
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
