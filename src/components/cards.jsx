import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cards.css';
import { Link } from 'react-router-dom';

class cards extends Component {
  render() {
    const { id, img, title, index, url } = this.props;
    console.log(id, title, url);
    return (
      <Link to={ `${url}/${id}` }>
        <Card
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            variant="top"
            src={ img }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>{ title }</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

cards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default cards;
