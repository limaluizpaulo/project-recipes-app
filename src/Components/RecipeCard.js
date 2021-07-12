import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComidasOnComponentDidMount, clearRecipes, saveCategory,
} from '../redux/actions';
import seletorComidaOuBebidas from '../Services/Objects';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: props.selectedCategory,
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatchRecipes, recipeType } = this.props;
    console.log(this.props)
    dispatchRecipes(recipeType, 'recipes');
    dispatchRecipes(recipeType, 'categories');
  }

  componentDidUpdate(prevProps) {
    const { recipeType } = this.props;
    if (recipeType !== prevProps.recipeType) {
      const { dispatchRecipes } = this.props;
      dispatchRecipes(recipeType, 'recipes');
      dispatchRecipes(recipeType, 'categories');
    }
  }

  handleChange({ target: { value } }) {
    const { setCategory } = this.props;
    setCategory(value);
    this.setState((prevState) => {
      if (prevState.selectedCategory !== value) {
        return {
          selectedCategory: value,
        };
      }
      return { selectedCategory: 'All' };
    },
    () => {
      const { selectedCategory } = this.state;
      if (selectedCategory !== 'All') {
        const { recipeType, dispatchRecipes } = this.props;
        dispatchRecipes(recipeType, 'ingredient', selectedCategory);
      }
    });
  }

  renderCategories() {
    const { categories } = this.props;
    const numeroMaximoDeCategorias = 5;
    return categories.map(({ strCategory }, index) => {
      if (index < numeroMaximoDeCategorias) {
        return (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name="category-value"
            value={ strCategory }
            onClick={ (event) => this.handleChange(event) }
          >
            {strCategory}
          </button>
        );
      }
      return null;
    });
  }

  renderRecipes(recipes) {
    const { recipeType, history } = this.props;
    const numeroMaximoDeReceitas = 12;
    return recipes
      .map((recipe, index) => {
        if (index < numeroMaximoDeReceitas) {
          return (
            <div
              onKeyDown={ () => console.log('3 propriedades pro linter passar') }
              tabIndex={ index }
              role="button"
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => history
                .push(`/${recipeType}/${recipe[seletorComidaOuBebidas[recipeType].id]}`,
                  { selectedCategory: 'All' }) }
            >
              <img
                width="40px"
                data-testid={ `${index}-card-img` }
                src={ recipe[seletorComidaOuBebidas[recipeType].thumb] }
                alt="thumb"
              />
              <p data-testid={ `${index}-card-name` }>
                {recipe[seletorComidaOuBebidas[recipeType].name]}
              </p>
            </div>
          );
        }
        return null;
      });
  }

  render() {
    const { recipes, isFetching, categories, recipesByIngredients } = this.props;
    const { selectedCategory, setCategory } = this.props;

    return (
      <main>
        {categories && !isFetching
          ? this.renderCategories()
          : null}
        <button
          type="button"
          onClick={ () => setCategory('All') }
          data-testid="All-category-filter"
        >
          All
        </button>
        {recipes.length && !isFetching
          ? this.renderRecipes(selectedCategory === 'All'
            ? recipes : recipesByIngredients)
          : <h1>Loading...</h1>}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes ? Object.values(state.recipes.recipes)[0] : [],
  isFetching: state.recipes.isFetching,
  categories: state.recipes.categories ? Object.values(state.recipes.categories)[0] : [],
  recipesByIngredients: state.recipes.ingredients
    ? Object.values(state.recipes.ingredients)[0] : [],
  selectedCategory: state.recipes.selectedCategory,
  searchBarFirstLetter: state.fetch.searchBarFirstLetter
    ? Object.values(state.fetch.searchBarFirstLetter)[0] : null,
  searchBarName: state.fetch.searchBarName
    ? Object.values(state.fetch.searchBarName)[0] : null,
  searchBarIngredient: state.fetch.searchBarIngredient
    ? Object.values(state.fetch.searchBarIngredient)[0] : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipeType, fetchType, ingredient) => dispatch(
    fetchComidasOnComponentDidMount(recipeType, fetchType, ingredient),
  ),
  clearRecipes: () => dispatch(clearRecipes()),
  setCategory: (category) => dispatch(saveCategory(category)),
});

RecipeCard.propTypes = {
  dispatchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipeType: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipesByIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
