import React from 'react';
import './App.css';
import Table from './components/Table';
import FetchProvider from './context/FetchProvider';

function App() {
  return (
    <FetchProvider>
      <Table />
    </FetchProvider>
  );
}

export default App;
