const fetchAreas = async (type = 'meals') => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const MEALS_URL = `https://www.the${search}db.com/api/json/v1/1/list.php?a=list`;
  const areas = await fetch(MEALS_URL)
    .then((res) => res.json())
    .then((res) => res[type])
    .then((res) => res.map(({ strArea }) => strArea));

  return areas;
};

export default fetchAreas;
