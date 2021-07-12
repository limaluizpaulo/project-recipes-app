import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RecipesSuggestions() {
  const SEARCH_GENERAL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const SEARCH_GENERAL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const MAX_SUGGESTIONS = 6;
  const { suggestions } = useContext(RecipeContext);
  const [setSuggestionsUrl] = useFetchRecipesApi(MAX_SUGGESTIONS, true);
  const { pathname } = useLocation();
  const pathMeal = pathname.includes('comidas');

  useEffect(() => {
    setSuggestionsUrl(pathMeal ? SEARCH_GENERAL_DRINK : SEARCH_GENERAL_MEAL);
  }, [suggestions]);

  const generateKeys = suggestions.map((suggestion) => {
    if (pathMeal) {
      return {
        name: suggestion.strDrink,
        image: suggestion.strDrinkThumb,
      };
    }
    return {
      name: suggestion.strMeal,
      image: suggestion.strMealThumb,
    };
  });

  return (
    <Carousel style={ { marginBottom: '45px' } }>
      {
        generateKeys && generateKeys.map(({ name, image }, index) => (
          <Carousel.Item
            key={ name }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ image } alt={ name } width="100%" />
            <Carousel.Caption>
              <h3
                className="text-dark bg-light"
                data-testid={ `${index}-recomendation-title` }
              >
                {name}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>

  );
}

export default RecipesSuggestions;
