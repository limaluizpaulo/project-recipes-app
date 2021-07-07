import { useState, useCallback } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      response = await fetch(url, options);
      json = await response.json();
      return { response, json };
    } catch (erro) {
      json = null;
      setError('Erro');
    } finally {
      setData(json);
    }
  }, []);

  return { data, error, request };
};

export default useFetch;
