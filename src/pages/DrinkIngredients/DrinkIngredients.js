import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { requestAllDrinkIngredients } from '../../helpers/requests';
import './Style.css';

function DrinkIngredients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestAllDrinkIngredients();
      setData(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const magicNumber = 12;
    const { drinks } = param;
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div className="card" key={ index } data-testid={ `${index}-ingredient-card` }>
          <Link
            to={ {
              pathname: '/bebidas',
              ingredients: item.strIngredient1,
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
              className="img"
              alt={ `imagem de ${item.strIngredient1}` }
            />
            <h5
              data-testid={ `${index}-card-name` }
            >
              {item.strIngredient1}
            </h5>
          </Link>
        </div>
      ));
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="control">
        {
          loading
            ? 'Carregando...'
            : (mapData(data))
        }
      </div>
      <Footer />
    </div>
  );
}

export default DrinkIngredients;
