import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MainScreen from '../components/MainScreen';

// import Cards from '../components/cards';
import Fooder from '../components/footer';

class Comidas extends Component {
  render() {
    const { location } = this.props;
    return (
<<<<<<< HEAD
      <div>
        <Header location={ location } />
=======
      <main>
        <Header />
        <MainScreen />
      </main>
>>>>>>> d061ba01f296128333036b57914a186a2a03daa8
        <p>qualquer coisa</p>
        <Fooder />
      </div>
    );
  }
}
<<<<<<< HEAD

Comidas.propTypes = {
  location: PropTypes.shape.isRequired,
};
export default Comidas;
=======
export default (Comidas);
>>>>>>> d061ba01f296128333036b57914a186a2a03daa8
