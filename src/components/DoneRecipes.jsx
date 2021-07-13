import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class DoneRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
    };
    this.handleFilterFoods = this.handleFilterFoods.bind(this);
    this.handleFilterDrinks = this.handleFilterDrinks.bind(this);
    this.handleFilterAll = this.handleFilterAll.bind(this);
  }

  componentDidMount() {
    this.handleFilterAll();
  }

  handleFilterAll() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes: allRecipes,
    });
  }

  handleFilterFoods() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'comidas'),
    });
  }

  handleFilterDrinks() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'bebidas'),
    });
  }

  render() {
    const { doneRecipes } = this.state;
    return (
      <section>
        <section>
          <button
            type="button"
            onClick={ this.handleFilterAll }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            onClick={ this.handleFilterFoods }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            onClick={ this.handleFilterDrinks }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </section>
        { doneRecipes.map((elem, index) => (
          <Card
            key={ index }
            style={ {
              width: '21.5rem',
              height: '12rem',
              justifyContent: 'center',
            } }
          >
            <Container>
              <Row style={ { alignItems: 'center' } }>
                <Col xs={ 4 }>
                  <Link to={ `/${elem.type}/${elem.id}` }>
                    <Card.Img
                      style={ { width: '6.8rem' } }
                      src={ elem.image }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                </Col>
                <Col xs={ 8 } style={ { textAlign: 'center' } }>
                  <Card.Text>
                    { elem.alcoholicOrNot }
                  </Card.Text>
                  <Card.Text>
                    { elem.area }
                  </Card.Text>
                  <Link to={ `/${elem.type}/${elem.id}` }>
                  <Card.Title
                    data-testid={`${index}-horizontal-name`}
                  >
                    { elem.name }
                  </Card.Title>
                  </Link>
                  <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                    { elem.category }
                  </Card.Text>
                  <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                    { `Feito em: ${elem.doneDate}` }
                  </Card.Text>
                  <Card.Text data-testid={ `${index}-horizontal-tag` }>
                    { elem.tags }
                  </Card.Text>
                </Col>
              </Row>
            </Container>
          </Card>
        ))}
      </section>
    );
  }
}

export default DoneRecipes;
