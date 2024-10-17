// models/Stock.js
class Stock {
    constructor(id, name, issuePrice, totalShares) {
      this.id = id;
      this.name = name;
      this.issuePrice = issuePrice;
      this.totalShares = totalShares;
      this.currentPrice = issuePrice;
      this.priceHistory = [issuePrice];
    }
  
    updatePrice(price) {
      this.currentPrice = price;
      this.priceHistory.push(price);
      if (this.priceHistory.length > 100) {
        this.priceHistory.shift(); // Keep the last 100 prices
      }
    }
  }
  
  module.exports = Stock;
  