import React, { useContext } from 'react';
import Footer from '../components/Footer';
import HeaderSearch from '../components/Header';
import FetchContext from '../context/FetchContext';
import { fetchAreaOrigens /* fetchArea */ } from '../services/Api';

function OrigensFoods() {
  const { data, setData } = useContext(FetchContext);
  OrigensFoods.displayName = 'Explorar Origem';
  console.log(data);
  const renderRecipes = () => {
    fetchAreaOrigens().then((res) => setData(res));
  };
  const renderAreas = () => {
    const areasArr = data.map((res) => res.strArea);
    console.log(areasArr);
    const novaArr = areasArr.filter((el, i) => areasArr.indexOf(el) === i);
    console.log(novaArr);
    // eslint-disable-next-line max-len
    // eslint-disable-next-line react/jsx-key
    return novaArr.map((area) => (
      // eslint-disable-next-line react/jsx-key
      <option
        data-testid={ `${area}-option` }
      >
        {area}
      </option>));
    // return data.map((res) => <option>{ res.strArea} </option>)
  };

  // const rendercards = () => {
  //   fetchArea().then((res) => setData(res));
  // };

  return (
    <div>
      <HeaderSearch title={ OrigensFoods.displayName } />
      { data.length === 0 && renderRecipes()}
      <select data-testid="explore-by-area-dropdown">
        {renderAreas()}
      </select>
      {/* <Card> */}
      <Footer />
    </div>
  );
}

export default OrigensFoods;
