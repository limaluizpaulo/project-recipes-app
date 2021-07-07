import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getIngredient, getRandom } from '../redux/actions';
import BeverageAPI from '../services/BeverageRecipesAPI';
import '../styles/Explore.css';

function ExploreDrinks(props) {
  const { ingredientsCatcher, surpriseDrink, shouldRedirect, drink } = props;

  useEffect(() => {
    if (!shouldRedirect) {
      ingredientsCatcher();
    }
  }, [ingredientsCatcher, shouldRedirect]);

  return shouldRedirect ? <Redirect to={ `/bebidas/${drink[0].idDrink}` } /> : (
    <>
      <Header />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
        className="btn-explore"
      >
        Por Ingredientes
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        className="btn-explore"
        onClick={ surpriseDrink }
      >
        Me Surpreenda!
      </button>
    </>
  );
}

ExploreDrinks.propTypes = {
  drink: PropTypes.any,
  shouldRedirect: PropTypes.any,
  surpriseDrink: PropTypes.any,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  surpriseDrink: () => dispatch(getRandom(BeverageAPI.surpriseDrink)),
  ingredientsCatcher: () => dispatch(getIngredient(BeverageAPI.drinksIngredient)),
});

const mapStateToProps = (state) => ({
  drink: state.drinks.list,
  shouldRedirect: state.drinks.shouldRedirect,
});

ExploreDrinks.propTypes = {
  surpriseDrink: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreDrinks);
