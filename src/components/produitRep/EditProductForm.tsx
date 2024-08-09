import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateProduct } from '../../api/editapirep';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProduct.css';

const EditProductForm: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const productId = state?.product?._id || '';  // Ensure to use '_id' as in your model

  // Log to check the product ID
  console.log("State:", state);
  console.log("Product ID:", productId);

  useEffect(() => {
    if (state?.product) {
      const fetchedProduct = state.product;
      setProduct(fetchedProduct);
      setName(fetchedProduct.name); 
      setPrice(fetchedProduct.price); 
      setStock(fetchedProduct.stock);  // Correctly use 'stock' here
      setLoading(false);
    } else {
      console.error('No product found in state.');
      setLoading(false);
    }
  }, [state]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!productId) {
      console.error('Product ID is not defined.');
      toast.error('Product ID is not defined.');
      return;
    }

    try {
      await updateProduct(productId, { name, price, stock });  // Correctly pass 'stock'

      toast.success('Product Updated Successfully', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/produit');
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="stock">Quantity</label>  {/* Change the label to 'stock' */}
          <input
            type="number"
            id="stock"  // Change the id to 'stock'
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProductForm;
