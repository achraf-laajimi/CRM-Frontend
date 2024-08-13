import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../api/produitRep';
import Navbar from '../navbar/navbar';
import './produit.css';

interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string; 
    stock?: number; 
}

const ProductList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 15;
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleDelete = async (_id: string) => {  // Use _id here
        try {
            await deleteProduct(_id);
            setProducts(products.filter(product => product._id !== _id));  // Update filter condition
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };
    const handleEdit = (product: Product) => {
        navigate('/edit-product', { state: { product } });
    };

    const handleNavigateToReviews = (product: Product) => {
        const fakeReviews = [
            { rating: 5, comment: "Amazing product! Highly recommend." },
            { rating: 4, comment: "Very good quality, but could be cheaper." },
            { rating: 3, comment: "Decent product, but not as described." },
        ];
    
        const productWithReviews = { ...product, reviews: fakeReviews };
        
        console.log("Navigating to review page with product:", productWithReviews);
    
        // Use a unique key to ensure React Router recognizes the state
        navigate(`/review`, { state: { product: productWithReviews, key: Math.random() } });
    };
    
    
    

    return (
        <div className="produit">
            <Navbar />
            <div className="product-list">
                <div className="btnete">
                    <button   className="add-product-btn" 
  onClick={() => navigate('/add-product')}>+ ajouter produit</button>
                </div>
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="product-image" 
                                onClick={() => handleNavigateToReviews(product)}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-quantity">{product.stock}ps</p>
                                <p className="product-price">${product.price}</p>
                                <div className="product-actions">
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(product)}
                                    >
                                        ✏️
                                    </button>
                                    <button 
                                         className="delete-btn" 
                                         onClick={() => handleDelete(product._id)} 
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
