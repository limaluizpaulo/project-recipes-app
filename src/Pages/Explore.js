import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default class Explore extends Component {
  constructor() {
    super();

    this.state = {
      recipeType: '',
      redirect: false,
    };

    this.handleChangeOnClick = this.handleChangeOnClick.bind(this);
  }

  handleChangeOnClick({ target }) {
    this.setState({
      recipeType: target.id,
      redirect: true,
    });
  }

  render() {
    const { recipeType, redirect } = this.state;
    const { location: { pathname } } = this.props;

    if (redirect) {
      return (
        <Redirect to={ `/explorar/${recipeType}` } />
      );
    }

    return (
      <div>
        <Header pathname={ pathname } />
        <main>
          <button
            id="comidas"
            type="button"
            data-testid="explore-food"
            onClick={ (e) => this.handleChangeOnClick(e) }
          >
            Explorar Comidas
          </button>
          <button
            id="bebidas"
            type="button"
            data-testid="explore-drinks"
            onClick={ (e) => this.handleChangeOnClick(e) }
          >
            Explorar Bebidas
          </button>
        </main>
        <Footer />
      </div>
    );
  }
}

Explore.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
