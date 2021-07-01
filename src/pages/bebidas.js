import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

class bebidas extends Component {
  render() {
    const { match: { params: { bebidaId } } } = this.props;
    return (
      <section>
        <h3>Detalhes Bebida</h3>
        <RecipeDetails id={ bebidaId } title="Bebida" />
      </section>
    );
  }
}

bebidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default bebidas;
