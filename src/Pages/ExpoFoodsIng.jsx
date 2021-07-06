import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import { getIngredient } from '../redux/actions';
import MealRecipesAPI from '../services/MealRecipesAPI';

function ExpoFoodsIng(props) {
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
    <>
      <HeadBar />
      {ingredients.map((ingredient, index) => {
        if (index < maxTwelve) {
          return (
            <div
              key={ ingredient.strIngredient }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                width="100px"
                alt={ ingredient.strIngredient1 }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              />
              <div
                data-testid={ `${index}-card-name` }
              >
                {ingredient.strIngredient}
              </div>
            </div>
          );
        }
        return null;
      })}
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ingredientsCatcher: () => dispatch(getIngredient(MealRecipesAPI.foodIngredients)),
});

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.list,
});

ExpoFoodsIng.propTypes = {
  ingredients: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpoFoodsIng);
