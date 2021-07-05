import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function FoodDetails({match: { params: { id } }}) {
  const { details, detailsSyncSetState } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, [detailsSyncSetState, id]);

  return (
    <main>
      aaa
    </main>
  );
}

export default FoodDetails;

/* A foto deve possuir o atributo data-testid="recipe-photo";
O título deve possuir o atributo data-testid="recipe-title";
O botão de compartilhar deve possuir o atributo data-testid="share-btn";
O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
O texto da categoria deve possuir o atributo data-testid="recipe-category";
Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
O texto de instruções deve possuir o atributo data-testid="instructions";
O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn"; */
