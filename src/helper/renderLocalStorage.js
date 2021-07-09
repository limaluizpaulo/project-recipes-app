import progressRecipeStorage from '../hooks/progressAddStorage';

function renderChecks(array, objectItems, params) {
  const drinks = document.URL.includes('bebidas') ? objectItems.cocktails[params.id]
    : objectItems.meals[params.id];
  array.map((input, idx) => {
    const keys = Object.values(drinks);
    const item = keys[idx].split('/');
    if (item[0] === input.id) {
      input.checked = true;
      const span = input.parentNode.children;
      span[1].classList.add('marcado');
      return input.checked;
    }
    const span = input.parentNode.children;
    span[1].classList.remove('marcado');
    return input;
  });
}

// function checkProgress() {
//   if (localStorage.getItem('inProgressRecipes')) {
//     let object = JSON.parse(localStorage.getItem('inProgressRecipes'));
//     if (document.URL.includes('bebidas')) {
//       object = object.cocktails[params.id];
//     }
//     if (document.URL.includes('comidas')) {
//       object = object.meals[params.id];
//     }
//     const result = object.some((ingredient) => ingredient.includes(element[1]));
//     return result;
//   }
//   return false;
// }

async function renderProgress(param) {
  let objectItems = { cocktails: {}, meals: { [param.id]: [] } };
  if (document.URL.includes('bebidas')) {
    objectItems = { cocktails: { [param.id]: [] }, meals: {} };
  }
  if (localStorage.getItem('inProgressRecipes')) {
    objectItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }
  const inputs = document.querySelectorAll('input');
  const array = [...inputs];
  progressRecipeStorage(param.id);
  renderChecks(array, objectItems, param);
}

export default renderProgress;
