import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Fooder from '../components/fooder';

class Comidas extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Header location={ location } />
        <p>qualquer coisa</p>
        <Fooder />
      </div>
    );
  }
}

Comidas.propTypes = {
  location: PropTypes.shape.isRequired,
};
export default Comidas;
