export default function useIngredients() {
  const handleCategoryAndId = (recipe, value) => {
    if (value === 'category') {
      const category = recipe.idMeal ? 'meals' : 'cocktails';
      return category;
    }
    if (value === 'id') {
      const id = recipe.idMeal || recipe.idDrink;
      return id;
    }
    if (value === 'other') {
      const otherCategory = recipe.idMeal ? 'cocktails' : 'meals';
      return otherCategory;
    }
  };
  const handleIngredients = ({ target: { value } }, recipe, setArrChecked) => {
    const category = handleCategoryAndId(recipe, 'category');
    const id = handleCategoryAndId(recipe, 'id');
    const otherCategory = handleCategoryAndId(recipe, 'other');

    let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) inProgress = [{ [category]: {}, [otherCategory]: {} }];
    let newProgress = {};

    if (!inProgress[category]) {
      newProgress = {
        [otherCategory]: {},
        [category]: {
          ...inProgress[category],
          [id]: [+value],
        },
      };
    } else if (!inProgress[category][id]) {
      newProgress = {
        [otherCategory]: { ...inProgress[otherCategory] },
        [category]: { ...inProgress[category], [id]: [+value] },
      };
    } else if (inProgress[category][id].includes(+value)) {
      newProgress = {
        [otherCategory]: { ...inProgress[otherCategory] },
        [category]: {
          ...inProgress[category],
          [id]: [...inProgress[category][id].filter((item) => item !== +value)],
        },
      };
    } else if (inProgress[category][id]) {
      newProgress = {
        [otherCategory]: { ...inProgress[otherCategory] },
        [category]: {
          ...inProgress[category],
          [id]: [...inProgress[category][id], +value],
        },
      };
    }
    setArrChecked(newProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
  };

  const checkedBtn = (inProgreArr, index, recipe) => {
    const category = handleCategoryAndId(recipe, 'category');
    const id = handleCategoryAndId(recipe, 'id');
    if (
      inProgreArr
      && inProgreArr[category]
      && inProgreArr[category][id]
      && inProgreArr[category][id].includes(index)
    ) {
      return true;
    }
    return false;
  };

  const checkEnableBtn = (arrChecked, recipe, setEnableBtn, ingredients) => {
    const category = handleCategoryAndId(recipe, 'category');
    const id = handleCategoryAndId(recipe, 'id');
    if (arrChecked[category] && arrChecked[category][id]) {
      if (arrChecked[category][id].length === ingredients.length) {
        setEnableBtn(false);
      } else {
        setEnableBtn(true);
      }
    }
  };

  const createIngredientsAndMesure = (recipe, value) => {
    let count = 1;
    const arrValue = [];

    if (value === 'ingredients') {
      while (recipe[`strIngredient${count}`]) {
        arrValue.push(recipe[`strIngredient${count}`]);
        count += 1;
      }
    } else if (value === 'mesure') {
      while (recipe[`strIngredient${count}`]) {
        arrValue.push(recipe[`strMeasure${count}`]);
        count += 1;
      }
    }

    return arrValue;
  };

  return {
    handleIngredients,
    checkedBtn,
    createIngredientsAndMesure,
    checkEnableBtn,
  };
}
