import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkDetails, fetchFoodDetails, startRecipe } from '../action';
import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import '../css/progress.css';
import Instructions from '../components/Instructions';
import DetailsHeader from '../components/DetailsHeader';
import identification from '../helper/dictionaryApi';
import SharedFavorites from '../components/SharedFavorites';

class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: [],
      should: false,
      recipesLength: [],
      count: 0,
      isDisable: true,
      allIngredients: [],
    };
    this.updateState = this.updateState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.saveDoneRecipes = this.saveDoneRecipes.bind(this);
    this.finishRecipe = this.finishRecipe.bind(this);
    this.countRecipesAllLength = this.countRecipesAllLength.bind(this);
  }

  componentDidMount() {
    const { match: { params: { page, id } },
      foodDetails, drinksDetails, isStart } = this.props;
    isStart(true);

    const storage = Object.keys(localStorage);
    const check = storage.some((key) => key === 'inProgressRecipes');

    if (check === false) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {}, meals: {} }));
    }

    this.updateState();
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  componentDidUpdate() {
    const { id, allIngredients } = this.state;
    const { match: { params: { page } } } = this.props;
    const recovery = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (page === 'comidas') {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({ ...recovery,
        meals: { ...recovery.meals,
          [id]: allIngredients },
      }));
    }

    return localStorage.setItem('inProgressRecipes', JSON.stringify({ ...recovery,
      cocktails: { ...recovery.cocktails,
        [id]: allIngredients },
    }));
  }

  componentWillUnmount() {
    const { isStart } = this.props;
    isStart(false);
  }

  onClick(param, element, boolean) {
    const { count, allIngredients } = this.state;
    const { recipesLength } = this.state;
    if (allIngredients.includes(param) && boolean === 'checked') {
      element.classList.remove('riscado');

      return this.setState({
        allIngredients: allIngredients.filter((el) => el !== param) });
    }
    element.classList.add('riscado');
    this.setState({ ...allIngredients,
      allIngredients: [...allIngredients, param],

    });

    if (count + 1 === recipesLength) {
      this.setState({ isDisable: false });
    }
    this.setState({ count: count + 1 });
  }

  updateState() {
    const { match: { params: { id } } } = this.props;
    this.setState({ should: true, id });

    const recovery = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recovery.meals[id] !== undefined) {
      // console.log(recovery.meals[id], 'existo');
      console.log(recovery.meals[id], 'existo');
      return this.setState({ allIngredients: recovery.meals[id] });
    }

    if (recovery.cocktails[id] !== undefined) {
      return this.setState({ allIngredients: recovery.cocktails[id] });
    }
  }

  test() {
    const { details, match: { params: { id, page } } } = this.props;
    const { should } = this.state;

    if (should === true) {
      if (page === 'comidas') {
        this.countRecipesAllLength();
        return this.setState({
          id: details.idMeal,
          should: false });
      }
      this.countRecipesAllLength();

      return this.setState({
        id,
        should: false });
    }
  }

  saveDoneRecipes() {
    const { details, match: { params: { page } } } = this.props;
    const keyName = identification(details);
    const currentDate = new Date().toLocaleDateString();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipe = {
      id: details[keyName.Id],
      type: page,
      area: details[keyName.Area] ? details[keyName.Area] : '',
      category: details[keyName.Category] ? details[keyName.Category] : '',
      alcoholicOrNot: details[keyName.Alcoholic] ? details[keyName.Alcoholic] : '',
      name: details[keyName.Name],
      image: details[keyName.Thumb],
      doneDate: `${currentDate}`,
      tags: details[keyName.Tags] ? details[keyName.Tags] : '',
    };

    doneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  finishRecipe() {
    const { match: { params: { id, page } } } = this.props;
    if (localStorage.inProgressRecipes) {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (page === 'comidas') {
        delete inProgress.meals[id];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      }

      if (page === 'bebidas') {
        delete inProgress.cocktails[id];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      }
    }
    this.saveDoneRecipes();
  }

  countRecipesAllLength() {
    const { details } = this.props;
    const dictionary = identification(details);
    console.log('funciono', dictionary);
    const total = [];
    dictionary.Ingredients.map((ingredient) => {
      if (details[ingredient[0]] !== null && details[ingredient[0]] !== '') {
        total.push(details[ingredient[0]]);
        console.log(details[ingredient[0]]);
      }
      return this.setState({
        recipesLength: total.length,
      });
    });
  }

  render() {
    const { details, match: { params: { page, id } }, history } = this.props;
    const { isDisable, allIngredients } = this.state;

    return (
      <section>
        { details.strIngredient1 !== undefined && this.test() }
        <DetailsHeader data={ details } />
        <button type="button" onClick={ () => history.goBack() }>voltar</button>
        <SharedFavorites id={ id } page={ page } />
        <section className="details-content">
          <section>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients
                data={ details }
                func={ this.onClick }
                state={ allIngredients }
              />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              <Instructions data={ details } />
            </span>
          </section>
          <Link to="/receitas-feitas">
            <button
              className="details-btn-startRecipe"
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => {
                this.finishRecipe();
              } }
              disabled={ isDisable }
            >
              Finalizar Receita
            </button>
          </Link>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: (e) => dispatch(startRecipe(e)),
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
});

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});

Progresso.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Progresso);
