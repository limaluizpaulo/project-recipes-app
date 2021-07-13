export async function fetchAPI(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.toString());
  }
}

// Source: https://medium.com/swlh/promises-async-await-and-fetch-network-requests-in-modern-javascript-fd0b2b384f3e

export async function getRandomData(domain) {
  try {
    const URL_RANDOM_SEARCH = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
    const res = await fetch(URL_RANDOM_SEARCH);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getCategoriesList(domain) {
  try {
    const URL_CATEGORIES_LIST = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
    const res = await fetch(URL_CATEGORIES_LIST);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getDataByCategory(domain, category) {
  try {
    const URL_DATA_BY_CATEGORY = `https://www.${domain}.com/api/json/v1/1/filter.php?c=${category}`;
    const res = await fetch(URL_DATA_BY_CATEGORY);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getDataIngredientsList(domain) {
  try {
    const URL_DATA_INGREDIENTS_LIST = `https://www.${domain}.com/api/json/v1/1/list.php?i=list`;
    const res = await fetch(URL_DATA_INGREDIENTS_LIST);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getDataIngredients(domain, ingredient) {
  try {
    const URL_INGREDIENTS = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const res = await fetch(URL_INGREDIENTS);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getRandomRecipe(domain) {
  try {
    const URL_RANDOM = `https://www.${domain}.com/api/json/v1/1/random.php`;
    const res = await fetch(URL_RANDOM);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getAreasList() {
  try {
    const URL_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const res = await fetch(URL_AREA);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getRecipeByArea(area) {
  try {
    const URL_DATA_AREA = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const res = await fetch(URL_DATA_AREA);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}

export async function getDataById(domain, id) {
  try {
    const URL_DETAILS = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(URL_DETAILS);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (e) {
    console.log(e.toString());
  }
}
