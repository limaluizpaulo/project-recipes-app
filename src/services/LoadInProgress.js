function loadDoneItems(params) {
  const { url, id } = params;
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgress) {
    if (url.match(/comidas/gi)) {
      return inProgress.meals[id];
    }
    return inProgress.cocktails[id];
  }
}

export default loadDoneItems;
