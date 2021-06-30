import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes } from '../actions';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.fetchRecipes = this.fetchRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    const { recipes } = this.props;
    recipes();
  }

  render() {
    return (
      <div>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        <DownMenu />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Recipes);
