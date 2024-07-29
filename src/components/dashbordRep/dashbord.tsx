import React, { useState } from 'react';
import './dashbord.css';
import Navbar from '../navbar/navbar';
import RevenueChart from './RevenueChart';
import totalOrdersImg from './purchase-order.png';
import totalDeliveredImg from './delivery.png';
import totalCanceledImg from './cancel.png';
import totalRevenueImg from './money-bag.png';
import img from '../analyticsRep/Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg'

const Dashboard: React.FC = () => {
  const [showValue, setShowValue] = useState(true);

  const handleShowValueChange = () => {
    setShowValue(true);
  };

  const handleChartChange = () => {
    setShowValue(false);
  };

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
              <p>714k</p>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalDeliveredImg} alt="Total Delivered" />
            </div>
            <div className="card-content">
              <p>375</p>
              <p>Total Delivered</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalCanceledImg} alt="Total Canceled" />
            </div>
            <div className="card-content">
              <p>65</p>
              <p>Total Canceled</p>
            </div>
          </div>
          <div className="card">
            <div className="img">
              <img src={totalRevenueImg} alt="Total Revenue" />
            </div>
            <div className="card-content">
              <p>128$</p>
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
              </div></div>
            </div>
            <div className="pie-charts">
              <div className="pie-chart">
                <div className="pie total-order" data-percentage="81"></div>
                {showValue && <p>81%</p>}
                <p>Total Order</p>
              </div>
              <div className="pie-chart">
                <div className="pie customer-growth" data-percentage="22"></div>
                {showValue && <p>22%</p>}
                <p>Customer Growth</p>
              </div>
              <div className="pie-chart">
                <div className="pie total-revenue" data-percentage="62"></div>
                {showValue && <p>62%</p>}
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
          </div>
          <div className="dashboard-summary">
            <div className="orders-summary">
              <h2>Orders Summary</h2>
              <p className='p22'>Lorem ipsum dolor sit amet, consectetur</p>
              <div className="summary-controls">
                <button className="active">Monthly</button>
                <button>Weekly</button>
                <button>Today</button>
              </div>
              <div className="summary-content">
              <div className="percentage">
  <svg viewBox="0 0 36 36" className="circular-chart orange">
    <path className="circle-bg"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path className="circle"
      stroke-dasharray="95, 100"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="20.35" className="percentage-text">95%</text>
  </svg>
</div>
                <div className="details">
                  <p>456,005.56</p>
                  <p>from 500,000.00</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                  <button>More Details</button>
                </div>
              </div>
              <div className="orders-status">
                <div className="status">
                  <p>25</p>
                  <p>On Delivery</p>
                </div>
                <div className="status">
                  <p>95</p>
                  <p>Delivered</p>
                </div>
                <div className="status">
                  <p>5</p>
                  <p>Canceled</p>
                </div>
              </div>
            </div>
              <div className="trending-products">
  <h2>Daily Trending Products</h2>
  <p>Lorem ipsum dolor sit ame.</p>
  <div className="pall">
  <div className="product">
    <img src={img} alt="Product 1" className="product-image"/>
    <div className="product-details">
      <p>Product 1</p>
      <p>$2.4</p>
    </div>
    <p className="order-count">Order 89x</p>
  </div>
  <div className="product">
    <img src={img} alt="Product 2" className="product-image"/>
    <div className="product-details">
      <p>Lorem ipsum dolor sit ame.</p>
      <p>$2.4</p>
    </div>
    <p className="order-count">Order 89x</p>
  </div>
  <div className="product">
    <img src={img} alt="Product 3" className="product-image"/>
    <div className="product-details">
      <p>haja taya Classic szechuan Rice</p>
      <p>$2.4</p>
    </div>
    <p className="order-count">Order 89x</p>
  </div>
  </div>
</div>
          </div>
        
      </div>
    </div>
    
  );
};

export default Dashboard;
