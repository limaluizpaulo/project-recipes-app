import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchReceitaRandom } from '../redux/actions';

class ExploreByType extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      endpoint: '',
    };

    this.handleChangeOnClick = this.handleChangeOnClick.bind(this);
    this.fetchRandomRecipe = this.fetchRandomRecipe.bind(this);
    this.redirectToRandomRecipe = this.redirectToRandomRecipe.bind(this);
  }

  handleChangeOnClick({ target: { id } }) {
    switch (id) {
    case 'ingredientes':
      this.setState({
        endpoint: 'ingredientes',
        redirect: true,
      });
      break;
    case 'area':
      this.setState({
        endpoint: 'area',
        redirect: true,
      });
      break;
    default:
      return null;
    }
  }

  async fetchRandomRecipe() {
    const { dispatchFetchRecipeRandom, match: { params: { recipeType } } } = this.props;
    await dispatchFetchRecipeRandom(recipeType);
    this.redirectToRandomRecipe();
  }

  redirectToRandomRecipe() {
    const { randomRecipe, match: { params: { recipeType } } } = this.props;
    const recipe = Object.values(randomRecipe)[0];
    switch (recipeType) {
    case 'comidas':
      this.setState({
        endpoint: parseFloat(recipe[0].idMeal),
        redirect: true,
      });
      break;
    case 'bebidas':
      this.setState({
        endpoint: parseFloat(recipe[0].idDrink),
        redirect: true,
      });
      break;
    default:
      return null;
    }
  }

  render() {
    const { redirect, endpoint } = this.state;
    const { match: { params: { recipeType } }, location: { pathname } } = this.props;

    if (redirect && typeof endpoint !== 'number') {
      return (
        <Redirect to={ `/explorar/${recipeType}/${endpoint}` } />
      );
    } if (redirect && typeof endpoint === 'number') {
      return (
        <Redirect to={ `/${recipeType}/${endpoint}` } />
      );
    }

    return (
      <div>
        <Header pathname={ pathname } />
        <main>
          <button
            id="ingredientes"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ (e) => this.handleChangeOnClick(e) }
          >
            Por Ingredientes
          </button>
          { recipeType !== 'bebidas'
          && (
            <button
              id="area"
              type="button"
              data-testid="explore-by-area"
              onClick={ (e) => this.handleChangeOnClick(e) }
            >
              Por Local de Origem
            </button>
          )}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => this.fetchRandomRecipe() }
          >
            Me Surpreenda!
          </button>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  randomRecipe: state.randomRecipe.randomRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipeRandom: (recipeType) => dispatch(fetchReceitaRandom(recipeType)),
});

ExploreByType.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeType: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatchFetchRecipeRandom: PropTypes.func.isRequired,
  randomRecipe: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByType);
