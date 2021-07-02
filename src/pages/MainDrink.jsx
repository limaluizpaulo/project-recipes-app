import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
// import messageAlert from '../services/helpers/alertMessage';

// Tela principal de receitas de bebidas: /bebidas;
export default function MainDrink({ history }) {
  const { data } = useContext(RecipeContext);
  // const [isLoading, setIsLoading] = useState(true);

  function renderDrinks() {
    if (data.length === 1) {
      history.push(`/bebidas/${data[0].idDrink}`);
    }
    if (data.length > 1) {
      return data.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>
            {' '}
            {item.strDrink}
          </p>
          <img
            src={ item.strDrinkThumb }
            alt="receita"
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
  }

  return (
    <div>
      <h4>Drinks</h4>
      <Header history={ history } title="Bebidas" />
      {
        data && renderDrinks()
      }
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
