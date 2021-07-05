import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionDrinks } from '../actions';
import CardItem from '../components/CardItem';

class Drinks extends Component {
  constructor(props) {
    super(props);

    this.fetchDrinks = this.fetchDrinks.bind(this);
  }

  componentDidMount() {
    this.fetchDrinks();
  }

  fetchDrinks() {
    const { drinks } = this.props;
    drinks();
  }

  render() {
    const { listDrinks } = this.props;
    if (!listDrinks) return (<h3>Loading...</h3>);
    return (
      <>
        <Header header="Bebidas" explorer />
        <h2>Drinks</h2>
        {listDrinks.map(({ strDrinkThumb, strDrink }, index) => (
          <CardItem
            key={ index }
            index={ index }
            name={ strDrink }
            image={ strDrinkThumb }
          />))}
        <DownMenu />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  drinks: () => dispatch(actionDrinks()),
});
const mapStateToProps = (state) => ({
  listDrinks: state.drinks.drinks,
});

Drinks.propTypes = {
  drinks: PropTypes.func.isRequired,
  listDrinks: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
