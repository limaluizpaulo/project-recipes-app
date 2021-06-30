import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from './Footer';
// import { FOOD_BY_AREA } from '../services/FoodAPI';

import fetchFood from '../services/FoodAPI';

export default function Explore() {
  const FOOD_BY_AREA = 'www.themealdb.com/api/json/v1/1/list.php?a=list';
  const [area, setArea] = useState(null);
  // const [meals, setMeals] = useState([]);

  // const { history } = useHistory();

  // function fetchFood() {
  //   return fetch('www.themealdb.com/api/json/v1/1/filter.php?a=Canadian')
  //     .then((res) => res.json())
  //     .then((res) => res.meals);
  // }

  useEffect(() => {
    fetchFood(FOOD_BY_AREA, null)
      .then((res) => setArea(res));
  }, []);

  // if (area === null) {
  //   return (
  //     <p>
  //       Loading profile...
  //     </p>
  //   );
  // }
  return (
    <>
      {/* <Header /> */}
      {/* {console.log(`${FOOD_BY_AREA}${area}`)} */}
      { console.log(area) }
      <Footer />
    </>
  );
}
