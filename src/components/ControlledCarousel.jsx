import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ItemCard from './ItemCard';
import Context from '../context/Context';

function ControlledCarousel() {
  // const [setShowCocktails] = useState(false);
  const { cocktailsRecipes, resquestCocktailsApi } = useContext(Context);
  // const history = useHistory();
  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     setShowCocktails(true);
  //   }
  // }, [cocktailsRecipes]);

  useEffect(() => {
    resquestCocktailsApi();
    // eslint-disable-next-line
  }, []);

  return (
    <Carousel touch>
      { cocktailsRecipes.map((item, index) => (
        <Carousel.Item key={ item }>
          <ItemCard className="d-block w-100" item={ item } i={ index } />
          <Carousel.Caption>
            <h3>Outras Bebidas</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
