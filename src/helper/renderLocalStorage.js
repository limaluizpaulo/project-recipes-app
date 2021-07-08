import progressRecipeStorage from '../hooks/progressAddStorage';

function renderChecks(array, objectItems, params) {
  const drinks = document.URL.includes('bebidas') ? objectItems.cocktails[params.id]
    : objectItems.meals[params.id];
  array.map((input, idx) => {
    const keys = Object.keys(drinks);
    if (keys[idx] === input.id) {
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
