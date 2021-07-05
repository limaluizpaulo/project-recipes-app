/*
  Material consultado sobre o módulo light-weight 'node-fetch' que trás o window.fetch para Node.js: npm install --save @types/node-fetch
  https://github.com/node-fetch/node-fetch#motivation
 */
// import fetch from 'node-fetch';

/*
  Essa função recebe uma url, consulta na API e retorna o objeto JSON resultado do sucesso de uma Promise do processamento da stream response
*/
const fetchAPI = async (url) => {
  const response = await fetch(url); // busca o resultado de uma Promise de consulta usando a api e uma url como parâmetro
  return response.json(); // retorna o objeto JSON resultado do sucesso de uma Promise do processamento da stream response
};

const getAPI = async (url, type, key, filter = '') => {
  const endpoint = `${url}${type}${filter}`;
  console.log(endpoint);
  try {
    const results = await fetchAPI(endpoint);
    // console.log(results[key]);
    return results[key];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default getAPI;
