// models/Order.js
class Order {
    constructor(autoplayer, stock, price, quantity, timestamp = Date.now()) {
      this.autoplayer = autoplayer;
      this.stock = stock;
      this.price = price;
      this.quantity = quantity;
      this.timestamp = timestamp;
    }
  }
  
  module.exports = Order;
  