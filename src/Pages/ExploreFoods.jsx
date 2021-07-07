import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import { getIngredient, getRandom } from '../redux/actions';
import MealRecipes from '../services/MealRecipesAPI';
import '../styles/Explore.css';

function ExploreFoods(props) {
  const { ingredientsCatcher, surpriseFood, shouldRedirect, food } = props;

  useEffect(() => {
    if (!shouldRedirect) {
      ingredientsCatcher();
    }
  }, [ingredientsCatcher, shouldRedirect]);

  return shouldRedirect ? <Redirect to={ `/comidas/${food[0].idMeal}` } /> : (
    <>
      <HeadBar title="Explorar Comidas" />
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
        className="btn-explore"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
        className="btn-explore"
      >
        Por Local de Origem
      </Link>
      <button
        type="button"
        to="/explorar/comidas/suprise"
        data-testid="explore-surprise"
        className="btn-explore"
        onClick={ surpriseFood }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  surpriseFood: () => dispatch(getRandom(MealRecipes.surpriseFood)),
  ingredientsCatcher: () => dispatch(getIngredient(MealRecipes.foodIngredients)),
});

const mapStateToProps = (state) => ({
  food: state.foods.list,
  shouldRedirect: state.foods.shouldRedirect,
});

ExploreFoods.propTypes = {
  food: PropTypes.any,
  shouldRedirect: PropTypes.any,
  surpriseFood: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoods);
