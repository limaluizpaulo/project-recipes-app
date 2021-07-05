import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getRandom } from '../redux/actions';
import BeverageAPI from '../services/BeverageRecipesAPI'
import '../styles/Explore.css';

function ExploreDrinks(props) {
  const { surpriseDrink } = props;
  return (
    <div>
      <Header />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
        className="btn-explore"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/bebidas/detalhes"
        data-testid="explore-surprise"
        className="btn-explore"
        onClick={ surpriseDrink }
      >
        Me Surpreenda!
      </Link>
      Explore Bebidas
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>({
surpriseDrink: () => dispatch(getRandom(BeverageAPI.surpriseDrink))
})

export default connect(null, mapDispatchToProps)(ExploreDrinks);
