import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionIngredientsRecipes } from '../actions';

class RecipesByIngredients extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { ingredients } = this.props;
    ingredients();
  }

  render() {
    const { listIngredients } = this.props;
    if (!listIngredients) return <p>Loading...</p>;
    console.log(listIngredients);
    return (
      <div>
        <Header header="Explorar Ingredientes" />
        <h2> Recipes By Ingredients</h2>
        {listIngredients.map(({ strIngredient }, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              data-testid={ `${index}-card-img` }
              width="30px"
            />
            <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
          </div>
        ))}
        <DownMenu />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ingredients: () => dispatch(actionIngredientsRecipes()),
});

const mapStateToProps = (state) => ({
  listIngredients: state.recipes.ingredients,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesByIngredients);
