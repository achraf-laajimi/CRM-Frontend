import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ajoutProduct.css';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [imageBase64, setImageBase64] = useState('');
  const [ownerId, setOwnerId] = useState(''); // Assurez-vous que l'ID de propriétaire est valide
  const [gender, setGender] = useState<'men' | 'women' | 'kids'>();
  const [colors, setColors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || price <= 0 || !category || stock < 0 || !ownerId) {
      toast.error('All fields are required and must be valid.');
      return;
    }

    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          stock,
          imageBase64,
          ownerId,
          gender,
          colors: colors.filter((color) => color.trim()) // Filtrer les valeurs vides
        }),
      });

      if (response.ok) {
        toast.success('Product added successfully!');
        navigate('/products');
      } else {
        const data = await response.json();
        toast.error(`Failed to add product: ${data.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while adding the product.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />

        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

        <label>Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value, 10))} required />

        <label>Owner ID</label>
        <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />

        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value as 'men' | 'women' | 'kids')}>
          <option value="">Select Gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <label>Colors (comma-separated)</label>
        <input
          type="text"
          value={colors.join(', ')}
          onChange={(e) => setColors(e.target.value.split(',').map((color) => color.trim()))}
        />

        <label>Image</label>
        <input type="file" onChange={handleImageChange} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
