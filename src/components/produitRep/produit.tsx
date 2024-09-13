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
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [visibleCount, setVisibleCount] = useState<number>(500000); // Définir visibleCount ici
    const productsPerPage = 500000;
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();


        useEffect(() => {
            const fetchProducts = async () => {
                console.log('Fetching products...');
                try {
                    const fetchedProducts = await getProducts();
                    console.log('Products fetched:', fetchedProducts);
                    setProducts(fetchedProducts);
                    setFilteredProducts(fetchedProducts);
                } catch (error) {
                    console.error('Error fetching products:', error);
                    // Add more detailed error handling here if needed
                }
            };
            fetchProducts();
        }, []);

    useEffect(() => {
        if (filter === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.name.includes(filter)));
        }
    }, [products, filter]);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
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
    
        const productWithReviews = { ...product};
        
        navigate(`/review`, { state: { product: productWithReviews, key: Math.random() } });
    };

    return (
        <div className="produit">
            <Navbar setFilter={setFilter} filter={filter} />
            <div className="product-list">
                <div className="btnete">
                    <button className="add-product-btn" onClick={() => navigate('/add-product')}>+ ajouter produit</button>
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
                                <h3 className="productt-name">{product.name}</h3>
                                <p className="product-quantity">{product.stock}ps</p>
                                <p className="productt-price">${product.price}</p>
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
