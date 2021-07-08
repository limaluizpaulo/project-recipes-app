import React, { useState } from 'react';
import
{ Container, Button, Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const [tipoFiltro, setTipoFiltro] = useState('All');
  const mensagem = (props) => (
    <Tooltip
      id="mensagem"
      { ...props }
    >
      Link copiado!
    </Tooltip>
  );

  const compartilhar = (mens, index, id, type) => {
    const typeURL = type === 'comida' ? type : 'bebida';
    return (
      <OverlayTrigger
        placement="right"
        delay={ { show: 250, hide: 400 } }
        overlay={ mens }
      >
        <Button variant="ligth" onClick={ () => copy(`http://localhost:3000/${typeURL}s/${id}`) }>
          <Card.Img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </Button>
      </OverlayTrigger>
    );
  };

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
            />
            <Card.Body>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category}`}
              </span>
              {compartilhar(mensagem, index, id, type)}
              <Card.Title data-testid={ `${index}-horizontal-name` }>{name}</Card.Title>
              <Card.Text
                data-testid={ `${index}-horizontal-done-date` }
              >
                {doneDate}
              </Card.Text>
              {tags.map((tagName) => (
                <Card.Link
                  key={ index }
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
          />
          <Card.Body>
            <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
            {compartilhar(mensagem, index, id, type)}
            <Card.Title data-testid={ `${index}-horizontal-name` }>{name}</Card.Title>
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

  const filterCategory = () => (tipoFiltro !== 'All' ? doneRecipes
    .filter((receita) => tipoFiltro === receita.type) : doneRecipes);

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
          onClick={ () => setTipoFiltro('comida') }
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
