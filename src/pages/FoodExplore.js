import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestRandomMeal } from '../services/api';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/DrinkAndFoodExplore(page).css';

function FoodExplore() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await requestRandomMeal();
      setItem(result);
    };
    request();
  }, []);

  if (item === null) return null;
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="drinkAndFood-exploreButtons-container">
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button
              className="drinkAndFood-exploreButtons"
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/comidas/area">
            <button
              className="drinkAndFood-exploreButtons"
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        </div>
        <div>
          {item.map((subItem, index) => (
            <Link key={ index } to={ `/comidas/${subItem.idMeal}` }>
              <button
                type="button"
                className="drinkAndFood-exploreButtons"
                data-testid="explore-surprise"
              >
                Me Surpreenda!
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FoodExplore;
