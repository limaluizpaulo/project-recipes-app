import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import requestMeal, {
  requestAreaMeal, requestFilterAreaMeal } from '../../helpers/requests';
import Context from '../../Provider/context';

const LIMIT_OF_CARDS = 12;

function ExploreLocationFood() {
  const { dataFood, setDataFood } = useContext(Context);
  const [foodAreas, setFoodAreas] = useState([]);

  useEffect(() => {
    const request = async () => {
      const areas = await requestAreaMeal('list');
      setFoodAreas(areas.meals);
    };
    request();
  }, []);

  useEffect(() => {
    const request = async () => {
      const resolveMeal = await requestMeal();
      setDataFood(resolveMeal);
    };
    request();
  }, [setDataFood]);

  const renderCards = () => {
    console.log(dataFood);
    if (dataFood.meals) {
      const arryMeal = dataFood.meals.slice(0, LIMIT_OF_CARDS);
      console.log(arryMeal);

      return (
        arryMeal.map(({ idMeal, strMeal, strMealThumb }, i) => (
          <div key={ i } className="card" data-testid={ `${i}-recipe-card` }>
            <Link to={ `/comidas/${idMeal}` }>
              <img
                className="card-img-top"
                data-testid={ `${i}-card-img` }
                src={ strMealThumb }
                alt={ `imagem de ${strMeal}` }
                id={ idMeal }
              />
              <h5
                data-testid={ `${i}-card-name` }
              >
                {strMeal}
              </h5>
            </Link>
          </div>
        ))
      );
    }
    return 0;
  };

  const filterFood = async ({ target: { value } }) => {
    if (value === 'all') {
      const resolveMeal = await requestMeal();
      setDataFood(resolveMeal);
    } else {
      const areas = await requestFilterAreaMeal(value);
      setDataFood(areas);
    }
  };

  return (
    <>
      <Header title="Explorar Origem" haveSrc />

      <select data-testid="explore-by-area-dropdown" onChange={ filterFood }>
        <option data-testid="All-option" value="all">All</option>
        {foodAreas.map(({ strArea }, i) => (
          <option
            key={ i }
            data-testid={ `${strArea}-option` }
            value={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>

      <div className="card-meals">
        {renderCards()}
      </div>

      <Footer />
    </>
  );
}

export default ExploreLocationFood;
