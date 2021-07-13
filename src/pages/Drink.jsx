// import React, { useContext } from 'react';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import AppContext from '../ContextApi/Context';

// export default function Drink() {
//   const { listOfContext: { foodAndDrinkList } } = useContext(AppContext);

//   return (
//     <div>
//       <Header title="Bebidas" />
//       <Footer />
//       { foodAndDrinkList && foodAndDrinkList.map((item, index) => (
//         <div
//           key={ item.idDrink }
//           data-testid={ `${index}-recipe-card` }
//         >
//           <img
//             data-testid={ `${index}-card-img` }
//             src={ item.strDrinkThumb }
//             alt={ item.strDrink }
//           />
//           <p data-testid={ `${index}-card-name` }>{ item.strDrink }</p>
//         </div>)) }
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../ContextApi/Context';

export default function Drink() {
  const [filtersByCategory, setFiltersByCategory] = useState([]);
  const [checkCategory, setCheckCategory] = useState('all');

  const { listOfContext: {
    foodAndDrinkList,
    setFoodAndDrinkList,
  } } = useContext(AppContext);

  const history = useHistory();

  const getGenericDrinks = async () => {
    const endpointMeals = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const twelve = 12;
    const result = await fetch(endpointMeals).then((data) => data.json())
      .then((object) => object.drinks.filter((item, index) => item && index < twelve));
      // .catch((error) => error);
    setFoodAndDrinkList(result);
  };

  useEffect(() => {
    getGenericDrinks();
  }, []);

  useEffect(() => {
    const getFiltersByCategory = async () => {
      const endpointCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const five = 5;
      const result = await fetch(endpointCategory).then((data) => data.json())
        .then((object) => object.drinks
          .filter((item, index) => item.strCategory && index < five));
        // .catch((error) => error);
      setFiltersByCategory(result);
    };
    getFiltersByCategory();
  }, []);

  const getCategoryDrinks = async (category) => {
    if (checkCategory === 'all' || checkCategory !== category) {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const twelve = 12;
      const result = await fetch(endpoint).then((data) => data.json())
        .then((object) => object.drinks.filter((item, index) => item && index < twelve));
        // .catch((error) => console.log(error));
      console.log(category);
      setFoodAndDrinkList(result);
      setCheckCategory(category);
    } else {
      getGenericDrinks();
      setCheckCategory('all');
    }
  };

  return (
    <div>
      <Header title="Bebidas" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ getGenericDrinks }
        >
          All
        </button>
        { filtersByCategory && filtersByCategory.map(({ strCategory }) => (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name={ strCategory }
            onClick={ ({ target: { name } }) => getCategoryDrinks(name) }
          >
            { strCategory }
          </button>
        ))}
      </div>
      { foodAndDrinkList && foodAndDrinkList.map((item, index) => (
        <button
          key={ item.idDrink }
          data-testid={ `${index}-recipe-card` }
          type="button"
          onClick={ () => history.push(`/bebidas/${item.idDrink}`) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{ item.strDrink }</p>
        </button>
      )) }
      <Footer />
    </div>
  );
}
