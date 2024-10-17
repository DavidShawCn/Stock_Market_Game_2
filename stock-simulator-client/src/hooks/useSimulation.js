import { useState, useEffect } from 'react';

export function useSimulation() {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationData, setSimulationData] = useState({ stocks: [], autoplayers: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(fetchSimulationData, 2000);
    } else {
      setSimulationData({ stocks: [], autoplayers: [] });
    }
    return () => clearInterval(interval);
  }, [simulationRunning]);

  const fetchSimulationData = () => {
    fetch('http://localhost:3001/api/data')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSimulationRunning(false);
        } else {
          setSimulationData(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Failed to fetch simulation data.');
        setSimulationRunning(false);
      });
  };

  const startSimulation = (parameters) => {
    fetch('http://localhost:3001/api/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSimulationRunning(true);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Failed to start simulation.');
      });
  };

  const stopSimulation = () => {
    fetch('http://localhost:3001/api/stop')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSimulationRunning(false);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Failed to stop simulation.');
      });
  };

  return {
    simulationRunning,
    simulationData,
    error,
    startSimulation,
    stopSimulation,
  };
}
