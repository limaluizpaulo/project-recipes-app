export const SHOW_RECIPE_LIST = 'SHOW_RECIPE_LIST';
export const SHOW_RECIPE_CATEGORY = 'SHOW_RECIPE_CATEGORY';

const actionList = ({ list }) => ({
  type: SHOW_RECIPE_LIST,
  payload: { list },
});

export const actionFilterList = ({ filterList }) => ({
  type: SHOW_RECIPE_CATEGORY,
  payload: { filterList },
});
export default actionList;
