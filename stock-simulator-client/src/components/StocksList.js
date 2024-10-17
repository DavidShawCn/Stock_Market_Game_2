// src/components/StocksList.js
import React from 'react';
import { Table } from 'react-bootstrap';

function StocksList({ stocks }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Current Price</th>
          <th>Price History</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.name}</td>
            <td>${stock.currentPrice.toFixed(2)}</td>
            <td>{stock.priceHistory.join(' → ')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StocksList;
