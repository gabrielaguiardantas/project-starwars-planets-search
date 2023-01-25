import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';
import FilterContext from '../context/FilterContext';

function Filter() {
  const [makeFetch] = useContext(FetchContext);
  const [filteredPlanets, setFilteredPlanets] = useContext(FilterContext);
  const [filter, setFilter] = useState([]);

  const handlePlanetNameChange = (value) => {
    const filteredByName = makeFetch.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(filteredByName);
  };

  const filteredPlanetsByOptions = () => {
    const columnFilter = document.getElementById('Column').value;
    const comparisonFilter = document.getElementById('Operator').value;
    const valueFilter = document.getElementById('valueFilter').value;
    setFilter([...filter, { columnFilter, comparisonFilter, valueFilter }]);
    const filteredByOptions = filteredPlanets.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(valueFilter);
      }
      if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(valueFilter);
      }
      return Number(planet[columnFilter]) === Number(valueFilter);
    });
    setFilteredPlanets(filteredByOptions);
  };

  return (
    <header>
      <label htmlFor="planetNameFilter">
        Filtro por nome
        <input
          type="text"
          id="planetNameFilter"
          onChange={ ({ target: { value } }) => handlePlanetNameChange(value) }
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="Column">
        Coluna
        <select
          name="Column"
          id="Column"
          data-testid="column-filter"
        >
          <option
            value="population"
            defaultValue
            hidden={ filter
              .some((element) => element.columnFilter === 'population') }
          >
            population
          </option>
          <option
            value="orbital_period"
            hidden={ filter
              .some((element) => element.columnFilter === 'orbital_period') }
          >
            orbital_period
          </option>
          <option
            value="diameter"
            hidden={ filter
              .some((element) => element.columnFilter === 'diameter') }
          >
            diameter
          </option>
          <option
            value="rotation_period"
            hidden={ filter
              .some((element) => element.columnFilter === 'rotation_period') }
          >
            rotation_period
          </option>
          <option
            value="surface_water"
            hidden={ filter
              .some((element) => element.columnFilter === 'surface_water') }
          >
            surface_water
          </option>
        </select>
      </label>
      <label htmlFor="Operator">
        Operador
        <select
          name="Operator"
          id="Operator"
          data-testid="comparison-filter"
        >
          <option value="maior que" defaultValue>maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        <input
          type="number"
          name="valueFilter"
          id="valueFilter"
          defaultValue="0"
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filteredPlanetsByOptions }
      >
        Filtrar
      </button>
      {
        filter !== [] && filter.map((eachFilter, index) => (
          <div key={ index }>
            {eachFilter.columnFilter}
            {' '}
            {eachFilter.comparisonFilter}
            {' '}
            {eachFilter.valueFilter}
            {' '}
            <button type="button">Excluir</button>
          </div>
        ))
      }
    </header>
  );
}

export default Filter;
