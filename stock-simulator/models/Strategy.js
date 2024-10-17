// models/Strategy.js
class Strategy {
    constructor(options = {}) {
      this.buyPreference = options.buyPreference || 0.5;
      this.sellPreference = options.sellPreference || 0.5;
      this.priceFluctuation = options.priceFluctuation || 0.02;
      this.maxBuyQuantity = options.maxBuyQuantity || 100;
      this.maxSellQuantity = options.maxSellQuantity || 100;
      this.maxHoldingTime = options.maxHoldingTime || Infinity;
      this.profitThreshold = options.profitThreshold || Infinity;
      this.lossThreshold = options.lossThreshold || -Infinity;
    }
  
    decideAction(autoplayer, stock) {
      const hasHoldings = (autoplayer.portfolio[stock.id]?.quantity || 0) > 0;
      const now = Date.now();
  
      if (hasHoldings) {
        const positions = autoplayer.portfolio[stock.id].positions;
        for (let position of positions) {
          const holdingTime = now - position.timestamp;
          const priceChange = (stock.currentPrice - position.buyPrice) / position.buyPrice;
          if (
            holdingTime >= this.maxHoldingTime ||
            priceChange >= this.profitThreshold ||
            priceChange <= this.lossThreshold
          ) {
            return 'sell';
          }
        }
        return Math.random() < this.sellPreference ? 'sell' : 'hold';
      } else {
        return Math.random() < this.buyPreference ? 'buy' : 'wait';
      }
    }
  
    calculateOrderPrice(stock, action) {
      const lastPrice = stock.currentPrice;
      const fluctuation = (Math.random() - 0.5) * 2 * this.priceFluctuation;
      let price = lastPrice * (1 + fluctuation);
      price = Math.max(price, 0.01);
      return parseFloat(price.toFixed(2));
    }
  
    calculateOrderQuantity(autoplayer, stock, action, price) {
      if (action === 'buy') {
        const maxAffordableQuantity = Math.floor(autoplayer.cash / price);
        const quantity = Math.min(maxAffordableQuantity, this.maxBuyQuantity);
        return quantity;
      } else if (action === 'sell') {
        const holdingQuantity = autoplayer.portfolio[stock.id]?.quantity || 0;
        const quantity = Math.min(holdingQuantity, this.maxSellQuantity);
        return quantity;
      }
      return 0;
    }
  }
  
  module.exports = Strategy;
  