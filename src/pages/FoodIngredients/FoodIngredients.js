import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { requestAllMealIngredients } from '../../helpers/requests';

function FoodIngredients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestAllMealIngredients();
      setData(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const { meals } = param;
    return meals
      .map((item, index) => (
        <div key={ index }>
          {console.log(item)}
        </div>
      ),
        // return null;
      );
  }

  // console.log(data);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
      <Footer />
    </div>
  );
}

export default FoodIngredients;
