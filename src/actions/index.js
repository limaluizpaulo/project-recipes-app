export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const RENDER_FILTERED = 'RENDER_FILTERED';

export const finishedRecipe = (value) => ({ type: 'FINISHED', value });

export const updateRecipes = (payload) => ({
  type: UPDATE_RECIPES,
  payload,
});

export const renderFiltered = (payload) => ({
  type: RENDER_FILTERED,
  payload,
});
