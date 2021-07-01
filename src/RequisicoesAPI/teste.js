import { useEffect, useState } from 'react';

function Teste() {
  const urlTeste = 'www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

  const [teste, setTeste] = useState([]);

  useEffect(() => {
    fetch(urlTeste)
      .then((r) => r.json())
      .then((p) => setTeste(p))
      .catch((error) => error);
  }, []);

  console.log('TESTE:', teste);

  return teste;
}

export default Teste;
