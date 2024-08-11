import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct } from '../../api/produitRep';
import './ajoutProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [gender, setGender] = useState<'men' | 'women' | 'kids' | undefined>(undefined);
  const [colors, setColors] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState(''); // New state for ownerId
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !price || !category || !stock || !ownerId) {
      toast.error('All fields are required, including Owner ID', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
  
    try {
      await createProduct({ 
        name, 
        description, 
        price, 
        category, 
        stock, 
        gender, 
        colors,
        ownerId // Pass ownerId to the backend
      });
      toast.success('Product added successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/produit');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error creating product. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('An unexpected error occurred. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };
  
  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing fields */}
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as 'men' | 'women' | 'kids')}>
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div>
          <label>Colors:</label>
          <input type="text" value={colors.join(', ')} onChange={(e) => setColors(e.target.value.split(', '))} />
        </div>
        {/* New Owner ID field */}
        <div>
          <label>Owner ID:</label>
          <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
