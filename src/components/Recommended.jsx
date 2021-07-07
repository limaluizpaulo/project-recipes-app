import React, { useContext, useEffect, useState } from 'react';
import { getMealsRecipes } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import Card from './Card';

function Recommended() {
  const { /* isFetching, */ type } = useContext(RecipesContext);
  const [recommendedData, setRecommendedData] = useState([]);
  const recommendedType = (type === 'meals') ? 'drinks' : 'meals';

  let title;
  let typeId;
  let thumbnail;
  let category;

  if (recommendedType === 'meals') {
    title = 'strMeal';
    thumbnail = 'strMealThumb';
    typeId = 'idMeal';
    category = 'strCategory';
  } else {
    title = 'strDrink';
    thumbnail = 'strDrinkThumb';
    typeId = 'idDrink';
    category = 'strAlcoholic';
  }

  const maxCards = 6;

  useEffect(() => {
    const getData = async () => {
      const results = await getMealsRecipes(recommendedType);
      setRecommendedData(results.filter((item, index) => index < maxCards));
    };
    console.log('recommended');
    getData();
  }, [type]);

  return (
    <section>
      <h3>Recommended</h3>
      {// data-testid="${index}-recomendation-card"
        recommendedData.length && (
          recommendedData.map((recipe, index) => (
            <Card
              key={ recipe[typeId] }
              index={ index }
              id={ recipe[typeId] }
              thumbnail={ recipe[thumbnail] }
              title={ recipe[title] }
              category={ recipe[category] }
            />
          ))
        )
      }
    </section>
  );
}

export default Recommended;
