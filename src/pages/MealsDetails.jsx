import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DetailsRecipes, Ingredients, Instructions, HeaderRecipes } from '../components';
import { MealsContext } from '../context/MealsProvider';

const MealsDetails = ({ match: { params: { id } } }) => {
  const [mealsDetails, setMealsDetail] = useState([]);

  const { meals } = useContext(MealsContext);

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
    // ingredients: mealsDetails.filter((key, i) => (
    //   Object.keys(key) === `strIngredient${i + 1}`
    // && Object.values(key) !== ''
    // )),
  };

  // useEffect(() => {
  //   const meal = meals.filter(({ idMeal }) => id === idMeal);
  //   setMealsDetail(meal);
  // }, []);

  return (
    <div>
      <HeaderRecipes newObj={ newObj } />
      <Ingredients newObj={ newObj } />
      <Instructions newObj={ newObj } />
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
