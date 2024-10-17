import React from 'react';
import NavigationBar from '../components/Navbar';
import StocksList from '../components/StocksList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Stocks({ simulationRunning, stocks }) {
  return (
    <>
    <NavigationBar />
    <StocksList stocks={stocks} />
    </>

  );
}

export default Stocks;
