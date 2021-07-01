import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Footer } from '../Components';
import { fetchComidasOnComponentDidMount } from '../redux/actions';
import '../App.css';
import MealCard from '../Components/MealCard';

class Comidas extends React.Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
    };
  }

  componentDidMount() {
    const { dispatchItemsOnComponentMount } = this.props;

    dispatchItemsOnComponentMount();
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) {
      return (<h1>Loading...</h1>);
    }

    const { meals } = this.props;
    return (
      <div>
        <Header search />
        <MealCard meals={ meals } />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { meals } = state;
  return {
    meals: meals.meals,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchItemsOnComponentMount:
  () => dispatch(fetchComidasOnComponentDidMount()),
});

Comidas.propTypes = {
  dispatchItemsOnComponentMount: PropTypes.func.isRequired,
  meals: PropTypes.shape({
    meals: PropTypes.shape(),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
