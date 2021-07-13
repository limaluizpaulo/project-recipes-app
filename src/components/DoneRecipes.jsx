import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import { Col, Container, Row } from 'react-bootstrap';

class DoneRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
      ids: [],
    };
    this.handleFilterFoods = this.handleFilterFoods.bind(this);
    this.handleFilterDrinks = this.handleFilterDrinks.bind(this);
    this.handleFilterAll = this.handleFilterAll.bind(this);
    this.renderMsg = this.renderMsg.bind(this);
  }

  componentDidMount() {
    this.handleFilterAll();
  }

  handleFilterAll() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    this.setState({
      doneRecipes: allRecipes,
    });
  }

  handleFilterFoods() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'comida'),
    });
  }

  handleFilterDrinks() {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes: allRecipes.filter((elem) => elem.type === 'bebida'),
    });
  }

  renderMsg(id) {
    this.setState({ ids: id });
  }

  render() {
    const { doneRecipes, ids } = this.state;
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
        {
          doneRecipes.map(({
            type, name, id, image, area, category, alcoholicOrNot, doneDate, tags,
          }, index) => (
            <Card key={ name } className="favorite-card">
              <Link to={ `${type}s/${id}` }>
                <Card.Img
                  className="favorite-card-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                />
              </Link>
              <Card.Body className="favorite-card-body">
                <Link to={ `${type}s/${id}` }>
                  <Card.Subtitle
                    data-testid={ `${index}-horizontal-top-text` }
                    className="favorite-card-subtitle"
                  >
                    {
                      (type === 'comida') ? `${area} - ${category}`
                        : alcoholicOrNot
                    }
                  </Card.Subtitle>
                  <Card.Title
                    className="favorite-card-title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </Card.Title>
                </Link>
                <section className="favorite-buttons">
                  <button
                    type="button"
                    className="favorite-btn-share"
                    onClick={ () => copy(`http://localhost:3000/${type}s/${id}`)
                      .then(() => this.renderMsg(id)) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt={ shareIcon }
                    />
                  </button>
                  {ids.includes(id) && <p>Link copiado!</p>}
                </section>
                <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                  {doneDate}
                </Card.Text>
                {tags.map((el) => (
                  <Card.Text
                    key={ el }
                    data-testid={ `data-testid=${index}-${el}-horizontal-tag` }
                  >
                    {el}
                  </Card.Text>))}

              </Card.Body>
            </Card>
          ))
        }
        {/* { doneRecipes.map((elem, index) => (
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
                      data-testid={ `${index}-horizontal-name` }
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
        ))} */}
      </section>
    );
  }
}

export default DoneRecipes;
