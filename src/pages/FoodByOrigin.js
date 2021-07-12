import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchApi';

class FoodByOrigin extends React.Component {
  constructor() {
    super();
    this.state = {
      respAPI: [],
      respArea: [],
      respOriginal: [],
      filter: 'All',
    };

    this.fetchFood = this.fetchFood.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.filterByArea = this.filterByArea.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
    this.fetchFood();
  }

  onChangeSelect({ target }) {
    this.setState({ filter: target.value }, () => this.filterByArea());
  }

  async fetchFood() {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const responseAPI = await fetchAPI(url);
    const url1 = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const responseArea = await fetchAPI(url1);
    this.setState(
      { respOriginal: responseAPI.meals,
        respAPI: responseAPI.meals,
        respArea: responseArea.meals,
      },
    );
  }

  async filterByArea() {
    const { respOriginal, filter } = this.state;
    let countryArea;
    console.log('FILTER', filter);
    if (filter !== 'All') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
      const responseAPI = await fetchAPI(url);
      console.log(responseAPI);
      countryArea = responseAPI.meals;
    } else {
      countryArea = respOriginal;
    }
    return this.setState({ respAPI: countryArea });
  }

  renderSelect() {
    const { respArea } = this.state;
    return (
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (target) => this.onChangeSelect(target) }
      >
        <option data-testid="All-option"> All </option>
        {respArea.map(({ strArea }, index) => {
          return (
            <option key={ index } data-testid={ `${strArea}-option` }>
              { strArea }
            </option>
          );
        })}
      </select>
    );
  }

  renderCards() {
    const { respAPI } = this.state;
    const maxNumberOfCards = 11;
    if (respAPI !== null) {
      return respAPI.map((food, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <Link key={ index } to={ `/comidas/${food.idMeal}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
                <img
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                />
              </div>
            </Link>
          );
        }
        return null;
      });
    }
  }

  render() {
    return (
      <section>
        <Header title="Explorar Origem" />
        { this.renderSelect() }
        { this.renderCards() }
        <Footer />
      </section>
    );
  }
}

export default FoodByOrigin;
