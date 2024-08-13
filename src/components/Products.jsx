// src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/ProductMethods';

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const navigate = useNavigate();

  //get the products from backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchProducts();
  }, []);


  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);
  // Get current products
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // Handle next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  // Navigate to ProductReview
  const handleNavigateToReviews = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex flex-col items-center mx-5">
      <div className="flex flex-col w-[1000px] bg-white p-4 shadow-md rounded-lg">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Listed Products</h2>
          <p className="text-gray-700 mb-4">
            All the products that are available in your store are shown with their details, price, and other info.
          </p>
          <div className="overflow-x-auto">
            <table className="border-separate border border-slate-500 min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">CATEGORY</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">PRICE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">STOCK</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="bg-black text-white py-1 px-2 rounded"
                        onClick={() => handleNavigateToReviews(product)}
                      >
                        Reviews
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 p-4 mt-4">
          <p className="text-gray-700">
            Showing {Math.min(currentPage * productsPerPage, products.length)} of {products.length} Products
          </p>
          <div>
            <button
              className="bg-white text-gray-700 py-2 px-4 rounded mr-2 hover:border-transparent hover:text-orange-500"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-white text-gray-700 py-2 px-4 rounded hover:border-transparent hover:text-orange-500"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;