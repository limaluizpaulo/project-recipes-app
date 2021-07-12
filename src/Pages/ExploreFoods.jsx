import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import { getRandom } from '../redux/actions';
import MealRecipes from '../services/MealRecipesAPI';
import '../styles/Explore.css';

function ExploreFoods(props) {
  const { surpriseFood, shouldRedirect, food, margato } = props;
  console.log(margato);

  return shouldRedirect ? <Redirect to={ `/comidas/${food[0].idMeal}` } /> : (
    <>
      <HeadBar title="Explorar" />
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
});

const mapStateToProps = (state) => ({
  food: state.foods.list,
  margato: state,
  shouldRedirect: state.foods.shouldRedirect,
});

ExploreFoods.propTypes = {
  food: PropTypes.any,
  shouldRedirect: PropTypes.any,
  surpriseFood: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoods);
