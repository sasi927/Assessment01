import React from 'react';

const MonthSelector = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <select value={selectedMonth} onChange={e => onMonthChange(e.target.value)}>
      {months.map(month => (
        <option key={month.value} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
