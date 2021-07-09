import React from 'react';
import PropTypes from 'prop-types';

function Titulo(props) {
  const { type } = props;
  console.log(type);
  // console.log(type[0][`str${type[1][0]}`]);
  return (
    <div className="detailsTitulo">
      <h2 data-testid="recipe-title">{ type[0][`str${type[1][0]}`] }</h2>
      <div className="detSubtitulo">
        <h4>{type[0][`str${type[1][2]}`]}</h4>
        {' - '}
        <h4 data-testid="recipe-category">{type[0][`str${type[1][1]}`]}</h4>
      </div>
      <img
        className="Detailsimg"
        data-testid="recipe-photo"
        src={ type[0][`str${type[1][0]}Thumb`] }
        alt={ type[0][`str${type[1][0]}`] }
      />
    </div>
  );
}

Titulo.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Titulo;
