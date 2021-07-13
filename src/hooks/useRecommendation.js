import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/recipesAPI';

function useRecommendation(type, MAX_RECOMMENDATIONS, typeMainKey = '') {
  const [recommendations, setRecommendations] = useState({});

  const getRecomendations = async () => {
    const { [type]: recipeType } = await fetchAllRecipes(type);
    const recipes = recipeType.slice(0, MAX_RECOMMENDATIONS);
    setRecommendations({
      recipes,
      typeMainKey: typeMainKey || null,
    });
  };

  useEffect(() => {
    getRecomendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return recommendations;
}

export default useRecommendation;
