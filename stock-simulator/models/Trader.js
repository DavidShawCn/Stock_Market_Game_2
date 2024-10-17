// models/Trader.js
class Trader {
    constructor(stock, brokerage) {
      this.stock = stock;
      this.brokerage = brokerage;
      this.buyOrders = [];
      this.sellOrders = [];
    }
  
    addOrder(order) {
      if (order.type === 'buy') {
        this.buyOrders.push(order);
        this.buyOrders.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
      } else {
        this.sellOrders.push(order);
        this.sellOrders.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);
      }
      this.matchOrders();
    }
  
    matchOrders() {
      // Match orders among Autoplayers
      while (this.buyOrders.length > 0 && this.sellOrders.length > 0) {
        const highestBuy = this.buyOrders[0];
        const lowestSell = this.sellOrders[0];
  
        if (highestBuy.price >= lowestSell.price) {
          const tradePrice = (highestBuy.price + lowestSell.price) / 2; // Average price
          const tradeQuantity = Math.min(highestBuy.quantity, lowestSell.quantity);
  
          highestBuy.autoplayer.buyStock(this.stock, tradeQuantity, tradePrice);
          lowestSell.autoplayer.sellStock(this.stock, tradeQuantity, tradePrice);
  
          highestBuy.quantity -= tradeQuantity;
          lowestSell.quantity -= tradeQuantity;
  
          if (highestBuy.quantity === 0) {
            this.buyOrders.shift();
          }
          if (lowestSell.quantity === 0) {
            this.sellOrders.shift();
          }
        } else {
          break;
        }
      }
  
      // Process remaining buy orders (buy from Brokerage)
      while (this.buyOrders.length > 0) {
        const buyOrder = this.buyOrders.shift();
        this.buyFromBrokerage(buyOrder);
      }
  
      // Process remaining sell orders (sell to Brokerage)
      while (this.sellOrders.length > 0) {
        const sellOrder = this.sellOrders.shift();
        this.sellToBrokerage(sellOrder);
      }
    }
  
    buyFromBrokerage(buyOrder) {
      const brokeragePortfolio = this.brokerage.portfolio[this.stock.id] || 0;
      const tradePrice = buyOrder.price; // Use the buy order's price
  
      const maxAffordableQuantity = Math.floor(buyOrder.autoplayer.cash / tradePrice);
      const tradeQuantity = Math.min(buyOrder.quantity, brokeragePortfolio, maxAffordableQuantity);
  
      if (tradeQuantity > 0) {
        buyOrder.autoplayer.buyStock(this.stock, tradeQuantity, tradePrice);
        this.brokerage.sellStock(this.stock, tradeQuantity, tradePrice); // Pass tradePrice
        if (buyOrder.quantity > tradeQuantity) {
          console.log(`${buyOrder.autoplayer.name} could not buy ${buyOrder.quantity - tradeQuantity} shares of ${this.stock.name} due to insufficient funds or brokerage shares`);
        }
      } else {
        console.log(`${buyOrder.autoplayer.name} does not have enough cash to buy shares of ${this.stock.name}`);
      }
    }
  
    sellToBrokerage(sellOrder) {
      const tradePrice = sellOrder.price; // Use the sell order's price
      const tradeQuantity = sellOrder.quantity;
  
      if ((sellOrder.autoplayer.portfolio[this.stock.id]?.quantity || 0) >= tradeQuantity) {
        sellOrder.autoplayer.sellStock(this.stock, tradeQuantity, tradePrice);
        this.brokerage.buyStock(this.stock, tradeQuantity, tradePrice); // Pass tradePrice
      } else {
        console.log(`${sellOrder.autoplayer.name} does not have enough shares of ${this.stock.name} to sell`);
      }
    }
  }
  
  module.exports = Trader;
  