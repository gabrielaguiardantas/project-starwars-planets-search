import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const [makeFetch] = useContext(FetchContext);
  const [filteredPlanets] = useContext(FilterContext);

  return (
    <table>
      <thead>
        <tr>
          {
            Object.keys(makeFetch[0])
              .map((key, index) => <th key={ index }>{key}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {
                Object.values(planet)
                  .map((planetProperty, planetPropertyIndex) => (
                    <td
                      key={ planetPropertyIndex }
                      className="planetLine"
                    >
                      {planetProperty}
                    </td>
                  ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
