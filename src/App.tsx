import React from 'react';
import logo from './logo.svg';
import './App.css';
import CargoContainer from './CargoContainer';

const getStyle = () => ({
  display: 'flex',
});

function App() {
  return (
    <div style={getStyle()}>
      <CargoContainer />
    </div>
  );
}

export default App;
