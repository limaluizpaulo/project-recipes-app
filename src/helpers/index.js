import { fetchDetails } from '../services';

// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function urlToEmbed(url) {
  if (!url) return null;
  return `https://www.youtube.com/embed/${url.split('=')[1]}`;
}

export async function getDetails(type, id) {
  const result = await fetchDetails(type, id);

  const formattedIngredients = Object.entries(result)
    .filter((item) => item[0].includes('Ingredient') && item[1])
    .map((item) => item[1]);

  const formattedMeasures = Object.entries(result)
    .filter((item) => item[0].includes('Measure') && item[1])
    .map((item) => item[1]);

  return ([result, formattedIngredients, formattedMeasures]);
}
