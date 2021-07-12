import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchApi';

class ExploreFood extends React.Component {
  constructor() {
    super();
    this.state = {
      randomId: '',
    };
    this.fetchRandom = this.fetchRandom.bind(this);
  }

  componentDidMount() {
    this.fetchRandom();
  }

  async fetchRandom() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const random = await fetchAPI(url);
    const randomId = random.meals[0].idMeal;
    this.setState({
      randomId,
    });
  }

  render() {
    const { randomId } = this.state;
    const url = `/comidas/${randomId}`;
    return (
      <section>
        <Header title="Explorar Comidas" />
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
        </Link>
        <Link to={ url }>
          <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>
        <Footer />
      </section>
    );
  }
}

export default ExploreFood;
