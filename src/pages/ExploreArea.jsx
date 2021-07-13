import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';

export default function ExploreArea() {
  const [isFetching, setIsFetching] = useState(true);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  console.log(selectedArea);

  useEffect(() => {
    const getArea = async () => {
      setIsFetching(true);
      const results = await getMealsAreas(type);
      setAreas(results);
      setIsFetching(false);
    };
    getArea();
  }, []);

  return isFetching ? <p>Laoding</p> : (
    <>
      <Header />
      <section>
        <form>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ ({ target }) => setSelectedArea(target.value) }
          >
            {areas && areas.map((area) => (
              <option
                data-testid={ `${area}-option` }
                key={ area }
                value={ area }
              >
                {area}
              </option>
            ))}
          </select>
        </form>
        <MainCards />
      </section>
      <Footer />
    </>
  );
}
