import { fetchDetails } from '../services';

// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function urlToEmbed(url) {
  if (!url) return null;
  return url.replace('watch?v=', 'embed/');
}

export async function getDetails(type, id) {
  const result = await fetchDetails(type, id);

  if (!result) return [];

  const formattedIngredients = Object.entries(result)
    .filter((item) => item[0].includes('Ingredient') && item[1])
    .map((item) => item[1]);

  const formattedMeasures = Object.entries(result)
    .filter((item) => item[0].includes('Measure') && item[1])
    .map((item) => item[1]);

  return ([result, formattedIngredients, formattedMeasures]);
}
