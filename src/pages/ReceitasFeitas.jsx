import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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
              <span>{`${area} - `}</span>
              <span data-testid={ `${index}-horizontal-top-text` }>{category}</span>
              <Button variant="ligth" data-testid={ `${index}-horizontal-share-btn` }>
                <Card.Img src={ shareIcon } />
              </Button>
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
            <span>{alcoholicOrNot}</span>
            <Button variant="ligth" data-testid={ `${index}-horizontal-share-btn` }>
              <Card.Img src={ shareIcon } />
            </Button>
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

  return (
    <Container>
      <Header />
      <aside>
        <Button variant="dark" data-testid="filter-by-all-btn">All</Button>
        <Button variant="dark" data-testid="filter-by-food-btn">Food</Button>
        <Button variant="dark" data-testid="filter-by-drink-btn">Drinks</Button>
      </aside>
      <Row>
        {doneRecipes.map((receita, index) => (
          renderCards(receita, index)
        ))}
      </Row>
    </Container>
  );
}
