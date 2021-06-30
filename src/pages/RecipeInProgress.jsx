// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// function RecipeInProgress(inProgressRecipe, history) {
//   return (
//     <section>
//       <h2 data-testid="recipe-title">Titulo da receita</h2>
//       <img src="" alt="Imagem ilustrativa do prato " data-testid="recipe-photo" />
//       <button type="button" data-testid="share-btn">Compartilhar</button>
//       <button type="button" data-testid="favorite-btn">Favoritar</button>
//       <span data-testid="recipe-category">Categoria da receita</span>
//       <ul>
//         {/* ingredients.map(()=>{} */}
//       </ul>
//       <span data-testid="instructions">Intruções</span>
//       <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>

//     </section>
//   );
// }

// const mapStateToProps = (state) => ({
//   inProgressRecipe: state.recipes.inProgressRecipe,
// });

// RecipeInProgress.propTypes = {
//   inProgressRecipe: PropTypes.objectOf,
// }.isRequired;

// export default connect(mapStateToProps)(RecipeInProgress);
