import React, { useContext, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import store, { } from '../../context/store';
// import { DRINKS, fetchAPI, MEALS } from '../../services';

const initialImgs = { firstImg: 0, secondImg: 1 };

export default function RecommendedRecipes() {
  const [show, setShow] = useState(initialImgs);
  const {
    recipes: { recommendedRecipes, recommendedLimit },
  } = useContext(store);

  const renderRecommended = () => {
    const { firstImg, secondImg } = show;
    const newRecipes = recommendedRecipes.slice(0, recommendedLimit);

    const nextSlide = () => {
      if (secondImg === newRecipes.length - 1) {
        setShow(initialImgs);
      } else {
        setShow((prevState) => ({
          firstImg: prevState.firstImg + 2,
          secondImg: prevState.secondImg + 2,
        }));
      }
    };

    const prevSlide = () => {
      if (firstImg === 0) {
        setShow({
          firstImg: newRecipes.length - 2,
          secondImg: newRecipes.length - 1,
        });
      } else {
        setShow((prevState) => ({
          firstImg: prevState.firstImg - 2,
          secondImg: prevState.secondImg - 2,
        }));
      }
    };

    return (
      <div className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={ prevSlide } />
        {newRecipes.map((recipe, index) => (
          <div
            key={ index }
            className={ (index === firstImg || index === secondImg) ? (
              'slide active') : ('slide') }
            data-testid={ `${index}-recomendation-card` }
          >
            <div
              className="imgTitle"
            >
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="recipe-img"
                className="recommendedImg"
              />
              <h4
                data-testid={ `${index}-recomendation-title` }
                className="recommendedTitle"
              >
                {
                  recipe.strMeal || recipe.strDrink
                }
              </h4>
            </div>
          </div>
        ))}
        <FaArrowAltCircleRight className="right-arrow" onClick={ nextSlide } />
      </div>
    );
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  // useEffect(() => {
  //   const getRecommended = async () => {
  //     if (foods) {
  //       const Drinks = await fetchAPI(DRINKS);
  //       setRecipes(addRecommended(Drinks.drinks));
  //     } else {
  //       const Meals = await fetchAPI(MEALS);
  //       setRecipes(addRecommended(Meals.meals));
  //     }
  //   };
  //   getRecommended();
  // }, []);

  // ---------------------------------------------------------------------------------------------

  return (
    renderRecommended()
  );
}
