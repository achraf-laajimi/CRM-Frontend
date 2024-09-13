import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/produitRep';
import './populaire.css';  // Import the CSS file

interface Review {
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  reviews: Review[];
  averageRating?: number;
  count: number;
}

interface PopularProductsProps {
  count: number; // Number of products to display
}

const PopularProducts: React.FC<PopularProductsProps> = ({ count }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        const productsWithRating = fetchedProducts.map((product: Product) => {
          const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
          return { ...product, averageRating };
        });

        const filteredProducts = productsWithRating.filter((product: Product) =>
          product.reviews.some((review: Review) => review.rating > 3)
        );

        // Limit the number of products based on the count prop
        setProducts(filteredProducts.slice(0, count));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [count]); // Re-run effect when count changes

  const handleNavigateToReviews = (product: Product) => {
    navigate('/review', { state: { product } });
  };

  return (
    <div className="container">
      <div className="header">
        {/* <h2>Popular Products</h2> */}
      </div>
      <div className="product-listt">
        {products.map((product) => (
          <div key={product._id} className="product-cardd">
            <div className="image-wrapper">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="produuct-image"
                onClick={() => handleNavigateToReviews(product)}
              />
            </div>
            <div className="details">
              <p className="product-name">{product.name}</p>
              <div className="rating">
                {product.reviews.length > 0 ? (
                  <>
                    <span className="text-yellow-500">{product.averageRating?.toFixed(1)} / 5</span>
                    <span className="ml-1">({product.reviews.length} reviews)</span>
                  </>
                ) : (
                  'No reviews'
                )}
              </div>
              <div className="price">{`$${product.price.toFixed(2)}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
