import React, { useEffect, useState } from 'react';
import { getProducts, getReviews } from '../../api/apiRep';
import Navbar from '../navbar/navbar';
import './analytics.css';
import img from './Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  totalSales?: number;
  reviews?: number;
  likes?: number;
  inStock?: boolean;
  ordered?: number;
  reviewIds?: string[];
}

interface Review {
  _id: string;
  content: string;
  rating: number;
}

const Analytics: React.FC = () => {
  const [mostFavoriteProducts, setMostFavoriteProducts] = useState<Product[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [reviewsByProduct, setReviewsByProduct] = useState<Record<string, Review[]>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await getProducts();

        if (products && products.length > 0) {
          const reviewsMap: Record<string, Review[]> = {};

          const productsWithReviews = await Promise.all(products.map(async (product) => {
            const reviews = await getReviews(product._id);
            reviewsMap[product._id] = reviews;

            // Type the accumulate function and the review parameter
            const averageRating = reviews.length > 0 
              ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length 
              : 0;

            return {
              ...product,
              averageRating,
            };
          }));

          const filteredProducts = productsWithReviews.filter(product => product.averageRating > 3);

          const favoriteProducts = filteredProducts
            .sort((a, b) => (b.likes || 0) - (a.likes || 0));

          const bestSellers = filteredProducts
            .sort((a, b) => (b.ordered || 0) - (a.ordered || 0));

          setMostFavoriteProducts(favoriteProducts);
          setBestSellerProducts(bestSellers);
          setReviewsByProduct(reviewsMap);
        } else {
          console.warn('No products found.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
            <div className="chanoufa">
              <div className="chan">
                <h3>Most Favorites Items</h3>
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="categories">
                <span className="active">All Categories</span>
                <span>Categorie 1</span>
                <span>Categorie 2</span>
                <span>Categorie 3</span>
                <div className="underline"></div>
              </div>
            </div>
            <div className="product-groups">
              {mostFavoriteProducts.length > 0 ? (
                mostFavoriteProducts.slice(0, 6).map((product, index) => (
                  <div className="product-card" key={index}>
                    <img src={product.imageUrl || img} alt={product.name} />
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className='mou'>{product.totalSales || 0} Total Sales</p>
                      <p>⭐ {reviewsByProduct[product._id]?.length || 0} Reviews</p>
                      <p>❤️ {product.likes || 0} Like it</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No favorite products available.</p>
              )}
              <div className="underline1"></div>
            </div>
            <button className="viewbtn">View More</button>
          </div>
          <div className="best-seller-products">
            <h3>Best Seller Product</h3>
            <div className="product-list">
              {bestSellerProducts.length > 0 ? (
                bestSellerProducts.map((product, index) => (
                  <div className="product-item" key={index}>
                    <img src={product.imageUrl || img} alt={product.name} />
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p className='mou'>{product.ordered || 0} Ordered</p>
                      <p>⭐ {reviewsByProduct[product._id]?.length || 0} Reviews</p>
                      <p>❤️ {product.likes || 0} Like it</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No best seller products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
