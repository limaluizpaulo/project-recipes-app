import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const { index, item, type, title } = props;
  const dbType = type === 'meal' ? 'Meal' : 'Drink';

  return (
    <Link
      to={ `/${title}/${item[`id${dbType}`]}` }
      className="card"
      style={ { width: '7rem',
    height: '5rem' } }
    >
      <div className="card-body" data-testid={ `${index}-recipe-card` }>
        <img
          src={ item[`str${dbType}Thumb`] }
          alt={ `${dbType}` }
          data-testid={ `${index}-card-img` }
          height="30px"
        />
        <div
          className="card-subtitle titulos"
          data-testid={ `${index}-card-name` }
        >
          {item[`str${dbType}`]}

        </div>
        {' '}
        <br />
      </div>
    </Link>
  );
}

Card.propTypes = PropTypes.shape({}).isRequired;
