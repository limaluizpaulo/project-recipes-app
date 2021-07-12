import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMealsIngredients } from '../helpers/MealsAPI';
import logo from '../images/mustachef.svg';

export default function ExploreIngredients() {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const maxCards = 12;

  useEffect(() => {
    const ingredients = async () => {
      setIsFetching(true);
      const result = await getMealsIngredients();
      setData(result.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };
    ingredients();
  }, []);
  console.log(data);

  return isFetching ? (
    <div className="loading transparent">
      <img src={ logo } alt="Loading" />
    </div>
  ) : (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="transparent">
        { data.map((ingrediente, index) => (
          <Card
            key={ index }
            id={ ingrediente.idIngredient }
            // thumbnail={ ingrediente. } verificar se tem imagem / passar testid
            title={ ingrediente.strIngredient }
          />
        )) }
      </div>
      <Footer />
    </>
  );
}
