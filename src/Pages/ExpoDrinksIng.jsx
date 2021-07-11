import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../Components/Footer';
import IngredientsDrinksTab from '../Components/IngredientsDrinksTab';
import BeverageRecipesAPI from '../services/BeverageRecipesAPI';
import { getIngredient } from '../redux/actions';
import '../styles/Explore.css';

function ExpoDrinksIng(props) {
  const { ingredientsCatcher, ingredients } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      ingredientsCatcher();
      setLoading(false);
    }
  }, [ingredientsCatcher, setLoading, loading]);

  return loading ? <h3>Loading...</h3> : (
    <div>
      <header className="header-container">
        <div>
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div>
          <h1 data-testid="page-title">Explorar Ingredientes</h1>
        </div>
      </header>
      <IngredientsDrinksTab ingredients={ ingredients } />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  ingredientsCatcher: () => dispatch(getIngredient(BeverageRecipesAPI.drinksIngredient)),
});

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.list,
});

ExpoDrinksIng.propTypes = {
  ingredients: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpoDrinksIng);
