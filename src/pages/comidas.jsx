import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories } from '../action';
import MainScreen from '../components/MainScreen';
import Cards from '../components/cards';
import Fooder from '../components/footer';

class Comidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodCategories: [],
    };

    this.categories = this.categories.bind(this);
  }

  async componentDidMount() {
    const { apiFoodCategories } = this.props;
    apiFoodCategories();
    // await apiFoodCategories().then((data) => console.log(data));
  }

  categories() {
    const { getFoodCategories } = this.props;
    // const teste = getFoodCategories.map((elem) => elem);
    console.log(getFoodCategories);
    return (
      <div>
        { getFoodCategories.map((elem, index) => (
          <p key={ index }>{ elem.strCategory }</p>)) }
      </div>
    );
  }

  render() {
    // const { foodCategories } = this.state;
    // console.log(foodCategories);
    const { location } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          {/* <MainScreen /> */}
        </main>
        <p>qualquer coisa</p>
        { this.categories() }
        <Fooder />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFoodCategories: () => dispatch(fetchApiFoodCategories()), // apagar
});

const mapStateToProps = (state) => ({
  getFoodCategories: state.foodCategories.allFoodCategories,

});

Comidas.propTypes = {
  apiFoodCategories: PropTypes.func,
  getFoodCategories: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
