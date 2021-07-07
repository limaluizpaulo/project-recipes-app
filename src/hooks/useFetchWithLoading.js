import { useState, useCallback } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      return { response, json };
    } catch (erro) {
      json = null;
      setError('Erro');
    } finally {
      setData(json);
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useFetch;
