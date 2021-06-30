import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesByOrigin extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2> Recipes By Origin</h2>
        <DownMenu />
      </div>
    );
  }
}

export default RecipesByOrigin;
