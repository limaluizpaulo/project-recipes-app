import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DetailsRecipes,
  Ingredients,
  Instructions,
  HeaderRecipes,
  ShareButton,
  FavoriteButton,
} from '../components';
import { DrinksContext } from '../context/DrinksProvider';
import { MealsContext } from '../context/MealsProvider';
import { UserContext } from '../context/UserProvider';

const DrinksDetails = ({
  match: {
    params: { id },
  },
}) => {
  const [drinksDetails, setDrinksDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { copied } = useContext(UserContext);

  const { filterById, filterIngredients, filterAllMeasure } = useContext(DrinksContext);

  const { meals } = useContext(MealsContext);

  const {
    strDrink,
    strArea,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic,
  } = drinksDetails;

  const newObj = {
    id,
    type: 'bebida',
    area: strArea || '',
    category: strCategory,
    name: strDrink,
    image: strDrinkThumb,
    alcoholicOrNot: strAlcoholic,
    instructions: strInstructions,
    ingredients,
    measures,
    recomendations: meals,
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
      {copied ? 'Link copiado!' : ''}

      <ShareButton
        type={ newObj.type }
        id={ id }
        test="share-btn"
      />

      <FavoriteButton
        id={ id }
        recipe={ ({ id: newObj.id,
          type: newObj.type,
          area: newObj.area,
          category: newObj.category,
          alcoholicOrNot: newObj.alcoholicOrNot,
          name: newObj.name,
          image: newObj.image,
        }) }
        test="favorite-btn"
      />

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
