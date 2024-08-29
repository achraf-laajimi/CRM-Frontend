import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getNumberAccountsByMonth, getNumberOrdersByMonth, getMonthlyIncome } from '../api/DashboardMethods';

export default function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsResponse = await getNumberAccountsByMonth();
        const ordersResponse = await getNumberOrdersByMonth();
        const incomeResponse = await getMonthlyIncome();

        // Map the response data
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const data = months.map(month => ({
          name: new Date(0, month - 1).toLocaleString('default', { month: 'short' }),
          Orders: ordersResponse.ordersByMonth.find(item => item._id === month)?.count || 0,
          New_accounts: accountsResponse.accountsByMonth.find(item => item._id === month)?.count || 0,
          Income: incomeResponse.incomeByMonth.find(item => item._id === month)?.totalIncome || 0,
        }));

        setData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Stats</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Orders" fill="#34d399" />
            <Bar dataKey="New_accounts" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
