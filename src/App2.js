/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const MealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const BeverageURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function App2() {
  const [results, setResults] = React.useState();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(MealsURL)
      .then((res) => res.json())
      .then((res) => setResults(res.meals))
      .then(() => setLoading(!loading));
  }, []);
  return loading ? <div>Loading...</div> : (
    <ul>
      {results.map((res, index) => (
        <li key={ index }>{res.strCategory}</li>
      ))}
    </ul>
  );
}
