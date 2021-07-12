import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchApi';

class ExploreBeverages extends React.Component {
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
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const random = await fetchAPI(url);
    const randomId = random.drinks[0].idDrink;
    this.setState({
      randomId,
    });
  }

  render() {
    const { randomId } = this.state;
    const url = `/bebidas/${randomId}`;
    return (
      <section>
        <Header title="Explorar Bebidas" />
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
        </Link>
        <Link to={ url }>
          <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>
        <Footer />
      </section>
    );
  }
}

export default ExploreBeverages;
