import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import ButtonCompartilhar from '../components/ButtonCompartilhar';

export default function ReceitasFeitas() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const [tipoFiltro, setTipoFiltro] = useState('All');
  const history = useHistory();

  const filterCategory = () => (tipoFiltro !== 'All' ? doneRecipes
    .filter((receita) => tipoFiltro === receita.type) : doneRecipes);

  const redirecionaDetalhesReceita = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  const renderCards = (
    { image, category, name, doneDate, tags, id, type, area, alcoholicOrNot }, index,
  ) => {
    if (type === 'comida') {
      return (
        <Col key={ id }>
          <Card>
            <Card.Img
              variant="top"
              src={ image }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => redirecionaDetalhesReceita(type, id) }
            />
            <Card.Body>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category}`}
              </span>
              <ButtonCompartilhar dados={ { index, id, type } } />
              <Card.Title
                onClick={ () => redirecionaDetalhesReceita(type, id) }
                data-testid={ `${index}-horizontal-name` }
              >
                {name}
              </Card.Title>
              <Card.Text
                data-testid={ `${index}-horizontal-done-date` }
              >
                {doneDate}
              </Card.Text>
              {tags.map((tagName, i) => (
                <Card.Link
                  key={ i }
                  href="#"
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  {tagName}
                </Card.Link>
              ))}
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return (
      <Col key={ id }>
        <Card>
          <Card.Img
            variant="top"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
            onClick={ () => redirecionaDetalhesReceita(type, id) }
          />
          <Card.Body>
            <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
            <ButtonCompartilhar dados={ { index, id, type } } />
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => redirecionaDetalhesReceita(type, id) }
            >
              {name}
            </Card.Title>
            <Card.Text
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneDate}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Header />
      <aside>
        <Button
          variant="dark"
          data-testid="filter-by-all-btn"
          onClick={ () => setTipoFiltro('All') }
        >
          All
        </Button>
        <Button
          variant="dark"
          data-testid="filter-by-food-btn"
          onClick={ () => { setTipoFiltro('comida'); } }
        >
          Food
        </Button>
        <Button
          variant="dark"
          data-testid="filter-by-drink-btn"
          onClick={ () => setTipoFiltro('bebida') }
        >
          Drinks
        </Button>
      </aside>
      <Row>
        {filterCategory().map((receita, index) => (
          renderCards(receita, index)
        ))}
      </Row>
    </Container>
  );
}
