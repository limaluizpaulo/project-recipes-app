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
      shouldRamdom: '',
    };
    this.updateState = this.updateState.bind(this);
    this.handleApi = this.handleApi.bind(this);
    this.redirectVerify = this.redirectVerify.bind(this);
  }

  componentWillUnmount() {
    console.log('entrei no unmount');
    return this.setState({ id: undefined,
      isRedirect: false,
      type: undefined,
      shouldRamdom: '' });
  }

  async handleApi() {
    const { location, fetchApi } = this.props;

    if (location.pathname.includes('comida')) {
      await fetchApi('mealdb', 'meals');
      return this.setState({ type: 'comidas', shouldRamdom: 'yes' });
    }
    await fetchApi('cocktaildb', 'drinks');
    return this.setState({ type: 'bebidas' });
  }

  updateState(param) {
    const { getDetailsRecipe } = this.props;
    const { shouldRamdom } = this.state;
    // console.log(getDetailsRecipe, 'updateState');
    // console.log(shouldRamdom.length);
    // console.log(shouldRamdom);
    if (shouldRamdom.length !== 0 && param === 'comidas') {
      console.log('pão');
      console.log(getDetailsRecipe);
      return this.setState({ id: getDetailsRecipe.idMeal });
    }
    if (getDetailsRecipe.length !== 0 && param === 'bebidas') {
      // console.log('bebidas');
      return this.setState({ id: getDetailsRecipe.idDrink, isRedirect: true });
    }
  }

  redirectVerify() {
    const { id } = this.state;
    console.log(id);
    // if (id.length !== 0) {
    //   console.log('entrei no verify');
    //   return this.setState({ isRedirect: true,
    //   });
    // }
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
    console.log(id);
    return (
      <div>
        <Header location={ location } />
        { PAGE_LOCATION === true ? this.renderButtons('comidas')
          : this.renderButtons('bebidas') }
        { type !== undefined && this.updateState(type)}
        { isRedirect && <Redirect to={ `/${type}/${id}` } />}
        {this.redirectVerify()}
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
  // getDetailsRecipe: state.recipeDetails.details,
  getDetailsRecipe: state,

});
const mapDispatchToProps = (dispatch) => ({
  // sendRamdomRecipe: (e) => dispatch(getRamdomRecipe(e)),
  fetchApi: (e, a) => dispatch(fetchRamdomRecipe(e, a)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasBebidas);
