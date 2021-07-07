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

export async function fetchAPI(URL) {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
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
// export default fetchAPI;
