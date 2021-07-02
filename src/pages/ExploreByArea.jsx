import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaMeals, fetchMealByArea } from '../services/mealsApi';
import { useMealsContext } from '../context/mealsContext';
import DropdownArea from '../components/DropdownArea';
import CardRecipe from '../components/CardRecipe';

export default function ExploreByArea() {
  const { areaSelected } = useMealsContext();
  const [mealsToRender, setMealsToRender] = useState([]);
  const [areaList, setAreaList] = useState([]);
  useEffect(() => {
    const TWELVE = 12;
    fetchAreaMeals()
      .then((res) => setAreaList(res));
    fetchMealByArea(areaSelected).then((res) => setMealsToRender(res.slice(0, TWELVE)));
  }, [areaSelected, setMealsToRender]);
  return (
    <div>
      <Header title="Explorar Origem" search />
      <DropdownArea data={ areaList } />
      {mealsToRender.map((
        data, index,
      ) => <CardRecipe key={ index } data={ data } index={ index } />)}
      <Footer />
    </div>
  );
}
