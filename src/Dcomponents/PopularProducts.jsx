import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/ProductMethods';

function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        const productsWithRating = fetchedProducts.map(product => {
          const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
          return { ...product, averageRating };
        });
        setProducts(productsWithRating);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.name}</p>
              <div className="text-xs text-gray-600">
                {product.reviews.length > 0 ? (
                  <>
                    <span className="text-yellow-500">{product.averageRating.toFixed(1)} / 5</span>
                    <span className="ml-1">({product.reviews.length} reviews)</span>
                  </>
                ) : (
                  'No reviews'
                )}
              </div>
            </div>
            <div className="text-xs text-gray-400 pl-1.5">{`$${product.price.toFixed(2)}`}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
