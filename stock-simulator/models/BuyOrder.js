// models/BuyOrder.js
const Order = require('./Order');

class BuyOrder extends Order {
  constructor(autoplayer, stock, price, quantity, timestamp) {
    super(autoplayer, stock, price, quantity, timestamp);
    this.type = 'buy';
  }
}

module.exports = BuyOrder;
