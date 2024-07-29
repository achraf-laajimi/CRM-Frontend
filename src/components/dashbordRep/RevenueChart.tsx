import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [2, 75, 50, 100, 25, 75, 50, 0, 75, 100, 50, 75],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
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
            return context.raw + 'k';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value + 'k';
          },
        },
      },
    },
  };

  return (
    <div className="revenue-chart-container">
      <div className="revenue-chart">
        <div className='lezem'>
          <div className="klm">
            <h2>Revenue</h2>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
          </div>
          <div className="chart-controls">
            <button className="active1">Monthly <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="svg1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg></button>
          </div>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
