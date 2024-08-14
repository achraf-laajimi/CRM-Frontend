import React, { useEffect, useState } from 'react';
import { getBestSellingProducts } from '../../api/apiRep';
import Navbar from '../navbar/navbar';
import './analytics.css';
import PopularProducts from '../PopularProducts';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  averageRating?: number;
  reviews?: { user: string; rating: number }[];
}

const Analytics: React.FC = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [salesRepId, setSalesRepId] = useState<string>('some-sales-rep-id');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const products = await getBestSellingProducts(salesRepId);
        console.log('Fetched best-selling products:', products);
        setBestSellerProducts(products);
      } catch (error) {
        console.error('Error fetching best-selling products:', error);
        setError('Failed to fetch best-selling products. Please try again later.');
      }
    };

    fetchBestSellingProducts();
  }, [salesRepId]);

  return (
    <div className="analytics">
      <Navbar />
      <div className="lkolfelkol">
        <div className="analytics-container">
          <div className="analytics-header">
            <h2>Analytics</h2>
            <p>Here is your products summary with graph view</p>
          </div>
          <div className="favorite-products">
            <h4>Popular Products</h4>
            <PopularProducts />
          </div>
          <div className="best-seller">
            <h3>Best-seller</h3>
            <div className="product-seller">
              {error ? (
                <p>{error}</p>
              ) : bestSellerProducts.length > 0 ? (
                bestSellerProducts.map((product) => (
                  <div className="product-item" key={product._id}>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <div className="product-rating">
                        {product.reviews && product.reviews.length > 0 ? (
                          <>
                            <span className="text-yellow-500">
                              {product.averageRating?.toFixed(1)} / 5
                            </span>
                            <span className="ml-1">({product.reviews.length} reviews)</span>
                          </>
                        ) : (
                          'No reviews'
                        )}
                      </div>
                      <div className="product-price">{`$${product.price.toFixed(2)}`}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No popular products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
