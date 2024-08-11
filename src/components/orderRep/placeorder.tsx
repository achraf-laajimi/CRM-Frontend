import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/orderRep';

const PlaceOrder: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [products, setProducts] = useState<{ productId: string, quantity: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const navigate = useNavigate();

  const handleAddProduct = () => {
    setProducts([...products, { productId: '', quantity: 1 }]);
  };

  interface Product {
    productId: string;
    quantity: number;
  }
  

  
  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products];
  
    // Ensure the type matches before assigning
    if (field === 'productId' && typeof value === 'string') {
      updatedProducts[index][field] = value;
    } else if (field === 'quantity' && typeof value === 'number') {
      updatedProducts[index][field] = value;
    }
  
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      userId,
      products,
      paymentMethod,
      shippingAddress
    };

    try {
      await createOrder(orderData);
      alert('Order created successfully!');
      navigate('/orders'); // Redirige vers la liste des commandes après la création
    } catch (err) {
      console.error('Erreur lors de la création de la commande:', err);
      alert('Erreur lors de la création de la commande');
    }
  };

  return (
    <div className="place-order">
      <h2>Place New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        {products.map((product, index) => (
          <div key={index}>
            <label>Product ID:</label>
            <input
              type="text"
              value={product.productId}
              onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
              required
            />
            <label>Quantity:</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>Add Product</button>

        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
