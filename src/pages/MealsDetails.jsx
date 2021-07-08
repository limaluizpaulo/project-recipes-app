import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DetailsRecipes,
  Ingredients,
  Instructions,
  HeaderRecipes,
  ShareButton,
  FavoriteButton,
} from '../components';
import { MealsContext } from '../context/MealsProvider';
import { DrinksContext } from '../context/DrinksProvider';
import { UserContext } from '../context/UserProvider';

const MealsDetails = ({
  match: {
    params: { id },
  },
}) => {
  const [mealsDetails, setMealsDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { filterById, filterIngredients, filterAllMeasure } = useContext(MealsContext);

  const { drinks } = useContext(DrinksContext);

  const { copied } = useContext(UserContext);

  const {
    strMeal,
    strArea,
    strCategory,
    strYoutube,
    strInstructions,
    strMealThumb,
  } = mealsDetails;

  const newObj = {
    id,
    type: 'comida',
    area: strArea || '',
    category: strCategory,
    name: strMeal,
    image: strMealThumb,
    alcoholicOrNot: '',

    urlVideo: strYoutube,
    instructions: strInstructions,
    ingredients,
    measures,
    recomendations: drinks,
  };

  //   [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     area: area-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita
  // }]

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
          name: newObj.name,
          image: newObj.image,
          alcoholicOrNot: newObj.alcoholicOrNot,
        }) }
        test="favorite-btn"
      />

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
