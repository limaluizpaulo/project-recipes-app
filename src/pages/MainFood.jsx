import React, { useState, useEffect } from 'react';

const FIVE = 5; // number of categories to render
const TWELVE = 12; // number of recipes to render

function MainFood() {
  const [categories, setCategories] = useState([]);
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    const getCatergories = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setCategories(meals.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setFoodRecipes(meals.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, []);

  const filterByCategory = async (category) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const { meals } = await fetch(endpoint).then((data) => data.json());
    setFoodRecipes(meals.slice(0, TWELVE));
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
        {foodRecipes.map(({ strMealThumb, strMeal }, idx) => (
          <div key={ idx } data-testid={ `${idx}-recipe-card` }>
            <img
              src={ strMealThumb }
              alt={ `Imagem do prato ${strMeal}` }
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strMeal}</span>
          </div>
        ))}
      </section>
    </main>
  );
}

export default MainFood;
