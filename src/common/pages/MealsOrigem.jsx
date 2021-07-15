import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AREA_MEALS, fetchAPI } from '../../services/index';
import store, { setFetchOnDone } from '../../context/store';
import CardMealsArea from '../components/CardMealsArea';

export default function MealsOrigem() {
  const { recipes: { loading }, setRecipes } = useContext(store);
  const [dataArea, setDataArea] = useState([]);
  const [datacard, setDatacard] = useState('All');

  useEffect(() => {
    fetchAPI(AREA_MEALS)
      .then((res) => setDataArea(res.meals));
    setRecipes(setFetchOnDone(false));
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setDatacard(value);
  };

  if (loading) return (<h5>Loading...</h5>);
  return (
    <div>
      <Header pageName="Por Local de Origem " />
      <section className="mainContent">
        <label htmlFor="all">
          Selecione:
          <select
            id="all"
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
        </label>
        <CardMealsArea datacard={ datacard } />
      </section>
      <Footer />
    </div>
  );
}
