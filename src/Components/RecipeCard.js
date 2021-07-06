import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComidasOnComponentDidMount, clearRecipes } from '../redux/actions';

class RecipeCard extends React.Component {
  componentDidMount() {
    const { dispatchRecipes, recipeType } = this.props;
    dispatchRecipes(recipeType);
  }

  componentDidUpdate(prevProps) {
    const { recipeType } = this.props;
    if (recipeType !== prevProps.recipeType) {
      const { dispatchRecipes } = this.props;
      dispatchRecipes(recipeType);
    }
  }

  render() {
    const { recipes, recipeType, isFetching } = this.props;
    const numeroMaximoDeReceitas = 12;

    const seletorComidaOuBebidas = {
      comidas: {
        thumb: 'strMealThumb',
        name: 'strMeal',
      },
      bebidas: {
        thumb: 'strDrinkThumb',
        name: 'strDrink',
      },
    };

    return (
      <main>
        {recipes && !isFetching
          ? recipes.map((item, index) => {
            if (index < numeroMaximoDeReceitas) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    width="40px"
                    data-testid={ `${index}-card-img` }
                    src={ item[seletorComidaOuBebidas[recipeType].thumb] }
                    alt="thumb"
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {item[seletorComidaOuBebidas[recipeType].name]}
                  </p>
                </div>
              );
            }
            return null;
          }) : <h1>Loading...</h1>}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes ? Object.values(state.recipes.recipes)[0] : [],
  isFetching: state.recipes.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes:
  (recipeType) => dispatch(fetchComidasOnComponentDidMount(recipeType)),
  clearRecipes: () => dispatch(clearRecipes()),
});

RecipeCard.propTypes = {
  dispatchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipeType: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
