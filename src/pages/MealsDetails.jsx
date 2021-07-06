import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DetailsRecipes, Ingredients, Instructions, HeaderRecipes } from '../components';
import { MealsContext } from '../context/MealsProvider';
import { DrinksContext } from '../context/DrinksProvider';

const MealsDetails = ({ match: { params: { id } } }) => {
  const [mealsDetails, setMealsDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const { findMealRecipe, filterIngredients } = useContext(MealsContext);

  const { drinks } = useContext(DrinksContext);

  const { strMeal,
    strCategory,
    strYoutube,
    strInstructions,
    strMealThumb } = mealsDetails;

  const newObj = {
    title: strMeal,
    category: strCategory,
    imageHeader: strMealThumb,
    urlVideo: strYoutube,
    instructions: strInstructions,
    type: 'meals',
    ingredients,
    recomendations: drinks,
  };

  useEffect(() => {
    const findMeal = () => {
      const meal = findMealRecipe(id);
      setMealsDetail(meal);
      const ingredient = filterIngredients(id);
      setIngredients(ingredient);
      setLoading(true);
    };
    findMeal();
  }, []);

  if (!loading) {
    return <div />;
  }

  return (

    <div>
      <HeaderRecipes newObj={ newObj } />
      <Instructions newObj={ newObj } />
      <Ingredients newObj={ newObj } />
      <DetailsRecipes newObj={ newObj } />
    </div>
  );
};

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
