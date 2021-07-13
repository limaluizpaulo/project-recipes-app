// import React, { useContext } from 'react';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import AppContext from '../ContextApi/Context';

// export default function Food() {
//   const { listOfContext: { foodAndDrinkList } } = useContext(AppContext);

//   return (
//     <div>
//       <Header title="Comidas" />
//       <Footer />
//       { foodAndDrinkList && foodAndDrinkList.map((item, index) => (
//         <div
//           key={ item.idMeal }
//           data-testid={ `${index}-recipe-card` }
//         >
//           <img
//             data-testid={ `${index}-card-img` }
//             src={ item.strMealThumb }
//             alt={ item.strMeal }
//           />
//           <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
//         </div>)) }
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../ContextApi/Context';

export default function Food() {
  const [filtersByCategory, setFiltersByCategory] = useState([]);
  const [checkCategory, setCheckCategory] = useState('all');

  const { listOfContext: {
    foodAndDrinkList,
    setFoodAndDrinkList,
  } } = useContext(AppContext);

  const history = useHistory();

  const getGenericMeals = async () => {
    const endpointMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const twelve = 12;
    const result = await fetch(endpointMeals).then((data) => data.json())
      .then((object) => object.meals.filter((item, index) => item && index < twelve));
      // .catch((error) => error);
    setFoodAndDrinkList(result);
  };

  useEffect(() => {
    getGenericMeals();
  }, []);

  useEffect(() => {
    const getFiltersByCategory = async () => {
      const endpointCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const five = 5;
      const result = await fetch(endpointCategory).then((data) => data.json())
        .then((object) => object.meals
          .filter((item, index) => item.strCategory && index < five));
        // .catch((error) => error);
      setFiltersByCategory(result);
    };
    getFiltersByCategory();
  }, []);

  const getCategoryMeals = async (category) => {
    if (checkCategory === 'all' || checkCategory !== category) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const twelve = 12;
      const result = await fetch(endpoint).then((data) => data.json())
        .then((object) => object.meals.filter((item, index) => item && index < twelve));
        // .catch((error) => console.log(error));
      setFoodAndDrinkList(result);
      setCheckCategory(category);
    } else {
      getGenericMeals();
      setCheckCategory('all');
    }
  };

  return (
    <div>
      <Header title="Comidas" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ getGenericMeals }
        >
          All
        </button>
        { filtersByCategory && filtersByCategory.map(({ strCategory }) => (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name={ strCategory }
            onClick={ ({ target: { name } }) => getCategoryMeals(name) }
          >
            { strCategory }
          </button>
        ))}
      </div>
      { foodAndDrinkList.map((item, index) => (
        <button
          key={ item.idMeal }
          data-testid={ `${index}-recipe-card` }
          type="button"
          onClick={ () => history.push(`/comidas/${item.idMeal}`) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ item.strMeal }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
        </button>
      )) }
      <Footer />
    </div>
  );
}
