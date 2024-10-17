// models/SellOrder.js
const Order = require('./Order');

class SellOrder extends Order {
  constructor(autoplayer, stock, price, quantity, timestamp) {
    super(autoplayer, stock, price, quantity, timestamp);
    this.type = 'sell';
  }
}

module.exports = SellOrder;
