import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiFoodCategories } from '../action';
import Cards from './cards';

// import '../css/MainScreen.css';

class MainScreen extends Component {
  componentDidMount() {

  }

  render() {
    const { foodCategories, drinkOurFood } = this.props;
    return (
      <section>
        
        
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
  foodCategories: state.foodCategories.allFoodCategories,
});

MainScreen.propTypes = {
  dispatchFoodCategories: PropTypes.func.isRequired,
  foodCategories: PropTypes.shape.isRequired,
  drinkOurFood: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
