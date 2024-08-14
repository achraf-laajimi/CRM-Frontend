import { useEffect, useRef } from 'react';
import { Chart, Chart as ChartJS } from 'chart.js'; // Explicit import for Chart.js types

const MyChartComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['A', 'B', 'C'],
            datasets: [{
              label: 'My Dataset',
              data: [10, 20, 30],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default MyChartComponent;
