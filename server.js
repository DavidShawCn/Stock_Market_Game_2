// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// Stocks Data
let stocks = [
  { name: 'TNRV', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'QETC', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'AGHL', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'OMCI', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'ESDY', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'PNXL', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'NLKS', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'VNHD', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'FWE', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
  { name: 'ELVX', price: 10, quantity: 100, holders: {}, totalShares: 100, priceHistory: [{ time: Date.now(), price: 10 }] },
];

// Market Wealth History
let marketWealthHistory = [{ time: Date.now(), wealth: 10 * 100 * 10 }]; // $10 * 100 shares * 10 stocks = $10,000

// Players Data
let players = [];
let playerIdCounter = 1;

// Helper Functions
function generatePlayers(num) {
  for (let i = 0; i < num; i++) {
    let wealth = Math.floor(Math.random() * 4001) + 1000; // 1000 - 5000
    let player = {
      id: playerIdCounter++,
      wealth: wealth,
      status: 'active', // active, out, retired
      stocks: {}, // { stockName: quantity }
      wealthHistory: [{ time: Date.now(), wealth: wealth }],
      hasBoughtShare: false, // New property to track if player has bought at least one share
    };
    players.push(player);
    io.emit('newPlayer', player);
  }
}

// Generate Initial Players
generatePlayers(10);

// Generate New Players Every 30 Seconds
setInterval(() => {
  let num = Math.floor(Math.random() * 6) + 5; // 5 - 10
  generatePlayers(num);
}, 30000);

// Update Market Wealth Every 10 Seconds
setInterval(() => {
  let totalWealth = stocks.reduce((acc, stock) => acc + stock.price * stock.totalShares, 0);
  marketWealthHistory.push({ time: Date.now(), wealth: totalWealth });
  io.emit('marketWealthUpdate', marketWealthHistory);
}, 10000);

// Update Players' Wealth Every 3 Seconds
setInterval(() => {
  players.forEach((player) => {
    if (player.status === 'active' || player.status === 'retired') {
      // Calculate total wealth: cash + value of holdings
      let holdingsValue = 0;
      for (let stockName in player.stocks) {
        let qty = player.stocks[stockName];
        let stock = stocks.find((s) => s.name === stockName);
        holdingsValue += qty * stock.price;
      }
      let totalWealth = player.wealth + holdingsValue;
      player.wealthHistory.push({ time: Date.now(), wealth: totalWealth });
    }
  });
  io.emit('playersWealthUpdate', players);
}, 3000);

// Simulate Market Transactions Every 10 Seconds
setInterval(() => {
  stocks.forEach((stock) => {
    // Collect Sell Quotes
    let sellQuotes = [];
    players.forEach((player) => {
      if (player.status === 'active' && player.stocks[stock.name]) {
        let quotePrice = stock.price * (1 + (Math.random() - 0.5) * 0.1); // +/-5%
        sellQuotes.push({ playerId: player.id, price: quotePrice });
      }
    });
    // Calculate Transaction Price (Median of Sell Quotes)
    let transactionPrice = stock.price;
    if (sellQuotes.length > 0) {
      let prices = sellQuotes.map((q) => q.price).sort((a, b) => a - b);
      let medianIndex = Math.floor(prices.length / 2);
      transactionPrice = prices[medianIndex];
      stock.price = transactionPrice;
    }
    // Update Stock Price History
    stock.priceHistory.push({ time: Date.now(), price: stock.price });

    // Process Buy Orders
    players.forEach((player) => {
      if (player.status === 'active' && player.wealth > transactionPrice) {
        let buyDecision = Math.random() < 0.5; // 50% chance to buy
        if (buyDecision) {
          // Buy from Market or Other Players
          if (stock.quantity > 0) {
            // Buy from Market
            stock.quantity--;
            player.wealth -= transactionPrice;
            player.stocks[stock.name] = (player.stocks[stock.name] || 0) + 1;
            if (!player.hasBoughtShare) {
              player.hasBoughtShare = true; // Player has bought at least one share
            }
          } else {
            // Buy from Other Players
            let sellers = sellQuotes.filter((q) => q.price <= transactionPrice);
            if (sellers.length > 0) {
              let sellerQuote = sellers[Math.floor(Math.random() * sellers.length)];
              let seller = players.find((p) => p.id === sellerQuote.playerId);
              if (seller && seller.stocks[stock.name] > 0) {
                // Transfer Share
                seller.stocks[stock.name]--;
                seller.wealth += transactionPrice;
                player.wealth -= transactionPrice;
                player.stocks[stock.name] = (player.stocks[stock.name] || 0) + 1;
                if (!player.hasBoughtShare) {
                  player.hasBoughtShare = true; // Player has bought at least one share
                }
                // Update Seller Status
                if (seller.wealth <= 0) {
                  seller.status = 'out';
                  // Transfer Stocks Back to Market
                  Object.keys(seller.stocks).forEach((sName) => {
                    let qty = seller.stocks[sName];
                    let stk = stocks.find((stk) => stk.name === sName);
                    stk.quantity += qty;
                  });
                  seller.stocks = {};
                }
              }
            }
          }
          // Update Player Status
          if (player.wealth <= 0) {
            player.status = 'out';
            // Transfer Stocks Back to Market
            Object.keys(player.stocks).forEach((sName) => {
              let qty = player.stocks[sName];
              let stk = stocks.find((stk) => stk.name === sName);
              stk.quantity += qty;
            });
            player.stocks = {};
          }
        }
      }
      // Retire Player if Sold All Stocks and Has Bought at Least One Share
      if (player.status === 'active' && player.hasBoughtShare && player.wealth > 0 && Object.keys(player.stocks).length === 0) {
        player.status = 'retired';
      }
    });
    // Update Stock Holders
    let holders = {};
    players.forEach((player) => {
      if (player.stocks[stock.name]) {
        holders[player.id] = player.stocks[stock.name];
      }
    });
    stock.holders = holders;
  });
  // Emit Updates to Clients
  io.emit('stocksUpdate', stocks);
  io.emit('playersUpdate', players);
}, 10000);

io.on('connection', (socket) => {
  console.log('A user connected');
  // Send Initial Data
  socket.emit('initialData', { stocks, players, marketWealthHistory });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
