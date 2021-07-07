import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionCategoriesDrinks, actionDrinks } from '../actions';
import CardItem from '../components/CardItem';

class Drinks extends Component {
  constructor(props) {
    super(props);

    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    this.fetchs();
  }

  fetchs() {
    const { drinks, categories } = this.props;
    drinks();
    categories();
  }

  render() {
    const { listDrinks, listCategories } = this.props;
    console.log(listDrinks);
    if (!listDrinks) return (<h3>Loading...</h3>);
    if (listDrinks.length === 1) {
      return <Redirect to={ `/bebidas/${listDrinks[0].idDrink}` } />;
    }
    return (
      <>
        <Header header="Bebidas" explorer />
        <h2>Drinks</h2>
        {listCategories
          ? listCategories.map(({ strCategory }, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              name={ strCategory }
              // onClick={ () => this.fetchRecipesCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))
          : <h3>Loading...</h3> }
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
  categories: () => dispatch(actionCategoriesDrinks()),
});
const mapStateToProps = (state) => ({
  listDrinks: state.drinks.drinks,
  listCategories: state.categories.categories,
});

Drinks.propTypes = {
  drinks: PropTypes.func.isRequired,
  listDrinks: PropTypes.shape().isRequired,
  categories: PropTypes.func.isRequired,
  listCategories: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
