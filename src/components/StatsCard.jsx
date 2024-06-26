import React from 'react';

const StatsCard = ({ totalSale, soldItems, notSoldItems }) => {
  return (
    <div className="stats-card">
      <h2>Statistics</h2>
      <p><strong>Total Sale Amount:</strong> ${totalSale.toFixed(2)}</p>
      <p><strong>Total Sold Items:</strong> {soldItems}</p>
      <p><strong>Total Not Sold Items:</strong> {notSoldItems}</p>
    </div>
  );
};

export default StatsCard;
