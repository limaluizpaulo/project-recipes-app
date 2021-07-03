import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaMeals, fetchMealByArea } from '../services/mealsApi';
import { useMealsContext } from '../context/mealsContext';
import DropdownArea from '../components/DropdownArea';
import CardRecipe from '../components/CardRecipe';

export default function ExploreByArea() {
  const { areaSelected, mealsFiltered, setMealsFiltered } = useMealsContext();
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    const TWELVE = 12;
    const all = { strArea: 'All' };
    fetchAreaMeals()
      .then((res) => setAreaList([...res, all]));
    fetchMealByArea(areaSelected).then((res) => setMealsFiltered(res.slice(0, TWELVE)));
  }, [areaSelected, setMealsFiltered]);

  return (
    <div>
      <Header title="Explorar Origem" search />
      <DropdownArea data={ areaList } />
      {mealsFiltered.map((
        data, index,
      ) => <CardRecipe key={ index } data={ data } index={ index } />)}
      <Footer />
    </div>
  );
}
