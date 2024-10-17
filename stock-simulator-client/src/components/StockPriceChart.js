import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StockPriceChart({ stock }) {
  // Prepare data for the chart
  const data = stock.priceHistory.map((price, index) => ({
    name: `T-${stock.priceHistory.length - index}`,
    price,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h5>{stock.name} Price History</h5>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockPriceChart;
