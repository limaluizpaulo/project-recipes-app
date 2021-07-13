import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import copy from 'clipboard-copy';
import { getMealById } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Button from '../helpers/Button';
import Recommended from '../components/Recommended';
import { getItem, setItem, createDoneRecipe, setInitialItem }
  from '../helpers/HelperFunctions';
import FavoriteButton from '../helpers/FavoriteButton';

function InProgress() {
  const { type } = useContext(RecipesContext);
  const typeKey = type === 'drinks' ? 'cocktails' : 'meals';
  const { id } = useParams();
  setInitialItem('inProgressRecipes', {
    cocktails: {},
    meals: {},
    [typeKey]: { [id]: [] },
  });
  setInitialItem('doneRecipes', []);
  setInitialItem('favoriteRecipes', []);
  const history = useHistory();
  // const [idDetails, setIdDetails] = useState(id);
  const [detailsData, setDetailsData] = useState({});
  const [shareCopy, setShareCopy] = useState(false);

  const localStorageIngredients = getItem('inProgressRecipes')[typeKey][id];
  const [ingredientCheck, setIngredientCheck] = useState(localStorageIngredients);
  // console.log(ingredientCheck);

  // const createIngredientsList = (/* detailsData, localStorageIngredients */) => (
  //   Object.fromEntries(
  //     Object.keys(detailsData).filter(
  //       (key) => (key.includes('strIngredient') && detailsData[key]),
  //     ).map(
  //       (ingredient) => ([detailsData[ingredient],
  //         localStorageIngredients.includes(detailsData[ingredient])]),
  //     ),
  //   )
  // );

  // useEffect(() => {
  //   const createIngredientsList = (/* detailsData, localStorageIngredients */) => (
  //     Object.fromEntries(
  //       Object.keys(detailsData).filter(
  //         (key) => (key.includes('strIngredient') && detailsData[key]),
  //       ).map(
  //         (ingredient) => ([detailsData[ingredient],
  //           localStorageIngredients.includes(detailsData[ingredient])]),
  //       ),
  //     )
  //   );
  //   const ingredientsList = createIngredientsList();
  //   console.log(ingredientsList);
  //   setIngredientCheck(ingredientsList);
  // }, []);

  const capitalize = (text) => text.replace(
    /(?:^|\s)\S/g, (first) => first.toUpperCase(),
  );

  const minusOne = -1;
  const singleType = capitalize(type.slice(0, minusOne));
  const thumbnail = `str${singleType}Thumb`;
  const title = `str${singleType}`;
  const category = type === 'meals' ? 'strCategory' : 'strAlcoholic';
  const instructions = 'strInstructions';
  const { pathname } = useLocation();

  useEffect(() => {
    const getData = async () => {
      const result = await getMealById(id, type);
      setDetailsData(result[0]);
    };
    getData();
  }, [type, id]);
  const thirtyTwo = 32;

  const recipeDone = () => {
    const itemList = getItem('doneRecipes');
    itemList.push(createDoneRecipe(id, type, detailsData));

    setItem('doneRecipes', itemList);
  };

  const redirectRecipesDone = () => {
    recipeDone();
    const inProgressRecipes = getItem('inProgressRecipes');
    delete inProgressRecipes[typeKey][id];
    setItem('inProgressRecipes', inProgressRecipes);
    history.push('/receitas-feitas');
  };

  const video = () => {
    if (type === 'drinks') {
      return null;
    }
    const videoId = detailsData.strYoutube === undefined ? ''
      : detailsData.strYoutube.slice(thirtyTwo);
    return (
      <section data-testid="video">
        <h3 className="title">Video</h3>
        <YouTube
          className="video"
          videoId={ videoId }
        />
      </section>);
  };

  const ingredientsAndMeasures = (ingredient, measure) => (measure !== null
    ? `${ingredient} - ${measure}` : ingredient);

  const checkOnClick = ({ target }) => {
    const inProgressRecipes = getItem('inProgressRecipes'); //  refatorar: não buscar do local estorage toda vez, salvar no local storage no final da função
    // console.log(`${target.name}: ${target.checked}`);
    if (target.checked) {
      inProgressRecipes[typeKey][id].push(target.name);
      // setIngredientCheck({
      //   ...ingredientCheck,
      //   [target.name]: true,
      // });
    } else {
      inProgressRecipes[typeKey][id] = inProgressRecipes[typeKey][id]
        .filter((ing) => ing !== target.name);
      // setIngredientCheck({
      //   ...ingredientCheck,
      //   [target.name]: false,
      // });
    }
    setIngredientCheck(inProgressRecipes[typeKey][id]);
    setItem('inProgressRecipes', inProgressRecipes);
    console.log(target.checked, inProgressRecipes);
  };

  // const checkedBool = ({ target }) => {
  //   const inProgressRecipes = getItem('inProgressRecipes');
  //   return (inProgressRecipes[typeKey][id]
  //     .includes(target.name));
  // };

  /*
    Material consultado sobre dataset
    https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Howto/Use_data_attributes#acesso_no_javascript
    { target: { dataset: { testid } } }
    */
  /*
    Material consultado sobre URL absoluta da página
    https://surajsharma.net/blog/current-url-in-react
  */
  const handleClickShare = async () => {
    const { href } = window.location;
    const url = href.slice(0, href.lastIndexOf('/'));
    await copy(url);
    setShareCopy(true);

    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      setShareCopy(false);
    }, FIVE_SECONDS);
  };

  return (detailsData === undefined ? <div /> : Object.keys(detailsData).length !== 0
  && (
    <div className="transparent">
      <header>
        <img
          className="detail-thumb"
          src={ detailsData[thumbnail] }
          alt={ detailsData[title] }
          data-testid="recipe-photo"
        />
      </header>
      <main className="main">
        <h1 data-testid="recipe-title" className="detail-title">{detailsData[title]}</h1>
        <h2
          data-testid="recipe-category"
          className="detail-subtitle"
        >
          {detailsData[category]}
        </h2>
        <div className="actions">
          { shareCopy && (<p>Link copiado!</p>) }
          <button type="button" onClick={ handleClickShare }>
            <img src={ shareIcon } alt="Share" data-testid="share-btn" />
          </button>
          <FavoriteButton data={ detailsData } />
        </div>
        <section className="text-content">
          <h3>Ingredients</h3>
          <ul>
            {/* data-testid="${index}-ingredient-name-and-measure" */

              Object.keys(detailsData).filter(
                (key) => (key.includes('strIngredient') && detailsData[key]),
              ).map(
                (ingredient, index) => (
                  <div data-testid={ `${index}-ingredient-step` } key={ index }>
                    {/* {console.log(ingredientCheck)} */}
                    <input
                      name={ detailsData[ingredient] }
                      // data-testid={ `${index}-ingredient-step` }
                      type="checkbox"
                      id={ detailsData[ingredient] }
                      onClick={ checkOnClick }
                      checked={ ingredientCheck.includes(detailsData[ingredient]) }
                    />
                    <label
                      htmlFor={ detailsData[ingredient] }
                    >
                      { ingredientsAndMeasures(detailsData[ingredient],
                        detailsData[`strMeasure${index + 1}`]) }
                    </label>
                  </div>),
              )
            }
          </ul>
        </section>
        <section className="text-content">
          <h3>Instructions</h3>
          <p data-testid="instructions">{detailsData[instructions]}</p>
        </section>
        {// https://www.npmjs.com/package/react-youtube
          video()
        }
        <Recommended />
      </main>
      <footer className="footer-details">
        <Button
          func={ () => redirectRecipesDone() }
          className="start-recipe"
          label="Finalizar receita"
          testid="finish-recipe-btn"
        />

      </footer>
    </div>)
  );
}

export default InProgress;
