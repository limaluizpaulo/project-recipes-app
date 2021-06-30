import React, { useState, useEffect } from 'react';

const FIVE = 5; // number of categories to render
const TWELVE = 12; // number of recipes to render

function MainDrink() {
  const [categories, setCategories] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);

  useEffect(() => {
    const getCatergories = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setCategories(drinks.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setDrinkRecipes(drinks.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, []);

  const filterByCategory = async (category) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const { drinks } = await fetch(endpoint).then((data) => data.json());
    console.log(drinks);
    setDrinkRecipes(drinks.slice(0, TWELVE));
  };

  return (
    <main>
      <section>
        {categories.map((el, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${el.strCategory}-category-filter` }
            onClick={ () => { filterByCategory(el.strCategory); } }
          >
            {el.strCategory}
          </button>
        ))}
      </section>

      <section>
        {drinkRecipes.map(({ strDrinkThumb, strDrink }, idx) => (
          <div key={ idx } data-testid={ `${idx}-recipe-card` }>
            <img
              src={ strDrinkThumb }
              alt={ `Imagem do prato ${strDrink}` }
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strDrink}</span>
          </div>
        ))}
      </section>
    </main>
  );
}

export default MainDrink;
