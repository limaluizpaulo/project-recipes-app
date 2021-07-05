import React, { useContext, useEffect } from 'react';
import { fetchMealsCategory, fetchTypeCotegoryMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryMeals() {
  const { categoryMeals, setCategoryMeals,
    setResponseApiLupaMeal, setRedirect } = useContext(RecipesContext);
  // const [toggleSearch, setToggleSearch] = useState(false);
  const handleClick = ({ target: { value } }) => {
    setRedirect(false);
    fetchTypeCotegoryMeals(value).then((result) => setResponseApiLupaMeal(result));
    // setToggleSearch(!toggleSearch);
  };

  const getApiCategory = () => {
    const FIVE = 5;
    fetchMealsCategory().then((result) => setCategoryMeals(result
      .filter((_e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);
  return (
    <>
      {categoryMeals.map(({ strCategory }) => (
        <button
          type="button"
          value={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </button>))}
    </>
  );
}
