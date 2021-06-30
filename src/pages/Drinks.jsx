import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionDrinks } from '../actions';

class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.fetchDrinks = this.fetchDrinks.bind(this);
  }

  componentDidMount() {
    this.fetchDrinks();
  }

  fetchDrinks() {
    const { drinks } = this.props;
    drinks();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (<h3>Loading...</h3>);
    }
    const { listDrinks } = this.props;
    console.log(listDrinks.drinks);
    return (
      <div>
        <Header header="Bebidas" explorer />
        <h2> vodK </h2>
        {listDrinks.map((drink) => <h5 key={ drink.strDrink }>{drink.strDrink}</h5>)}
        <DownMenu />
      </div>
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
