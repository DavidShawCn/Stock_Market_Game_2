// src/components/SimulationControl.js
import React, { useState } from 'react';

function SimulationControl({ onSimulationStart, onSimulationStop, simulationRunning }) {
  const [parameters, setParameters] = useState({
    amountOfEachStockSharesRangeMin: 100,
    amountOfEachStockSharesRangeMax: 200,
    newAutoplayerAmountRangeMin: 10,
    newAutoplayerAmountRangeMax: 20,
    stockPerShareIssuePriceRangeMin: 50,
    stockPerShareIssuePriceRangeMax: 200,
    autoplayerInitialCashAmountRangeMin: 5000,
    autoplayerInitialCashAmountRangeMax: 20000,
    timeInterval: 30000,
  });


  const handleChange = (e) => {
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value,
    });
  };

  const handleStart = () => {
    onSimulationStart(parameters);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Simulation Control</div>
      <div className="card-body">
        <form>
          {/* Input fields for parameters */}
          <div className="form-group">
            <label>Amount of Each Stock Shares Range (Min - Max)</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control"
                name="amountOfEachStockSharesRangeMin"
                value={parameters.amountOfEachStockSharesRangeMin}
                onChange={handleChange}
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                className="form-control"
                name="amountOfEachStockSharesRangeMax"
                value={parameters.amountOfEachStockSharesRangeMax}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Repeat similar input groups for other parameters */}
          <div className="form-group">
            <label>Time Interval (ms)</label>
            <input
              type="number"
              className="form-control"
              name="timeInterval"
              value={parameters.timeInterval}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleStart}
            disabled={simulationRunning}
          >
            Start Simulation
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onSimulationStop}
            disabled={!simulationRunning}
          >
            Stop Simulation
          </button>
        </form>
      </div>
    </div>
  );
}

export default SimulationControl;
