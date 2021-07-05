export const SHOW_RECIPE_LIST = 'SHOW_RECIPE_LIST';

const actionList = ({ status, list }) => ({
  type: SHOW_RECIPE_LIST,
  payload: { status, list },
});

export default actionList;
