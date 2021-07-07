import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DetailsRecipes, Ingredients, Instructions, HeaderRecipes } from '../components';
import { MealsContext } from '../context/MealsProvider';
import { DrinksContext } from '../context/DrinksProvider';

const MealsDetails = ({ match: { params: { id } } }) => {
  const [mealsDetails, setMealsDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { filterById, filterIngredients, filterAllMeasure } = useContext(MealsContext);

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
    measures,
    recomendations: drinks,
  };

  useEffect(() => {
    const findMeal = async () => {
      const fetchRecipe = await filterById('meals', id);
      setMealsDetail(fetchRecipe);
      const arrayIngredients = await filterIngredients('meals', id);
      setIngredients(arrayIngredients);
      const arrayMeasures = await filterAllMeasure('meals', id);
      setMeasures(arrayMeasures);
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
