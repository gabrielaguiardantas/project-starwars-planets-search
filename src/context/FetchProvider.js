import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';

function FetchProvider({ children }) {
  const [makeFetch, setMakeFetch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then(({ results }) => results.map((planet) => {
        delete planet.residents;
        return planet;
      }))
      .then((planets) => setMakeFetch(planets))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <FetchContext.Provider value={ [makeFetch, loading] }>
      <div>
        { children }
      </div>
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchProvider;
