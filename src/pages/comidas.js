import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';

class comidas extends Component {
  render() {
    const { match: { params: { comidaId } } } = this.props;
    return (
      <section>
        <h3>Detalhes Comidas</h3>
        <RecipeDetails id={ comidaId } title="Comida" />
      </section>
    );
  }
}

comidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default comidas;
