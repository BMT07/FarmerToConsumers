// import React, { useState } from 'react';
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

// const PieChartC = ({ data }) => {
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#11111'];

//   const RADIAN = Math.PI / 180;
//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <>
//       <div>
//         <div className="row d-flex justify-content-center text-center">
//           <h1>Product Categories</h1>
//           <hr />
//           <div className="col-md-8">
//             <ResponsiveContainer width={400} height={400} className="text-center">
//               <PieChart width={400} height={400}>
//                 <Legend layout="vertical" verticalAlign="top" align="top" />
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={renderCustomizedLabel}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="price"
//                 >
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default PieChartC;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F'];

const PieChartC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products/getAll').then((response) => setData(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const organicProducts = data.filter((product) => product.organic);
  const nonOrganicProducts = data.filter((product) => !product.organic);

  const organicPercentage = (organicProducts.length / data.length) * 100;
  const nonOrganicPercentage = (nonOrganicProducts.length / data.length) * 100;
  const colors = ['#0088FE', '#00C49F'];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <PieChart
          width={400}
          height={400}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{ padding: 0 }}
          fixed-top
        >
          <text x="200" y="30" fontSize="20" fontWeight="bold" textAnchor="middle">
            Percentage of organic products
          </text>
          <Pie
            dataKey="value"
            nameKey="name"
            data={[
              { name: 'Organic', value: organicPercentage },
              { name: 'Non-organic', value: nonOrganicPercentage },
            ]}
            cx={200}
            cy={200}
            outerRadius={80}
            label
            fill={colors}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </>
  );
};

export default PieChartC;
