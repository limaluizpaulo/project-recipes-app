export function checkProgress(element, params) {
  if (localStorage.getItem('inProgressRecipes')) {
    let object2 = '';
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (document.URL.includes('bebidas')) {
      object2 = object.cocktails[params.id];
    }
    if (document.URL.includes('comidas')) {
      object2 = object.meals[params.id];
    }
    const result = object2.some((ingredient) => ingredient.includes(element[1]));
    return result;
  }
  return false;
}

export default checkProgress;
