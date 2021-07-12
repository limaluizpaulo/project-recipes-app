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
    const { SendApiToState } = this.props;
    const { apiEndPoint } = this.state;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/${apiEndPoint}`;
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
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <h3 data-testid={ `${index}-card-name` }>
                  { drink.strDrink }
                </h3>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                  width="150px"
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
        <section>
          <button
            name="all"
            type="button"
            data-testid="All-category-filter"
            onClick={ this.onClickCategoryBtn }
          >
            All
          </button>
          { this.renderCategories() }
        </section>
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsApi: state.data.resultAPI,
});

const mapDispatchToProps = (dispatch) => ({
  SendApiToState: (payload) => dispatch(fetchApiAction(payload)),
});

Beverages.propTypes = {
  resultsApi: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  SendApiToState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Beverages);
