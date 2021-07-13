import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestRandomDrink } from '../services/api';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/DrinkAndFoodExplore(page).css';

function DrinkExplore() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await requestRandomDrink();
      setItem(result);
    };
    request();
  }, []);

  if (item === null) return null;
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="drinkAndFood-exploreButtons-container">
        <div>
          <Link to="/explorar/bebidas/ingredientes">
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
          {item.map((subItem, index) => (
            <Link key={ index } to={ `/bebidas/${subItem.idDrink}` }>
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

export default DrinkExplore;
