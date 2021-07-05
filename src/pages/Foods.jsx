import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchRecipesList } from '../services/Api';

function Foods() {
  const { setTypeFunc, data, setData, mealsFilter, setNameRecipes, setImgRecipes } = useContext(FetchContext);
  // const [recipes, setRecipes] = useState([]);

  Foods.displayName = 'Comidas';

  const fnAlert = (func, message) => {
    func(message);
  };

  if (data === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (data.length === 1) {
    return <Redirect to={`/comidas/${data[0].idMeal}`} />;
  }

  const renderRecipes = () => {
      setNameRecipes('strMeal');
      setImgRecipes('strMealThumb')
      fetchRecipesList().then((res) => setData(res))
  }

  return (
    <div>
      { console.log(data)}
      { setTypeFunc('Foods')}
      <Header title={Foods.displayName} />
      { data.length === 0 &&  renderRecipes() } 
      <Cards />
      <Footer />
    </div>
  );
}

export default Foods;
