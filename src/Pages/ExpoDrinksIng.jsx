import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import BeverageRecipesAPI from '../services/BeverageRecipesAPI';
import { getIngredient } from '../redux/actions';
import '../styles/Explore.css';

function ExpoDrinksIng(props) {
  const { ingredientsCatcher, ingredients } = props;
  const maxTwelve = 12;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      ingredientsCatcher();
      setLoading(false);
    }
  }, [ingredientsCatcher, setLoading, loading]);

  return loading ? <h3>Loading...</h3> : (
    <div className="ingredientTab">
      <HeadBar title="Ingredientes" />
      {ingredients.map((ingredient, index) => {
        if (index < maxTwelve) {
          return (
            <div
              key={ ingredient.strIngredient1 }
              className="ingredientScreen"
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                width="100px"
                alt={ ingredient.strIngredient1 }
                className="ingredientImage"
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              />
              <div
                className="ingredientName"
                data-testid={ `${index}-card-name` }
              >
                {ingredient.strIngredient1}
              </div>
            </div>
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.list,
  shouldRedirect: state.drinks.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  ingredientsCatcher: () => dispatch(getIngredient(BeverageRecipesAPI.drinksIngredient)),
});

ExpoDrinksIng.propTypes = {
  ingredients: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpoDrinksIng);
