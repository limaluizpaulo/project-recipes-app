import React, { useState, useEffect } from 'react';

const FIVE = 5;
const TWELVE = 12;

function MainDrink() {
  const [categories, setCategories] = useState([]);
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    const getCatergories = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setCategories(drinks.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setFoodRecipes(drinks.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, []);

  return (
    <main>
      <section>
        {categories.map((el, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${el.strCategory}-category-filter` }
          >
            {el.strCategory}
          </button>
        ))}
      </section>

      <section>
        {foodRecipes.map(({ strDrinkThumb, strDrink }, idx) => (
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
