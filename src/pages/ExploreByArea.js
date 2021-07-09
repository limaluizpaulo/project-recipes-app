import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { fetchFoodAction } from '../actions';
import { fetchAreaAction,
  fetchRecipesFoodAreaAction } from '../actions/ingredientsActions';
import FoodCard from '../components/FoodCard';

class ExploreByArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      area: '',
    };

    this.renderizaArea = this.renderizaArea.bind(this);
    this.filtraArea = this.filtraArea.bind(this);
    this.requisicao = this.requisicao.bind(this);
  }

  componentDidMount() {
    const { getArea } = this.props;
    getArea();
    const { resultFood } = this.props;
    if (resultFood.length === 0) this.requisicao();
  }

  requisicao() {
    const { requestFoodRecipes } = this.props;
    requestFoodRecipes();
  }

  filtraArea(param) {
    const { getRecipesArea } = this.props;
    this.setState({ area: param });

    getRecipesArea(param);
  }

  renderizaArea() {
    const { getFoodArea } = this.props;
    const { area } = this.state;
    return (
      <select
        data-testid="explore-by-area-dropdown"
        id="area"
        value={ area }
        onChange={ (e) => this.filtraArea(e.target.value) }
      >
        { getFoodArea.map((result, index) => (
          <option
            key={ index }
            value={ result.strArea }
            data-testid={ `${result.strArea}-option` }
          >
            { result.strArea }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { loading } = this.state;
    console.log(loading);
    return (
      <>
        <section>
          <Header title="Explorar Origem" />
          {this.renderizaArea()}
        </section>
        <FoodCard />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getFoodArea: state.food.area,
  resultFood: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  getArea: () => dispatch(fetchAreaAction()),
  getRecipesArea: (state) => dispatch(fetchRecipesFoodAreaAction(state)),
  requestFoodRecipes: () => (dispatch(fetchFoodAction())),
});

ExploreByArea.propTypes = {
  getArea: PropTypes.func.isRequired,
  getRecipesArea: PropTypes.func.isRequired,
  getFoodArea: PropTypes.arrayOf(Object).isRequired,
  requestFoodRecipes: PropTypes.func.isRequired,
  resultFood: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByArea);
