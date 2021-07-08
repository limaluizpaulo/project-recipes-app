/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getMealsRecipes } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import Card from './Card';
import Button from '../helpers/Button';

function Recommended() {
  const { /* isFetching, */ type } = useContext(RecipesContext);
  const [recommendedData, setRecommendedData] = useState([]);
  const [cardLeft, setCardLeft] = useState(0);
  const [cardRight, setCardRight] = useState(1);
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
    getData();
  }, [type, cardLeft, cardRight]);

  const quatro = 4;
  const cinco = 5;

  const slideLeft = () => {
    if (cardRight === 1) {
      setCardLeft(quatro);
      setCardRight(cinco);
    } else {
      setCardLeft(cardLeft - 2);
      setCardRight(cardRight - 2);
    }
  };

  const slideRight = () => {
    if (cardRight < recommendedData.length - 1) {
      setCardLeft(cardLeft + 2);
      setCardRight(cardRight + 2);
    } else {
      setCardLeft(0);
      setCardRight(1);
    }
  };

  return (
    <section>
      <h3>Recommended</h3>
      {// data-testid="${index}-recomendation-card"
        recommendedData.length && (
          recommendedData.map((recipe, index) => (
            <Card
              ShowCards={ [cardLeft, cardRight] }
              hidden={ () => { [cardLeft, cardRight].not.includes(index); } }
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
      <Button func={ slideLeft } label="esquerda" />
      <Button func={ slideRight } label="direita" />
    </section>
  );
}

export default Recommended;
