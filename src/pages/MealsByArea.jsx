import React, { useEffect, useState } from 'react';
import { AreasDropDown, Header } from '../components';
import fetchAreas from '../services/api/fetchAreas';

const MealsByArea = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const newAreas = await fetchAreas();
      setAreas(['All', ...newAreas]);
    };
    load();
  }, []);

  return (
    <div>
      <Header name="Explorar Origem" />
      <AreasDropDown areas={ areas } />
    </div>
  );
};

export default MealsByArea;
