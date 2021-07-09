export const SHOW_RECIPE_LIST = 'SHOW_RECIPE_LIST';
export const SHOW_RECIPE_CATEGORY = 'SHOW_RECIPE_CATEGORY';
export const ID_RECIPE_START = 'ID_RECIPE_START';

const actionList = ({ list }) => ({
  type: SHOW_RECIPE_LIST,
  payload: { list },
});

export const actionFilterList = ({ filterList }) => ({
  type: SHOW_RECIPE_CATEGORY,
  payload: { filterList },
});

export const actionRecipeStart = ({ idRecipeStart }) => ({
  type: ID_RECIPE_START,
  payload: { idRecipeStart },
});
export default actionList;
