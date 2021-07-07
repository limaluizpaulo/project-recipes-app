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
  }

  async handleApi() {
    const { location, fetchApi } = this.props;

    if (location.pathname.includes('comida')) {
      await fetchApi('mealdb', 'meals');
      return this.setState({ type: 'comidas' });
    }
    await fetchApi('cocktaildb', 'drinks');
    return this.setState({ type: 'bebidas' });
  }

  updateState(param) {
    const { getDetailsRecipe } = this.props;
    console.log(getDetailsRecipe, 'updateState');
    console.log(getDetailsRecipe.length);
    if (getDetailsRecipe.length !== 0 && param === 'comidas') {
      console.log('pão');
      return this.setState({ id: getDetailsRecipe.idMeal, isRedirect: true });
    }
    if (getDetailsRecipe.length !== 0 && param === 'bebidas') {
      console.log('bebidas');
      return this.setState({ id: getDetailsRecipe.idDrink, isRedirect: true });
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
        { }
      </div>);
  }

  render() {
    const { location } = this.props;
    const { isRedirect, type, id } = this.state;
    const PAGE_LOCATION = location.pathname.includes('comida');
    console.log(type);
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
  location: PropTypes.shape,
}.isRequired;

const mapStateToProps = (state) => ({
  // getRamdomRecipe: state.exploreScreen.recipe,
  getDetailsRecipe: state.foodCategories.recipeDetails,

});
const mapDispatchToProps = (dispatch) => ({
  // sendRamdomRecipe: (e) => dispatch(getRamdomRecipe(e)),
  fetchApi: (e, a) => dispatch(fetchRamdomRecipe(e, a)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasBebidas);
