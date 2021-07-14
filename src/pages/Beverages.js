import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchApiAction } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class Beverages extends React.Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.onClickCategoryBtn = this.onClickCategoryBtn.bind(this);
    this.state = {
      categoriesList: [],
      apiEndPoint: 'search.php?s=',
    };
  }

  componentDidMount() {
    this.fetchBeverages();
    return this.fetchCategories();
  }

  onClickCategoryBtn({ target }) {
    const originalEndPoint = 'search.php?s=';
    const { apiEndPoint } = this.state;
    if (target.name === 'all') {
      return this.setState({
        apiEndPoint: originalEndPoint,
      }, () => this.fetchBeverages());
    }
    if (apiEndPoint !== `filter.php?c=${target.name}`) {
      return this.setState({
        apiEndPoint: `filter.php?c=${target.name}`,
      }, () => this.fetchBeverages());
    }
    this.setState({
      apiEndPoint: originalEndPoint,
    }, () => this.fetchBeverages());
  }

  async fetchCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const responseAPI = await fetchAPI(url);
    const { drinks } = responseAPI;
    this.setState({
      categoriesList: drinks,
    });
  }

  async fetchBeverages() {
    const { SendApiToState, drinkIngredientRedux } = this.props;
    const { apiEndPoint } = this.state;
    let url = `https://www.thecocktaildb.com/api/json/v1/1/${apiEndPoint}`;
    if (drinkIngredientRedux !== null) url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkIngredientRedux}`;
    const responseAPI = await fetchAPI(url);
    SendApiToState(responseAPI);
  }

  renderCategories() {
    const { categoriesList } = this.state;
    const maxCategories = 4;
    return categoriesList.map((category, index) => {
      if (index <= maxCategories) {
        return (
          <button
            name={ category.strCategory }
            key={ category.strCategory }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ this.onClickCategoryBtn }
            className="main-btn drinks-btn"
          >
            { category.strCategory }
          </button>
        );
      }
      return null;
    });
  }

  renderCards() {
    const { resultsApi: { drinks } } = this.props;
    const maxNumberOfCards = 11;
    if (drinks !== null) {
      return drinks.map((drink, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <Link to={ `/bebidas/${drink.idDrink}` } key={ index }>
              <div key={ index } data-testid={ `${index}-recipe-card` } className="main-cards-div">
                <h3 data-testid={ `${index}-card-name` }>
                  { drink.strDrink }
                </h3>
                <div className="main-card-background" />
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                  className="drinks-img"
                />
              </div>
            </Link>
          );
        }
        return null;
      });
    }
  }

  render() {
    return (
      <div>
        <Header title="Bebidas" />
        <section className="main-btn-section drinks-section">
          <button
            name="all"
            type="button"
            data-testid="All-category-filter"
            onClick={ this.onClickCategoryBtn }
            className="main-btn drinks-btn"
          >
            All
          </button>
          { this.renderCategories() }
        </section>
        <section className="main-cards-section drink-cards-section">
          { this.renderCards() }
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsApi: state.data.resultAPI,
  drinkIngredientRedux: state.data.resultAPI.drinkIngredient,
});

const mapDispatchToProps = (dispatch) => ({
  SendApiToState: (payload) => dispatch(fetchApiAction(payload)),
});

Beverages.propTypes = {
  resultsApi: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  SendApiToState: PropTypes.func.isRequired,
  drinkIngredientRedux: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Beverages);
