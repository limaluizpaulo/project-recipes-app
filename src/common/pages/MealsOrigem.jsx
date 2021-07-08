import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { AREA_MEALS, fetchAPI } from '../../services/index';
import store, { setLoading } from '../../context/store';
import CardMealsArea from '../components/CardMealsArea';

export default function MealsOrigem() {
  const { recipes: { loading }, setRecipes } = useContext(store);
  const [dataArea, setDataArea] = useState([]);
  const [datacard, setDatacard] = useState('All');

  useEffect(() => {
    fetchAPI(AREA_MEALS)
      .then((res) => setDataArea(res.meals));
    setRecipes(setLoading(false));
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setDatacard(value);
  };

  if (loading) return (<h5>Loading...</h5>);
  return (

    <div>

      <Header pageName="Por Local de Origem " />
      <select
        name="name"
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => handleChange(e) }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All

        </option>
        { dataArea.map((item) => (
          <option
            data-testid={ `${item.strArea}-option` }
            key={ item.strArea }
            value={ item.strArea }
          >
            {item.strArea}
          </option>)) }

      </select>
      <CardMealsArea datacard={ datacard } />
      <Footer />
    </div>
  );
}
