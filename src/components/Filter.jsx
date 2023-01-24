import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import FilterContext from '../context/FilterContext';

function Filter() {
  const [makeFetch] = useContext(FetchContext);
  const setFilteredPlanets = useContext(FilterContext)[1];

  const handlePlanetNameChange = (value) => {
    const filteredByName = makeFetch.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(filteredByName);
  };

  return (
    <label htmlFor="planetNameFilter">
      Filtro por nome
      <input
        type="text"
        id="planetNameFilter"
        onChange={ ({ target: { value } }) => handlePlanetNameChange(value) }
        data-testid="name-filter"
      />
    </label>
  );
}

export default Filter;
