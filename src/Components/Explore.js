import React, { Component } from 'react';
import { Redirect } from 'react-router';

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

    if (redirect) {
      return (
        <Redirect to={ `/explorar/${recipeType}` } />
      );
    }

    return (
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
    );
  }
}
