import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from '../components/header';

import '../css/TelaDeFavoritas.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TelaDeFavoritas extends Component {
  render() {
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];

    const { location } = this.props;
    return (
      <section>
        <Header location={ location } />
        <section>AQUI FICARÁ OS FILTROS!!!</section>
        <section>
          {
            favoriteRecipes.map(({
              type, name, id, image, area, category, alcoholicOrNot,
            }, index) => (
              <Card key={ name } className="favorite-card">
                <Link to={ type === 'comida' ? `comidas/${id}` : `bebidas/${id}` }>
                  <Card.Img
                    className="favorite-card-img"
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                  />
                </Link>
                <Card.Body className="favorite-card-body">
                  <Link to={ type === 'comida' ? `comidas/${id}` : `bebidas/${id}` }>
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
                </Card.Body>
              </Card>
            ))
          }
        </section>
      </section>
    );
  }
}

TelaDeFavoritas.propTypes = {
  location: PropTypes.shape.isRequired,
};

export default TelaDeFavoritas;
