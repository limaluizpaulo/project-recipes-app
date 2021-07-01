import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes } from '../actions';
import CardItem from '../components/CardItem';

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
    const { listRecipes } = this.props;
    if (!listRecipes) return (<h3>Loading...</h3>);
    return (
      <>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        {listRecipes.map(({ strMealThumb, strMeal }, index) => (
          <CardItem
            key={ index }
            index={ index }
            name={ strMeal }
            image={ strMealThumb }
          />))}
        <DownMenu />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
});
const mapStateToProps = (state) => ({
  listRecipes: state.recipes.recipes,
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  listRecipes: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
