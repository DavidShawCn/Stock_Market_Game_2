// src/components/AutoplayerList.js
import React from 'react';
import { Table } from 'react-bootstrap';

function AutoplayerList({ autoplayers }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cash</th>
          <th>Holdings</th>
        </tr>
      </thead>
      <tbody>
        {autoplayers.map((player) => (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>${player.cash.toFixed(2)}</td>
            <td>
              {Object.entries(player.portfolio).map(([stockId, holding]) => (
                <div key={stockId}>
                  Stock {stockId}: {holding.quantity} shares
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AutoplayerList;
