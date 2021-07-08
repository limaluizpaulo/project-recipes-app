import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/recipesAPI';

function useRecommendation(type, MAX_RECOMMENDATIONS) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecomendations = async () => {
    const { [type]: recipeType } = await fetchAllRecipes(type);
    setRecommendations(recipeType.slice(0, MAX_RECOMMENDATIONS));
  };

  useEffect(() => {
    getRecomendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return recommendations;
}

export default useRecommendation;
