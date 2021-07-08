import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DetailsRecipes, Ingredients, Instructions, HeaderRecipes } from '../components';
import { DrinksContext } from '../context/DrinksProvider';
import { MealsContext } from '../context/MealsProvider';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const [drinksDetails, setDrinksDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { filterById, filterIngredients, filterAllMeasure } = useContext(DrinksContext);

  const { meals } = useContext(MealsContext);

  const { strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic } = drinksDetails;

  const newObj = {
    id,
    title: strDrink,
    type: 'cocktail',
    category: strCategory,
    alcoholic: strAlcoholic,
    instructions: strInstructions,
    imageHeader: strDrinkThumb,
    ingredients,
    recomendations: meals,
    measures,
  };

  useEffect(() => {
    const findDrink = async () => {
      const fetchRecipe = await filterById('drinks', id);
      setDrinksDetails(fetchRecipe);
      const arrayIngredients = await filterIngredients('drinks', id);
      setIngredients(arrayIngredients);
      const arrayMeasure = await filterAllMeasure('drinks', id);
      setMeasures(arrayMeasure);
      setLoading(true);
    };
    findDrink();
  }, [filterAllMeasure, filterById, filterIngredients, id]);

  if (!loading) {
    return <div />;
  }

  return (
    <div>
      <HeaderRecipes newObj={ newObj } />
      <Ingredients newObj={ newObj } />
      <Instructions newObj={ newObj } />
      <DetailsRecipes newObj={ newObj } />
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
