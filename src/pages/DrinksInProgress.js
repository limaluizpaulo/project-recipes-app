// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import ContexRecipes from '../context/RecipesContext';

// import shareIcon from '../images/shareIcon.svg';
// // import blackHeartIcon from '../images/blackHeartIcon.svg';
// // import whiteHeartIcon from '../images/whiteHeartIcon.svg';

// function DrinksInProgress() {
//   return (

//   // const copy = require('clipboard-copy');

//   // function copyLink(index, setIndex) {
//   //   if (index === setIndex) {
//   //     return (
//   //       <span>Link copiado!</span>
//   //     );
//   //   }
//   // }

//   // function DrinksInProgress() {
//   // const { match: { params: { id } } } = props;
//   //  const { ApiIdDetalhe,
//   // setApiIdDetalhe,
//   // funcHeartColor,
//   //   heartColor, setHeartColor, array, setArray, idHeart } = useContext(ContexRecipes);
//   // const [shareCopy, setShareCopy] = useState([false, '']);
//   // console.log(`quantidade do array ${array.length}`);
//   // console.log(`eu sou idHeart: ${idHeart}`);

//   // useEffect(() => {
//   //   const getLocalFavUse = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   //   if (getLocalFavUse) {
//   //     const filtrLocal = getLocalFavUse.filter((item) => (
//   //       item.id === ApiIdDetalhe.idMeal));
//   //     if (filtrLocal.length === 1) {
//   //       setHeartColor(blackHeartIcon);
//   //     } else {
//   //       setHeartColor(whiteHeartIcon);
//   //     }
//   //   }
//   // }, [ApiIdDetalhe, setHeartColor]);

//   // const buttonAvaliable = () => {
//   //   const ingr = document.getElementsByClassName('ingredientes').length;
//   //   console.log(`quantidade do ingr ${ingr}`);
//   //   if (ingr !== array.length || ingr === 0) {
//   //     return true;
//   //   }
//   //   return false;
//   // };
//   // console.log(buttonAvaliable());
//   // const renderIngredient = (ingre, index) => {
//   //   if (ingre.ingredient === null
//   //         || ingre.ingredient === ''
//   //         || ingre.ingredient === undefined) {
//   //     return null;
//   //   }
//   //   return (
//   //     <div>
//   //       <div
//   //         key={ index }
//   //         data-testid={ `${index}-ingredient-step` }
//   //       >
//   //         <p>{ingre.ingredient}</p>
//   //         <input
//   //           type="checkbox"
//   //           name={ ingre.ingredient }
//   //           value={ ingre.ingredient }
//   //           id={ ingre.ingredient }
//   //           onClick={ ({ target }) => setArray([...array, target.value]) }
//   //         />
//   //         <label htmlFor={ ingre.ingredient }>{ ingre.measure }</label>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//     <>
//       <img
//         src=""
//         data-testid="recipe-photo"
//         alt="Thumbnail"
//       />
//       <h1 data-testid="recipe-title">
//         {/* { .strDrinkThumb || .strMealThumb } */}
//         Titulo receita
//       </h1>
//       <input
//         type="image"
//         src={ shareIcon }
//         alt="share"
//         data-testid="share-btn"
//         // onClick={ () => setShareCopy(true) || copy((`http://localhost:3000/comidas/${id}`)) }
//       />
//       {/* {shareCopy ? copyLink(shareCopy[1]) : null} */}

//       {/* botão de favoritar */}
//       <input
//         type="image"
//         label="favorite"
//         src={ heartColor }
//         alt="heart"
//         data-testid="favorite-btn"
//       />
//       <h5 data-testid="recipe-category">
//         {ApiIdDetalhe.strAlcoholic ? ApiIdDetalhe.strAlcoholic : ApiIdDetalhe.strCategory}
//       </h5>
//       <h2>Ingredientes</h2>
//       {/* {ingredients.map((ingre, index) => renderIngredient(ingre, index))} */}

//       {/* texto da categoria */}
//       <h2>Instruções</h2>
//       <p data-testid="instructions">{ApiIdDetalhe.strInstructions}</p>

//       {/* botão para finalizar */}
//       <button
//         data-testid="finish-recipe-btn"
//         label="Finalizar a Receita"
//         type="button"
//         disabled={ buttonAvaliable() }
//         onClick={ {} }
//       >
//         Finalizar Receita
//       </button>

//     </>
//   );
// }

// DrinksInProgress.propTypes = {
//   match: PropTypes.objectOf(PropTypes.any).isRequired,
// };

// export default DrinksInProgress;
