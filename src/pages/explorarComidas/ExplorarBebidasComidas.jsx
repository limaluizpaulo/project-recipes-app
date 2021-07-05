import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { fetchRamdomRecipe, getRamdomRecipe } from '../../action';

export class ExplorarComidasBebidas extends Component {
  constructor(props) {
    super(props);
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  fetchAPI(param) {
    // const { fetchApi } = this.props;
    // if (param === 'comidas') {
    //   console.log('entrei');
    //   return fetchApi('mealdb');
    // }
    console.log('entrei');
    console.log(param);

    // fetchApi('cocktaildb');
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
          onClick={ (param) => this.fetchAPI(param) }
          type="button"
        >
          Me Surpreenda!

        </button>
      </div>);
  }

  render() {
    const { location } = this.props;
    const PAGE_LOCATION = location.pathname.includes('comida');
    return (
      <div>
        <Header location={ location } />
        { PAGE_LOCATION === true ? this.renderButtons('comidas')
          : this.renderButtons('bebidas') }
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
  getRamdomRecipe: state.exploreScreen.recipe,
});
const mapDispatchToProps = (dispatch) => ({
  sendRamdomRecipe: (e) => dispatch(getRamdomRecipe(e)),
  // fetchApi: (e) => dispatch(fetchRamdomRecipe(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasBebidas);
