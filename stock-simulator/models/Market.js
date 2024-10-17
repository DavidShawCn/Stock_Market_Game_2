// models/Market.js
const Trader = require('./Trader');

class Market {
  constructor(stocks, brokerage) {
    this.stocks = stocks;
    this.brokerage = brokerage;
    this.traders = {}; // { stockId: Trader }
    stocks.forEach((stock) => {
      this.traders[stock.id] = new Trader(stock, brokerage);
    });
  }

  getTrader(stockId) {
    return this.traders[stockId];
  }

  getRandomStock() {
    const index = Math.floor(Math.random() * this.stocks.length);
    return this.stocks[index];
  }
}

module.exports = Market;
