// import React, { useContext } from 'react';
// import RecipeContext from '../context';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
// import RecipesDrinkList from '../components/RecipesDrinksList';
// import useFetchRecipesApi from '../utils/useFetchRecipesApi';

// const SEARCH_GENERAL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const SEARCH_BY_CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

// function Drink() {
//   const [setRecipeUrl] = useFetchRecipesApi();
//   const { showSearch, categories, setSelectedCategory,
//     selectedCategory, setToggleBtnCategories } = useContext(RecipeContext);

//   function handleClick(category = '') {
//     if (selectedCategory === category || category === '') {
//       setToggleBtnCategories(false);
//       setSelectedCategory('');
//       setRecipeUrl(SEARCH_GENERAL_DRINK);
//     } else {
//       setToggleBtnCategories(true);
//       setSelectedCategory(category);
//       setRecipeUrl(`${SEARCH_BY_CATEGORY_DRINK}${category}`);
//     }
//   }

//   // function handleAll() {
//   //   setToggleBtnCategories(false);
//   //   setSelectedCategory('');
//   //   setRecipeUrl(SEARCH_GENERAL_DRINK);
//   // }

//   return (
//     <div>
//       <Header title="Bebidas" />
//       { showSearch && <SearchBar /> }
//       <button
//         type="button"
//         data-testid="All-category-filter"
//         onClick={ () => handleClick('') }
//       >
//         All
//       </button>
//       {categories.map(({ strCategory }) => (
//         <button
//           type="button"
//           data-testid={ `${strCategory}-category-filter` }
//           key={ strCategory }
//           onClick={ () => handleClick(strCategory) }
//         >
//           { strCategory }
//         </button>
//       ))}
//       <RecipesDrinkList url={ SEARCH_GENERAL_DRINK } />
//       <Footer />
//     </div>
//   );
// }

// export default Drink;
