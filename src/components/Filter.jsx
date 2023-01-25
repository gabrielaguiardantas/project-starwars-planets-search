import React, { useContext, useState, useEffect } from 'react';
import FetchContext from '../context/FetchContext';
import FilterContext from '../context/FilterContext';

function Filter() {
  const [makeFetch] = useContext(FetchContext);
  const setFilteredPlanets = useContext(FilterContext)[1];
  const [filter, setFilter] = useState([]);
  const columnOpt = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [columnOptions, setColumnOptions] = useState(columnOpt);

  const handlePlanetNameChange = (value) => {
    const filteredByName = makeFetch.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(filteredByName);
  };

  const filtersArrayUpdate = () => {
    const columnFilter = document.getElementById('Column').value;
    const comparisonFilter = document.getElementById('Operator').value;
    const valueFilter = document.getElementById('valueFilter').value;
    setFilter([...filter, { columnFilter, comparisonFilter, valueFilter }]);
    setColumnOptions(columnOptions.filter((column) => column !== columnFilter));
  };

  const filteredPlanetsByOptions = () => {
    let resultFilteredPlanets = makeFetch;
    if (filter.length < 1) {
      setFilteredPlanets(makeFetch);
    } else {
      filter.forEach((eachFilter) => {
        const updatedTable = resultFilteredPlanets.filter((planet) => {
          if (eachFilter.comparisonFilter === 'maior que') {
            return Number(planet[eachFilter.columnFilter])
            > Number(eachFilter.valueFilter);
          }
          if (eachFilter.comparisonFilter === 'menor que') {
            return Number(planet[eachFilter.columnFilter])
            < Number(eachFilter.valueFilter);
          }
          return Number(planet[eachFilter.columnFilter])
          === Number(eachFilter.valueFilter);
        });
        resultFilteredPlanets = updatedTable;
      });
      setFilteredPlanets(resultFilteredPlanets);
    }
  };

  useEffect(() => {
    filteredPlanetsByOptions();
  }, [filter]);

  const removeFilter = (eachFilter) => {
    const removeFilterArray = filter
      .filter((numericFilter) => numericFilter !== eachFilter);
    setFilter(removeFilterArray);
    setColumnOptions([...columnOptions, eachFilter.columnFilter]);
  };

  const removeAllFilters = () => {
    setFilter([]);
    setColumnOptions(columnOpt);
    setFilteredPlanets(makeFetch);
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
          {
            columnOptions.map((column, index) => (
              <option
                key={ index }
                defaultValue={ column }
              >
                {column}
              </option>
            ))
          }
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
        onClick={ filtersArrayUpdate }
      >
        Filtrar
      </button>
      {
        filter !== [] && filter.map((eachFilter, index) => (
          <div key={ index } data-testid="filter">
            {eachFilter.columnFilter}
            {' '}
            {eachFilter.comparisonFilter}
            {' '}
            {eachFilter.valueFilter}
            {' '}
            <button
              type="button"
              onClick={ () => removeFilter(eachFilter) }
            >
              Excluir
            </button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>
    </header>
  );
}

export default Filter;
