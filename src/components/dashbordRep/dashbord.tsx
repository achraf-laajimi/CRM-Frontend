import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './dashbord.css';
import Navbar from '../navbar/navbar';
import RevenueChart from './RevenueChart';
import totalOrdersImg from './purchase-order.png';
import totalDeliveredImg from './delivery.png';
import totalCanceledImg from './cancel.png';
import totalRevenueImg from './money-bag.png';
import img from '../analyticsRep/Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg';
import { getOrderStatistics } from '../../api/orderRep';
import PopularProducts from '../PopularProducts';

const Dashboard: React.FC = () => {
  const [showValue, setShowValue] = useState(true);
  const [stats, setStats] = useState<{
    totalOrders?: number;
    totalDelivered?: number;
    totalCanceled?: number;
    totalRevenue?: number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Créez une instance de navigate

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getOrderStatistics();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const handleShowValueChange = () => {
    setShowValue(true);
  };

  const handleChartChange = () => {
    setShowValue(false);
  };

  const handleMoreDetailsClick = () => {
    navigate('/order'); // Utilisez navigate pour rediriger vers la page /order
  };
  const handleDetailsClick = () => {
    navigate('/analytics'); // Utilisez navigate pour rediriger vers la page /order
  };
  /*   if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>; */

  return (
    <div className='dash'>
      <Navbar />
      <div className="dashboard">
        <div className="unde1"></div>
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Discover What ever you need easily</p>
        </header>
        <div className="dashboard-cards">
          <div className="card">
            <div className='img'>
              <img src={totalOrdersImg} alt="Total Orders" />
            </div>
            <div className="card-content">
              <p>{stats.totalOrders ?? 0}</p>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalDeliveredImg} alt="Total Delivered" />
            </div>
            <div className="card-content">
              <p>{stats.totalDelivered ?? 0}</p>
              <p>Total Delivered</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalCanceledImg} alt="Total Canceled" />
            </div>
            <div className="card-content">
              <p>{stats.totalCanceled ?? 0}</p>
              <p>Total Canceled</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalRevenueImg} alt="Total Revenue" />
            </div>
            <div className="card-content">
              <p>${stats.totalRevenue ?? 0}</p>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="dashboard-main">
          <RevenueChart />
          <div className="piee">
            <div className="chart-controls">
              <h2>Pie Chart</h2>
              <div className='feddet'>
                <div>
                  <input
                    type="radio"
                    id="chart"
                    name="displayMode"
                    checked={!showValue}
                    onChange={handleChartChange}
                  />
                  <label htmlFor="chart">Chart</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="showValue"
                    name="displayMode"
                    checked={showValue}
                    onChange={handleShowValueChange}
                  />
                  <label htmlFor="showValue">Show Value</label>
                </div>
              </div>
            </div>
            <div className="pie-charts">
              <div className="pie-chart">
                <div className="pie total-order" data-percentage={stats.totalOrders ? Math.min(100, stats.totalOrders / 100) * 100 : 0}></div>
                {showValue && <p>{stats.totalOrders ?? 0}%</p>}
                <p>Total Order</p>
              </div>
              <div className="pie-chart">
                <div className="pie customer-growth" data-percentage={stats.totalDelivered ? Math.min(100, stats.totalDelivered / 100) * 100 : 0}></div>
                {showValue && <p>{stats.totalDelivered ?? 0}%</p>}
                <p>Customer Growth</p>
              </div>
              <div className="pie-chart">
                <div className="pie total-revenue" data-percentage={stats.totalRevenue ? Math.min(100, stats.totalRevenue / 100) * 100 : 0}></div>
                {showValue && <p>{stats.totalRevenue ?? 0}%</p>}
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-summary">
          <div className="orders-summary">
            <h2>Orders Summary</h2>
            <p className='p22'>Lorem ipsum dolor sit amet, consectetur</p>
            {/*  <div className="summary-controls">
              <button className="active">Monthly</button>
              <button>Weekly</button>
              <button>Today</button>
            </div> */}
            <div className="summary-content">
              <div className="percentage">
                <svg viewBox="0 0 36 36" className="circular-chart orange">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    stroke-dasharray={`${stats.totalOrders ? Math.min(100, stats.totalOrders / 500000) * 100 : 0}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage-text">{stats.totalOrders ? Math.min(100, stats.totalOrders / 500000) * 100 : 0}%</text>
                </svg>
              </div>
              <div className="details">
                <p>{stats.totalRevenue?.toFixed(2) ?? '0.00'}</p>
                <p>from {stats.totalOrders ?? '0'}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                <button onClick={handleMoreDetailsClick}>More Details</button> {/* Ajoutez l'événement onClick */}
              </div>
            </div>
            <div className="orders-status">
              <div className="status">
                <p>{stats.totalOrders ?? 0}</p>
                <p>On Delivery</p>
              </div>
              <div className="status">
                <p>{stats.totalDelivered ?? 0}</p>
                <p>Delivered</p>
              </div>
              <div className="status">
                <p>{stats.totalCanceled ?? 0}</p>
                <p>Canceled</p>
              </div>
            </div>
          </div>
          <div className="trending-products">
            <h2>Daily Trending Products</h2>
            <p>Lorem ipsum dolor sit ame.</p>
            <div className="pall">
              <PopularProducts />
              <button onClick={handleDetailsClick}>View More</button> {/* Ajoutez l'événement onClick */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
