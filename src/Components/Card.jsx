import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { index, item, type } = props;
  const dbType = type === 'meal' ? 'Meal' : 'Drink';
  return (
    <div className="card" style={ { width: '7rem', height: '5rem' } }>
      <div className="card-body" data-testid={ `${index}-recipe-card` }>
        <div
          className="card-subtitle"
          data-testid={ `${index}-card-name` }
        >
          {item[`str${dbType}`]}

        </div>
        <img
          src={ item[`str${dbType}Thumb`] }
          alt={ `${dbType}` }
          data-testid={ `${index}-card-img` }
          height="30px"
        />
        {' '}
        <br />
      </div>
    </div>
  );
}

Card.propTypes = PropTypes.shape({}).isRequired;
