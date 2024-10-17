// src/Pages/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimulationControl from '../components/SimulationControl';
import Stocks from './Stocks'; // Ensure this import is correct
import AutoplayerList from '../components/AutoplayerList';
import NavigationBar from '../components/Navbar';
import { useSimulation } from '../hooks/useSimulation';

function App() {
  const { simulationRunning, simulationData, error, startSimulation, stopSimulation } = useSimulation();

  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <h1>Stock Market Simulator</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <SimulationControl
          onSimulationStart={startSimulation}
          onSimulationStop={stopSimulation}
          simulationRunning={simulationRunning}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Stocks
                simulationRunning={simulationRunning}
                stocks={simulationData.stocks}
              />
            }
          />
          <Route
            path="/stocks"
            element={
              <Stocks
                simulationRunning={simulationRunning}
                stocks={simulationData.stocks}
              />
            }
          />
          <Route
            path="/autoplayers"
            element={
              <AutoplayerList
                simulationRunning={simulationRunning}
                autoplayers={simulationData.autoplayers}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
