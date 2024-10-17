// models/Brokerage.js
class Brokerage {
    constructor() {
      this.name = 'Brokerage';
      this.portfolio = {}; // { stockId: quantity }
    }
  
    buyStock(stock, quantity, price) {
      this.portfolio[stock.id] = (this.portfolio[stock.id] || 0) + quantity;
      stock.updatePrice(price);
      console.log(`${this.name} bought ${quantity} shares of ${stock.name} at $${price}`);
    }
  
    sellStock(stock, quantity, price) {
      if ((this.portfolio[stock.id] || 0) >= quantity) {
        this.portfolio[stock.id] -= quantity;
        stock.updatePrice(price);
        console.log(`${this.name} sold ${quantity} shares of ${stock.name} at $${price}`);
      } else {
        console.log(`${this.name} does not have enough shares of ${stock.name} to sell`);
      }
    }
  }
  
  module.exports = Brokerage;
  