import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MainScreen from '../components/MainScreen';

import Cards from '../components/cards';
import Fooder from '../components/footer';

class Comidas extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <Header />
          <MainScreen />
        </main>
        <p>qualquer coisa</p>
        <Fooder />
      </div>
    );
  }
}

Comidas.propTypes = {
  location: PropTypes.shape.isRequired,
};
// export default Comidas;
export default (Comidas);
