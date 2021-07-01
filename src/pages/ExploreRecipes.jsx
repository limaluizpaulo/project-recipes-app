import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
// import MealsByArea from '../components/MealsByArea';

export default function ExploreRecipes() {
  // const history = useHistory();
  // const path = history.location.pathname;

  // function handleRedirect({ target }) {
  //   const page = target.name;
  //   const { push } = history;
  //   return push(`${path}/${page}`);
  // }

  // function buttons() {
  //   if (path === '/explorar/comidas') {
  //     return (
  //       <>
  //         <Button
  //           name="ingredientes"
  //           type="button"
  //           data-testid="explore-by-ingredient"
  //         >
  //           Por Ingrediente
  //         </Button>
  //         <Link to={ `${path}/area` }>
  //           <Button
  //             name="area"
  //             type="button"
  //             data-testid="explore-by-area"
  //           >
  //             Por Local de Origem
  //           </Button>
  //         </Link>
  //         <Button
  //           name="surpresa"
  //           type="button"
  //           data-testid="explore-surprise"
  //         >
  //           Me Surpreenda!
  //         </Button>
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       <Button
  //         name="MealsByIngradient"
  //         type="button"
  //         data-testid="explore-by-ingredient"
  //       >
  //         Por Ingrediente
  //       </Button>
  //       <Button
  //         name="MealsByIngradient"
  //         type="button"
  //         data-testid="explore-surprise"
  //       >
  //         Me Surpreenda!
  //       </Button>
  //     </>

  //   );
  // }
  return (
    <main>
      <Button
        name="ingredientes"
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingrediente
      </Button>
      <Link to="/explorar/comidas/area">
        <Button
          name="area"
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Button>
      </Link>
      <Button
        name="surpresa"
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
      {/* { buttons() } */}
      <Footer />
    </main>
  );
}
