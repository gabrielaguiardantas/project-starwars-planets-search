import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import FetchContext from './FetchContext';

function FilterProvider({ children }) {
  const [makeFetch] = useContext(FetchContext);
  const [filteredPlanets, setFilteredPlanets] = useState(makeFetch);
  return (
    <FilterContext.Provider value={ [filteredPlanets, setFilteredPlanets] }>
      <div>
        { children }
      </div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default FilterProvider;
