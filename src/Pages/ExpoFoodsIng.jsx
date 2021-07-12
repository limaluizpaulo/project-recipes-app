import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import IngredientsFoodsTab from '../Components/IngredientsFoodsTab';
import { getIngredient } from '../redux/actions';
import MealRecipesAPI from '../services/MealRecipesAPI';
import '../styles/Explore.css';

function ExpoFoodsIng(props) {
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
      <HeadBar title="Ingredientes" />
      <IngredientsFoodsTab ingredients={ ingredients } />
      <Footer />
    </div>
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
