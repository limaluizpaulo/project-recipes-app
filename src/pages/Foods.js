import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const Foods = () => {
  const {
    meals: defaultMeals,
    recipes: { meals = [] },
  } = useContext(GlobalContext);
  // const [defaultMeals, setDefaultMeals] = useState([]);

  // useEffect(() => {
  //   const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   fetch(URL)
  //     .then((res) => res.json())
  //     .then(({ meals: data }) => setDefaultMeals(data));
  // }, []);

  const renderCard = () => {
    const magic = 12;
    if (meals && defaultMeals) {
      const recipes = meals.length ? meals : defaultMeals;
      const newRecipes = recipes.filter((_, idx) => idx < magic);
      return newRecipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link key={ idMeal } to={ `/comidas/${idMeal}` }>
          <div key={ index } className="cards" data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <div className="container">
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          </div>
        </Link>
      ));
    }
    return [];
  };

  return (
    <div>
      <Header title="Comidas" search food />
      <Categories food />
      <div className="grade">
        {renderCard().length && renderCard()}
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
