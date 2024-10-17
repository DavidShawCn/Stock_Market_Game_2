// models/Autoplayer.js
const BuyOrder = require('./BuyOrder');
const SellOrder = require('./SellOrder');

class Autoplayer {
  constructor(id, name, cash = 0, strategy, simulationInterval) {
    this.id = id;
    this.name = name;
    this.cash = cash;
    this.portfolio = {}; // { stockId: { quantity, positions: [...] } }
    this.strategy = strategy;
    this.active = false;
    this.simulationInterval = simulationInterval || 1000;
    this.market = null; // Reference to market, to restart trading
  }

  buyStock(stock, quantity, price) {
    const cost = quantity * price;
    if (this.cash >= cost) {
      this.cash -= cost;
      if (!this.portfolio[stock.id]) {
        this.portfolio[stock.id] = { quantity: 0, positions: [] };
      }
      this.portfolio[stock.id].quantity += quantity;
      this.portfolio[stock.id].positions.push({
        quantity,
        buyPrice: price,
        timestamp: Date.now(),
      });
      stock.updatePrice(price);
      console.log(`${this.name} bought ${quantity} shares of ${stock.name} at $${price}`);
    } else {
    //   console.log(`${this.name} does not have enough cash to buy ${quantity} shares of ${stock.name}`);
      // Deactivate the autoplayer due to insufficient cash
      this.active = false;
    //   console.log(`${this.name} is deactivated due to insufficient cash.`);
    }
  }

  sellStock(stock, quantity, price) {
    if ((this.portfolio[stock.id]?.quantity || 0) >= quantity) {
      this.cash += quantity * price;
      this.portfolio[stock.id].quantity -= quantity;
      stock.updatePrice(price);
      console.log(`${this.name} sold ${quantity} shares of ${stock.name} at $${price}`);
      // Update positions
      let remainingToSell = quantity;
      const positions = this.portfolio[stock.id].positions;
      for (let i = 0; i < positions.length && remainingToSell > 0; i++) {
        const position = positions[i];
        if (position.quantity <= remainingToSell) {
          remainingToSell -= position.quantity;
          positions.splice(i, 1);
          i--;
        } else {
          position.quantity -= remainingToSell;
          remainingToSell = 0;
        }
      }
      // Reactivate the autoplayer if it was inactive and now has cash
      if (!this.active && this.cash > 0) {
        this.active = true;
        console.log(`${this.name} is reactivated with cash available.`);
        this.startTrading(this.market);
      }
    } else {
      console.log(`${this.name} does not have enough shares to sell`);
    }
  }

  startTrading(market) {
    if (this.active) return;
    this.active = true;
    this.market = market; // Store market reference
    this.tradeLoop(market);
  }

  stopTrading() {
    this.active = false;
  }

  tradeLoop(market) {
    if (!this.active) return;
    const randomInterval = Math.floor(Math.random() * this.simulationInterval) + 500;
    setTimeout(() => {
      if (this.active) {
        this.decideAndPlaceOrder(market);
        this.tradeLoop(market);
      }
    }, randomInterval);
  }

  decideAndPlaceOrder(market) {
    if (!this.active) return;
    const stock = market.getRandomStock();
    const action = this.strategy.decideAction(this, stock);

    if (action === 'buy') {
      const price = this.strategy.calculateOrderPrice(stock, 'buy');
      const quantity = this.strategy.calculateOrderQuantity(this, stock, 'buy', price);
      if (quantity > 0) {
        market.getTrader(stock.id).addOrder(new BuyOrder(this, stock, price, quantity));
      } else {
        // console.log(`${this.name} does not have enough cash to buy any shares of ${stock.name}`);
        // Deactivate the autoplayer due to insufficient cash
        this.active = false;
        // console.log(`${this.name} is deactivated due to insufficient cash.`);
      }
    } else if (action === 'sell') {
      const price = this.strategy.calculateOrderPrice(stock, 'sell');
      const quantity = this.strategy.calculateOrderQuantity(this, stock, 'sell', price);
      if (quantity > 0) {
        market.getTrader(stock.id).addOrder(new SellOrder(this, stock, price, quantity));
      } else {
        console.log(`${this.name} has no shares to sell of ${stock.name}`);
      }
    }
  }
}

module.exports = Autoplayer;
