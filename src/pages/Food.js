import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Food = () => {
  // const [meal, setMeal] = useStatee([]);

  useEffect(() => {
    // const { id } = props.match.params;
    console.log('aasdfasdfa');
    // const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    // fetch(URL)
    //   .then((res) => res.json())
    //   .then(({ meals: data }) => setMeal(data));
  });

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h1 data-testid="recipe-title">{ }</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favorito</button>
      <h2 data-testid="recipe-category">{ }</h2>
      <p data-testid="instructions">{ }</p>
      {/* .map((_, index) => (
      <p data-testid="${index}-ingredient-name-and-measure">{ `strIngredient${index}` }</p>
    )); */}
      <source data-testid="video" src="movie.mp4" type="video/mp4" />
      {/* O card de receitas recomendadas data-testid="${index}-recomendation-card" */}
      <button type="button" data-testid="start-recipe-btn">Play</button>
      <br />
      <br />
      <Link to="/comidas/">
        <button type="button">Voltar</button>
      </Link>
    </div>
  );
};

export default Food;
