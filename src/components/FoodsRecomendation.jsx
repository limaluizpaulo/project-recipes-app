import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
import fetchFoodsRecomendation from '../RequisiçõesAPI/food/RequestByRecomendation';

export default function FoodsRecomendation() {
  const [recomend, setRecomend] = useState([]);

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 2,
  //   centerMode: false,
  //   slidesToScroll: 2,
  // };

  useEffect(() => {
    const handleFoodsRecomendation = async () => {
      const zero = 0;
      const six = 6;
      const response = await fetchFoodsRecomendation();
      const result = await response.meals;
      const sixRecomend = result.slice(zero, six);
      setRecomend(sixRecomend);
      console.log(recomend);
    };
    handleFoodsRecomendation();
  }, []);

  return (
    <div>
      {recomend.map((food, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          <p data-testid={ `${index}-recomendation-title` }>{food.strMeal}</p>
          <button
            type="button"
            key={ index }
            // onClick={ () => history.push('/bebidas') }
          >
            <img
              key={ index }
              data-testid={ `${index}-card-img` }
              alt={ food.strMeal }
              src={ food.strMealThumb }
            />
          </button>
        </div>
      ))}
    </div>

  // <div>
  //   <Slider { ...settings }>
  //     { recomend && recomend.map((food, index) => (
  //       <div
  //         data-testid={ `${index}-recomendation-card` }
  //         key={ index }
  //       >
  //         <p
  //           data-testid={ `${index}-recomendation-title` }
  //         >
  //           {food.strMeal}
  //         </p>
  //         <button
  //           type="button"
  //           key={ index }
  //         >
  //           <img
  //             key={ index }
  //             data-testid={ `${index}-card-img` }
  //             alt={ food.strMeal }
  //             src={ food.strMealThumb }
  //             width="100px"
  //           />
  //         </button>
  //       </div>
  //     ))}
  //   </Slider>

  // </div>
  );
}
