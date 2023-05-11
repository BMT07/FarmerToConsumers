import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products/getAll').then((response) => setData(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const groupByCategory = data.reduce((acc, obj) => {
    const key = obj.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  const categoryAvgPrice = Object.keys(groupByCategory).map((category) => ({
    category,
    avgPrice: groupByCategory[category].reduce((acc, obj) => acc + obj.price, 0) / groupByCategory[category].length,
  }));

  return (
    <>
      <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bold' }}>Average Price per category</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={400} height={400} data={categoryAvgPrice}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis>
            <Label value="Avg. Price" angle="-90" position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="avgPrice" fill="#7AA874" position="insideTop">
            {/* <LabelList dataKey="avgPrice" position="insideLeft" /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
