import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { fetchRamdomRecipe } from '../../action';

export class ExplorarComidasBebidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      id: '',
      isRedirect: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.verifyToRedirect = this.verifyToRedirect.bind(this);
  }

  componentWillUnmount() {
    console.log('entrei em unmount');
    this.setState({ id: '', type: '', isRedirect: false });
  }

  async handleApi() {
    const { location, fetchApi } = this.props;

    if (location.pathname.includes('comida')) {
      fetchApi('mealdb', 'meals');
      return this.setState({ type: 'comidas' });
    }
    await fetchApi('cocktaildb', 'drinks');
    return this.setState({ type: 'bebidas' });
  }

  updateState(param) {
    const { getDetailsRecipe } = this.props;
    const { id, should } = this.state;
    console.log(should);
    console.log(getDetailsRecipe, 'updateState');
    console.log(getDetailsRecipe.length, 'updateState');

    if (!id && getDetailsRecipe.idMeal !== undefined && param === 'comidas') {
      console.log('entrei');

      return this.setState({ id: getDetailsRecipe.idMeal },
        () => this.verifyToRedirect('comidas'));
      // return this.verifyToRedirect();
    }
    if (!id && getDetailsRecipe.idDrink !== undefined && param === 'bebidas') {
      console.log('bebidas');
      return this.setState({ id: getDetailsRecipe.idDrink },
        () => this.verifyToRedirect('bebidas'));
    }
  }

  verifyToRedirect(param) {
    const { id } = this.state;
    const { getDetailsRecipe } = this.props;

    // console.log('verify');
    // console.log(id);
    // console.log(getDetailsRecipe.idMeal);
    if (getDetailsRecipe.idMeal === id && param === 'comidas') {
      console.log('entrei no redirect');
      console.log(id);
      console.log(getDetailsRecipe.idMeal);
      return this.setState({ isRedirect: true });
    }
    if (getDetailsRecipe.idDrink === id && param === 'bebidas') {
      console.log('bebidas');
      return this.setState({ isRedirect: true });
    }
  }

  renderButtons(param) {
    const { location } = this.props;
    return (
      <div>
        <Link to={ `/explorar/${param}/ingredientes` }>
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        { location.pathname.includes('comida')
        && (
          <Link to="/explorar/comidas/area">
            <button
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem
            </button>
          </Link>)}
        <button
          data-testid="explore-surprise"
          onClick={ this.handleApi }
          type="button"
        >
          Me Surpreenda!
        </button>
      </div>);
  }

  render() {
    const { location } = this.props;
    const { isRedirect, type, id } = this.state;
    const PAGE_LOCATION = location.pathname.includes('comida');
    // console.log(type);
    return (
      <div>
        <Header location={ location } />
        { PAGE_LOCATION === true ? this.renderButtons('comidas')
          : this.renderButtons('bebidas') }
        { type !== undefined && this.updateState(type)}
        { isRedirect && <Redirect to={ `/${type}/${id}` } />}
        <Footer />
      </div>
    );
  }
}

ExplorarComidasBebidas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  sendRamdomRecipe: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  // getRamdomRecipe: state.exploreScreen.recipe,
  // getDetailsRecipe: state.recipeDetails.details,
  getDetailsRecipe: state.recipeDetails.details,

});
const mapDispatchToProps = (dispatch) => ({
  // sendRamdomRecipe: (e) => dispatch(getRamdomRecipe(e)),
  fetchApi: (e, a) => dispatch(fetchRamdomRecipe(e, a)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasBebidas);
