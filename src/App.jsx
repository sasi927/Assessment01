import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import DataTable from './components/DataTable';
import MonthSelector from './components/MonthSelector';
import StatsCard from './components/StatsCard';
import PriceRangeChart from './components/PriceRangeChart';


const App = () => {
  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/db.json'); 
        const fetchedData = response.data;
        setData(fetchedData);

        const uniqueMonths = [...new Set(fetchedData.map(item => format(parseISO(item.dateOfSale), 'yyyy-MM')))];
        const formattedMonths = uniqueMonths.map(month => ({
          value: month,
          label: format(parseISO(month + '-01'), 'MMMM yyyy')
        }));
        setMonths(formattedMonths);

        if (uniqueMonths.length > 0) {
          setSelectedMonth(uniqueMonths[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item => item.dateOfSale.startsWith(selectedMonth));
  const totalSale = filteredData.reduce((acc, item) => acc + (item.sold ? item.price : 0), 0);
  const soldItems = filteredData.filter(item => item.sold).length;
  const notSoldItems = filteredData.filter(item => !item.sold).length;

  const priceRangeData = [
    filteredData.filter(item => item.price <= 100).length,
    filteredData.filter(item => item.price > 100 && item.price <= 200).length,
    filteredData.filter(item => item.price > 200 && item.price <= 300).length,
    filteredData.filter(item => item.price > 300 && item.price <= 400).length,
    filteredData.filter(item => item.price > 400 && item.price <= 500).length,
    filteredData.filter(item => item.price > 500 && item.price <= 600).length,
    filteredData.filter(item => item.price > 600 && item.price <= 700).length,
    filteredData.filter(item => item.price > 700 && item.price <= 800).length,
    filteredData.filter(item => item.price > 800 && item.price <= 900).length,
    filteredData.filter(item => item.price > 900).length
  ];
  return (
    <div>
      <h1>Transaction table</h1>
      <MonthSelector months={months} selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
      <DataTable data={filteredData} />
      <StatsCard totalSale={totalSale} soldItems={soldItems} notSoldItems={notSoldItems}/>
      <PriceRangeChart priceRangeData={priceRangeData} />
    </div>
  );
};

export default App;
