function useFetch() {
  return fetch('https://swapi.dev/api/planets')
    .then((response) => response.json())
    .then(({ results }) => results.map((planet) => {
      delete planet.residents;
      return (planet);
    }))
    .catch((error) => console.log(error));
}

export default useFetch;
