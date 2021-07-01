export default async function ingredienteApi(input, search) {
  const busca = search === 'i' ? 'filter' : 'search';
  const END_POINT = `https://www.themealdb.com/api/json/v1/1/${busca}.php?${search}=${input}`;
  const results = await fetch(END_POINT);
  return results.json();
}
