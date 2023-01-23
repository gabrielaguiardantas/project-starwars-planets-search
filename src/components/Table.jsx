import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const [makeFetch, loading] = useContext(FetchContext);

  if (loading) {
    return <div>Carregando...</div>;
  }
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
          makeFetch.map((planet) => (
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
