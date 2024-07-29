import React from 'react';
import './analytics.css';
 import Navbar from '../navbar/navbar'; 
import img from './Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg';

interface Product {
  id: string;
  name: string;
  image: string;
  totalSales: number;
  reviews: number;
  likes: number;
  inStock?: boolean;
  ordered?: number;
}

const mostFavoriteProducts: Product[] = [
  { id: '1', name: 'Product 1', image: img, totalSales: 2441, reviews: 456, likes: 234 },
  { id: '2', name: 'Product 2', image: img, totalSales: 2441, reviews: 456, likes: 234 },
  { id: '3', name: 'Product 3', image: img, totalSales: 2441, reviews: 456, likes: 234 },
  { id: '4', name: 'Product 4', image: img, totalSales: 2441, reviews: 456, likes: 234 },
  { id: '5', name: 'Product 5', image: img, totalSales: 2441, reviews: 456, likes: 234 },
  { id: '6', name: 'Product 6', image: img, totalSales: 2441, reviews: 456, likes: 234 },
];

const bestSellerProducts: Product[] = [
  { id: '1', name: 'Product 1', image: img, totalSales: 2441, reviews: 456, likes: 234, inStock: true, ordered: 156 },
  { id: '2', name: 'Product 2', image: img, totalSales: 2441, reviews: 456, likes: 234, inStock: false, ordered: 0 },
];

const Analytics: React.FC = () => {
  return (
    <div className="analytics">
      <Navbar /> 
      <div className='lkolfelkol'>
      <div className="analytics-container">
        <div className="analytics-header">
          <h2>Analytics</h2>
          <p>Here is your products summary with graph view</p>
        </div>
        <div className="favorite-products">
          <div className='chanoufa'>
            <div className="chan">
          <h3>Most Favorites Items</h3>
          <p>Lorem ipsum dolor</p></div>
          <div className="categories">
            <span className="active">All Categories</span>
            <span>Categorie 1</span>
            <span>Categorie 2</span>
            <span>Categorie 3</span>
            <div className="underline"></div>
          </div></div>
          <div className="product-groups">
            <div className="product-group">
              {mostFavoriteProducts.slice(0, 2).map((product, index) => (
                <div className="product-card" key={index}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <h5 className='mou'>{product.totalSales} Total Sales</h5>
                    <p>⭐ {product.reviews} Review</p>
                    <p>❤️ {product.likes} Like it</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='unde'></div>
            <div className="underline1"></div>
            <div className="product-group">
              {mostFavoriteProducts.slice(2,4).map((product, index) => (
                <div className="product-card" key={index}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className='mou'>{product.totalSales} Total Sales</p>
                    <p>⭐ {product.reviews} Review</p>
                    <p>❤️ {product.likes} Like it</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="underline2"></div>
            <div className="product-group">
              {mostFavoriteProducts.slice(4,6).map((product, index) => (
                <div className="product-card" key={index}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className='mou'>{product.totalSales} Total Sales</p>
                    <p>⭐ {product.reviews} Review</p>
                    <p>❤️ {product.likes} Like it</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="underline3"></div>
          </div>
          <button className="viewbtn">View More </button>
        </div>
        <div className="best-seller-products">
          <h3>Best Seller Product</h3>
          <div className="product-list">
            {bestSellerProducts.map((product, index) => (
              <div className="product-item" key={index}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.inStock ? 'In stock' : 'Out of stock'}  <span>{product.ordered}</span></p>
                  <p>Ordered for {product.ordered} Person</p>
                 
                  <div className="underline4"></div>
                </div>
              </div>
            ))}
          </div>
          <button className="viewbtn1">View More</button>
        </div>
      </div></div>
    </div>
  );
};

export default Analytics;
