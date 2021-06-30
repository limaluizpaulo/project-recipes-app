import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

class cards extends Component {
  render() {
    const { info } = this.props;
    return (
      <Card style={ { width: '5rem' } }>
        <Card.Img variant="top" src={ info.strMealThumb } />
        <Card.Body>
          <Card.Title>{ info.strMeal }</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

cards.propTypes = {
  info: PropTypes.shape.isRequired,
};

export default cards;
