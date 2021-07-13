import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { drinkIngredients, fetchApiAction } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class BeverageIngredients extends React.Component {
  constructor() {
    super();

    this.renderCards = this.renderCards.bind(this);
    this.fetchBeverages = this.fetchBeverages.bind(this);
    this.handleIngredientName = this.handleIngredientName.bind(this);
  }

  componentDidMount() {
    this.fetchBeverages();
  }

  handleIngredientName({ target }) {
    const { addIngredientsRedux } = this.props;
    addIngredientsRedux(target.alt);
    console.log(target.alt);
  }

  async fetchBeverages() {
    const { SendApiToState } = this.props;
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const responseAPI = await fetchAPI(url);
    SendApiToState(responseAPI);
  }

  renderCards() {
    const { resultsApi: { drinks } } = this.props;
    const maxNumberOfCards = 11;
    if (drinks !== null) {
      return drinks.map((drink, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <Link to="/bebidas" key={ index }>
              <button
                type="button"
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ this.handleIngredientName }
              >
                <h3 data-testid={ `${index}-card-name` }>
                  { drink.strIngredient1 }
                </h3>
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                  alt={ drink.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                />
              </button>
            </Link>
          );
        }
        return null;
      });
    }
  }

  render() {
    return (
      <section>
        <Header title="Explorar Ingredientes" />
        {this.renderCards()}
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsApi: state.data.resultAPI,
});

const mapDispatchToProps = (dispatch) => ({
  SendApiToState: (payload) => dispatch(fetchApiAction(payload)),
  addIngredientsRedux: (payload) => dispatch(drinkIngredients(payload)),
});

BeverageIngredients.propTypes = {
  resultsApi: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  SendApiToState: PropTypes.func.isRequired,
  addIngredientsRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeverageIngredients);
