import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Footer } from '../Components';
import { fetchComidasOnComponentDidMount, clearRecipes } from '../redux/actions';
import '../App.css';
import RecipeCard from '../Components/RecipeCard';

class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipoAtual: props.match.params.recipetype,
    };

    this.setRecipeType = this.setRecipeType.bind(this);
    this.func = this.func.bind(this);
  }

  componentDidMount() {
    this.setRecipeType(this.props.match.params.recipetype);
  }

  componentDidUpdate(prevProps) {
    // SE A ROTA MUDAR, REFAÇA O FETCH COM O NOVO VALOR DA ROTA
    if (prevProps.match.params.recipetype !== this.props.match.params.recipetype) {
      this.setRecipeType(this.props.match.params.recipetype);
    }
  }

  setRecipeType(recipetype) {
    const { dispatchItemsOnComponentMount } = this.props;

    dispatchItemsOnComponentMount(recipetype);
  }

  // func() {
  //   const { history } = this.props;
  //   const state = { tipoAtual: 'bebidas' };
  //   const title = 'bebidas';
  //   const url = '/bebidas';

  //   console.log(history);
  //   history.replace({
  //     pathname: url,
  //     state,
  //   });
  // }

  render() {
    const { isFetching, history, recipes,
      match: { params: { recipetype } } } = this.props;
    const { tipoAtual } = this.state;

    return (
      <div>
        {/* <button type="button" onClick={ () => this.func() } />
        AAAAAAAAAAAA */}
        <Header title={ tipoAtual } search />
        {
          (recipes && !isFetching)
            ? <RecipeCard recipes={ recipes } recipetype={ tipoAtual } />
            : <h1>Loading...</h1>
        }
        <Footer
          history={ history }
          recipetype={ tipoAtual }
          setRecipeType={ this.setRecipeType }
        />
      </div>);
  }
}

const mapStateToProps = (state) => {
  const { recipes } = state;
  return {
    recipes: recipes.recipes ? (recipes.recipes) : null,
    isFetching: recipes.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchItemsOnComponentMount:
  (aaa) => dispatch(fetchComidasOnComponentDidMount(aaa)),
  clearRecipes: () => dispatch(clearRecipes()),
});

Recipes.propTypes = {
  dispatchItemsOnComponentMount: PropTypes.func.isRequired,
  recipes: PropTypes.shape({
    meals: PropTypes.shape(),
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
