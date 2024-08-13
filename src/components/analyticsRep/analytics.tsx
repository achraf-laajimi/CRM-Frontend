import React, { useEffect, useState } from 'react';
import { getProducts, getReviews, likeProduct, unlikeProduct } from '../../api/apiRep';
import Navbar from '../navbar/navbar';
import '../PopularProducts';
import './analytics.css';
import img from './Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  totalSales?: number;
  reviews: Review[];
  likes?: number;
  inStock?: boolean;
  ordered?: number;
  reviewIds?: string[];
  averageRating?: number;
  price: number;
}

interface Review {
  _id: string;
  content: string;
  rating: number;
}

const Analytics: React.FC = () => {
  const [mostFavoriteProducts, setMostFavoriteProducts] = useState<Product[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [reviewsByProduct, setReviewsByProduct] = useState<Record<string, Review[]>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await getProducts();
        console.log('Fetched products:', products);

        // Calculate average rating for each product
        const productsWithRating = products.map((product) => {
          const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
          return { ...product, averageRating };
        });

        setPopularProducts(productsWithRating);

        // Sort or filter products based on likes for most favorite products
        const favoriteProducts = productsWithRating
          .filter((product) => product.likes !== undefined)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0));

        // Sort or filter products based on ordered or totalSales for best seller products
        const bestSellers = productsWithRating
          .filter((product) => product.ordered !== undefined)
          .sort((a, b) => (b.ordered || 0) - (a.ordered || 0));

        setMostFavoriteProducts(favoriteProducts);
        setBestSellerProducts(bestSellers);

        // Fetch reviews for each product
        const reviewsMap: Record<string, Review[]> = {};
        for (const product of products) {
          if (product._id) {
            const reviews = await getReviews(product._id);
            reviewsMap[product._id] = reviews;
          }
        }
        setReviewsByProduct(reviewsMap);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle liking a product
  const handleLikeProduct = async (productId: string) => {
    try {
      const updatedProduct = await likeProduct(productId);
      setMostFavoriteProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, likes: updatedProduct.likes } : product
        )
      );
    } catch (error) {
      console.error('Error liking product:', error);
    }
  };

  // Function to handle unliking a product
  const handleUnlikeProduct = async (productId: string) => {
    try {
      const updatedProduct = await unlikeProduct(productId);
      setMostFavoriteProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, likes: updatedProduct.likes } : product
        )
      );
    } catch (error) {
      console.error('Error unliking product:', error);
    }
  };

  return (
    <div className="analytics">
      <Navbar />
      <div className="lkolfelkol">
        <div className="analytics-container">
          <div className="analytics-header">
            <h2>Analytics</h2>
            <p>Here is your products summary with graph view</p>
          </div>

          {/* Most Favorite Products Section */}
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
                      <button onClick={() => handleLikeProduct(product._id)}>Like</button>
                      <button onClick={() => handleUnlikeProduct(product._id)}>Unlike</button>
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

          {/* Best Seller Products Section */}
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

          {/* Popular Products Section */}
          <div className="popular-products">
            <h3>Popular Products</h3>
            <div className="product-list">
              {popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                  <div className="product-item" key={product._id}>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <div className="product-rating">
                        {product.reviews.length > 0 ? (
                          <>
                            <span className="text-yellow-500">{product.averageRating?.toFixed(1)} / 5</span>
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
