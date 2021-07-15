import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Group26 from '../images/Group26.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cards.css';

export default function Cards({ id, img, title, index, url }) {
  // const { id, img, title, index, url } = this.props;
  return (
    <Link to={ `${url}/${id}` }>
      <Card
        className="principal-card-content"
        data-testid={ `${index}-recipe-card` }
      >
        <div className="img-content">
          <img className="group-26" src={ Group26 } alt={ Group26 } />
          <div className="img-wrap">
            <Card.Img
              className="principal-card-img"
              variant="top"
              src={ img }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </div>
        <Card.Body className="principal-card-body">
          <Card.Title
            className="principal-card-title"
            data-testid={ `${index}-card-name` }
          >
            { title }
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
