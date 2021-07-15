import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { getRandomData,
  getCategoriesList,
  getDataByCategory,
  getDataIngredients,
} from '../services/apiRequest';
import '../styles/mainPage.css';
import Loading from '../components/Loading';
import OtherLoader from '../components/OtherLoader';

const TWELVE = 12;
const FIVE = 5;
const LOADER_TIMER = 3000;
const CATEGORY_LOADER = 2000;

export default function MainPage() {
  const { path } = useRouteMatch();

  const [searchId, firstKey, domain] = path.includes('comidas')
    ? ['idMeal', 'meals', 'themealdb']
    : ['idDrink', 'drinks', 'thecocktaildb'];

  const {
    searchResult,
    limit,
    setLimit,
    ingredientsResults,
  } = useContext(RecipesContext);

  const [isLoading, setLoader] = useState(true);
  const [isLoadingCat, setLoaderCat] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [renderer, setRenderer] = useState([]);
  const [toggle, setToggle] = useState({ status: false, category: '' });

  useEffect(() => {
    if (ingredientsResults.length === 0) {
      getRandomData(domain)
        .then((res) => {
          setDataResult(res[firstKey]);
          setRenderer(res[firstKey].filter((_e, index) => index < limit));
        });
    }

    getCategoriesList(domain)
      .then((res) => {
        setCategoriesList(res[firstKey].filter((_e, index) => index < FIVE));
      });

    setTimeout(() => { setLoader(false); }, LOADER_TIMER);
  }, [limit, firstKey, domain, ingredientsResults]);

  useEffect(() => {
    setLoader(true);
    if (searchResult && searchResult.length > 1) {
      setRenderer(searchResult.filter((_e, index) => index < limit));
      setTimeout(() => { setLoader(false); }, LOADER_TIMER);
    }
  }, [searchResult, limit]);

  useEffect(() => {
    setLoader(true);
    if (ingredientsResults.length) {
      getDataIngredients(domain, ingredientsResults).then((res) => {
        setRenderer(res[firstKey].filter((_e, index) => index < limit));
      });
      setTimeout(() => { setLoader(false); }, LOADER_TIMER);
    }
  }, [ingredientsResults, domain, firstKey, limit]);

  async function handleCategoryFilter(category) {
    setLoaderCat(true);
    if (toggle.category === category) {
      setToggle({ status: false, category: '' });
      setRenderer(dataResult.filter((_e, index) => index < limit));
    } else {
      await getDataByCategory(domain, category)
        .then((res) => {
          setRenderer(res[firstKey].filter((_e, index) => index < limit));
        });
      setToggle({ status: true, category });
    }
    setTimeout(() => { setLoaderCat(false); }, CATEGORY_LOADER);
  }

  function handleAllClick() {
    setLoaderCat(true);
    setRenderer(dataResult.filter((_e, index) => index < limit));
    setTimeout(() => { setLoaderCat(false); }, CATEGORY_LOADER);
  }

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    isLoading ? (<Loading />)
      : (
        <section className="container-mainPaige">
          <Header />
          <section className="container-buttons">
            {categoriesList.map((category) => (
              <Button
                className="category-buttons"
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
                onClick={ () => handleCategoryFilter(category.strCategory) }
              >
                {category.strCategory.replace(/\W/g, ' ')}
              </Button>))}
            <Button
              className="category-buttons"
              data-testid="All-category-filter"
              onClick={ handleAllClick }
            >
              All

            </Button>
          </section>

          {isLoadingCat ? (<OtherLoader />)
            : (renderer.map((item, i) => (
              <Link
                className="link-card"
                key={ item[searchId] }
                to={ `${path}/${item[searchId]}` }
              >
                <Card mealOrDrink={ item } index={ i } testId="recipe" />
              </Link>)))}

          <button type="button" onClick={ handleMoreCards }>More Recipes</button>
          <Footer />
        </section>
      )
  );
}
