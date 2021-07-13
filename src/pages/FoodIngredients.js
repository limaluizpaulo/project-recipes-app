import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { foodIngredients, fetchApiAction } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class FoodIngredients extends React.Component {
  constructor() {
    super();

    this.fetchFood = this.fetchFood.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.handleIngredientName = this.handleIngredientName.bind(this);
  }

  componentDidMount() {
    this.fetchFood();
  }

  handleIngredientName({ target }) {
    const { addIngredientsRedux } = this.props;
    addIngredientsRedux(target.alt);
  }

  async fetchFood() {
    const { SendApiToState } = this.props;
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const responseAPI = await fetchAPI(url);
    SendApiToState(responseAPI);
  }

  renderCards() {
    const { resultsApi: { meals } } = this.props;
    const maxNumberOfCards = 11;
    if (meals !== null) {
      return meals.map((food, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <Link key={ index } to="/comidas">
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                onClick={ this.handleIngredientName }
              >
                <h3 data-testid={ `${index}-card-name` }>{ food.strIngredient }</h3>
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
                  alt={ food.strIngredient }
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
  addIngredientsRedux: (payload) => dispatch(foodIngredients(payload)),
});

FoodIngredients.propTypes = {
  resultsApi: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  SendApiToState: PropTypes.func.isRequired,
  addIngredientsRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodIngredients);
