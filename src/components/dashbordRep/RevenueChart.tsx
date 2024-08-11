import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getOrderStatistics } from '../../api/orderRep'; // Ajustez le chemin si nécessaire

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart: React.FC = () => {
  const [revenueData, setRevenueData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await getOrderStatistics();
        setRevenueData(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to load revenue data');
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const data = {
    labels: revenueData ? ['Total Orders', 'Total Delivered', 'Total Canceled'] : [],
    datasets: [
      {
        label: 'Revenue',
        data: revenueData ? [revenueData.totalOrders, revenueData.totalDelivered, revenueData.totalCanceled] : [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `$${value}`;
          },
        },
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="revenue-chart-container">
      <div className="revenue-chart">
        <div className='lezem'>
          <div className="klm">
            <h2>Revenue</h2>
            <p>Overview of total revenue and order statistics</p>
          </div>
          <div className="chart-controls">
            <button className="active1">Monthly <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="svg1" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg></button>
          </div>
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
