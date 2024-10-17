// controllers/simulationController.js
const Autoplayer = require('../models/Autoplayer');
const Strategy = require('../models/Strategy');
const Stock = require('../models/Stock');
const Brokerage = require('../models/Brokerage');
const Market = require('../models/Market');

let market;
let autoplayers = [];
let brokerage;
let simulationRunning = false;
let simulationInterval = 1000; // Default interval in milliseconds

exports.startSimulation = (req, res) => {
  if (simulationRunning) {
    return res.status(400).json({ error: 'Simulation is already running.' });
  }

  try {
    const {
      amountOfEachStockSharesRangeMin,
      amountOfEachStockSharesRangeMax,
      newAutoplayerAmountRangeMin,
      newAutoplayerAmountRangeMax,
      stockPerShareIssuePriceRangeMin,
      stockPerShareIssuePriceRangeMax,
      autoplayerInitialCashAmountRangeMin,
      autoplayerInitialCashAmountRangeMax,
      timeInterval,
    } = req.body;

    if (
      amountOfEachStockSharesRangeMin == null ||
      amountOfEachStockSharesRangeMax == null ||
      newAutoplayerAmountRangeMin == null ||
      newAutoplayerAmountRangeMax == null ||
      stockPerShareIssuePriceRangeMin == null ||
      stockPerShareIssuePriceRangeMax == null ||
      autoplayerInitialCashAmountRangeMin == null ||
      autoplayerInitialCashAmountRangeMax == null ||
      timeInterval == null
    ) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    simulationInterval = parseInt(timeInterval);

    const stockCount = 12; // For example, create 3 stocks
    const stocks = [];
    for (let i = 1; i <= stockCount; i++) {
      const issuePrice = getRandomInt(
        stockPerShareIssuePriceRangeMin,
        stockPerShareIssuePriceRangeMax // Corrected variable name
      );
      const totalShares = getRandomInt(
        amountOfEachStockSharesRangeMin,
        amountOfEachStockSharesRangeMax
      );
      const stock = new Stock(
        i,
        `Stock${String.fromCharCode(64 + i)}`,
        issuePrice,
        totalShares
      );
      stocks.push(stock);
    }

    brokerage = new Brokerage();
    stocks.forEach((stock) => {
      brokerage.portfolio[stock.id] = stock.totalShares;
    });

    market = new Market(stocks, brokerage);

    const autoplayerCount = getRandomInt(
      newAutoplayerAmountRangeMin,
      newAutoplayerAmountRangeMax
    );
    autoplayers = [];
    for (let i = 1; i <= autoplayerCount; i++) {
      const initialCash = getRandomInt(
        autoplayerInitialCashAmountRangeMin,
        autoplayerInitialCashAmountRangeMax
      );
      const strategy =
        i % 2 === 0
          ? new Strategy(aggressiveStrategyOptions)
          : new Strategy(conservativeStrategyOptions);
      const autoplayer = new Autoplayer(
        i,
        `Player${i}`,
        initialCash,
        strategy,
        simulationInterval
      );
      autoplayers.push(autoplayer);
    }

    autoplayers.forEach((player) => {
      player.startTrading(market);
    });

    simulationRunning = true;

    res.json({ message: 'Simulation started' });
  } catch (error) {
    console.error('Error starting simulation:', error);
    res.status(500).json({ error: 'Failed to start simulation.' });
  }
};

exports.stopSimulation = (req, res) => {
  if (!simulationRunning) {
    return res.status(400).json({ error: 'Simulation is not running.' });
  }

  try {
    autoplayers.forEach((player) => {
      player.stopTrading();
    });
    simulationRunning = false;
    res.json({ message: 'Simulation stopped' });
  } catch (error) {
    console.error('Error stopping simulation:', error);
    res.status(500).json({ error: 'Failed to stop simulation.' });
  }
};

exports.getSimulationData = (req, res) => {
  if (!simulationRunning) {
    return res.status(400).json({ error: 'Simulation is not running.' });
  }

  try {
    res.json({
      stocks: market.stocks.map((stock) => ({
        id: stock.id,
        name: stock.name,
        currentPrice: stock.currentPrice,
        priceHistory: stock.priceHistory.slice(-10), // Last 10 prices
      })),
      autoplayers: autoplayers.map((player) => ({
        id: player.id,
        name: player.name,
        cash: player.cash,
        portfolio: player.portfolio,
      })),
      brokerage: {
        holdings: brokerage.portfolio,
      },
    });
  } catch (error) {
    console.error('Error retrieving simulation data:', error);
    res.status(500).json({ error: 'Failed to retrieve simulation data.' });
  }
};

exports.updateParameters = (req, res) => {
  if (simulationRunning) {
    return res
      .status(400)
      .json({ error: 'Cannot update parameters while simulation is running.' });
  }

  try {
    const { strategyUpdates } = req.body;

    autoplayers.forEach((player) => {
      if (strategyUpdates[player.id]) {
        Object.assign(player.strategy, strategyUpdates[player.id]);
      }
    });

    res.json({ message: 'Parameters updated successfully.' });
  } catch (error) {
    console.error('Error updating parameters:', error);
    res.status(500).json({ error: 'Failed to update parameters.' });
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(parseFloat(min));
  max = Math.floor(parseFloat(max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const conservativeStrategyOptions = {
  buyPreference: 0.4,
  sellPreference: 0.3,
  priceFluctuation: 0.01,
  maxBuyQuantity: 50,
  maxSellQuantity: 50,
  maxHoldingTime: 300000,
  profitThreshold: 0.02,
  lossThreshold: -0.01,
};

const aggressiveStrategyOptions = {
  buyPreference: 0.7,
  sellPreference: 0.6,
  priceFluctuation: 0.05,
  maxBuyQuantity: 200,
  maxSellQuantity: 200,
  maxHoldingTime: 60000,
  profitThreshold: 0.05,
  lossThreshold: -0.03,
};
