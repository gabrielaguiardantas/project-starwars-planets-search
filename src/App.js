import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import FetchProvider from './context/FetchProvider';
import FilterProvider from './context/FilterProvider';

function App() {
  return (
    <FetchProvider>
      <FilterProvider>
        <Filter />
        <Table />
      </FilterProvider>
    </FetchProvider>
  );
}

export default App;
