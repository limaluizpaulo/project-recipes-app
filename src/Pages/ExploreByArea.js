import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CountryCard from '../Components/CountryCard';

class ExploreByArea extends React.Component {
  constructor() {
    super();

    this.state = {
      countries: [],
    };

    this.fetchCountries = this.fetchCountries.bind(this);
    this.setCountriesToState = this.setCountriesToState.bind(this);
  }

  componentDidMount() {
    this.fetchCountries()
      .then((countries) => this.setCountriesToState(countries));
  }

  setCountriesToState(countries) {
    const arrayOfCountries = Object.values(countries)[0];
    this.setState({
      countries: arrayOfCountries,
    });
  }

  fetchInfo(url) {
    return fetch(url)
      .then((response) => (
        response
          .json()
          .then((json) => (response.ok
            ? Promise.resolve((json)) : Promise.reject(json)))
      ));
  }

  fetchCountries() {
    return this.fetchInfo('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  }

  render() {
    const { countries } = this.state;
    const { location: { pathname } } = this.props;

    return (
      <div>
        <Header pathname={ pathname } />
        { countries.length === 0 ? <span>Carregando...</span>
          : <CountryCard countries={ countries } /> }
        <Footer />
      </div>
    );
  }
}

ExploreByArea.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreByArea;
