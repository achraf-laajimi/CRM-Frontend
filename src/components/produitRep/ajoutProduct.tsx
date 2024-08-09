import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/produitRep'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './ajoutProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [imageBase64, setImageBase64] = useState('');
  const [gender, setGender] = useState<'men' | 'women' | 'kids' | undefined>(undefined);
  const [colors, setColors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !price || !category || !stock) {
      toast.error('All fields are required', {
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
        imageBase64, 
        gender, 
        colors 
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
          <label>Image (base64):</label>
          <input type="text" value={imageBase64} onChange={(e) => setImageBase64(e.target.value)} required />
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
