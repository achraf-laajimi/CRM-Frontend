import React from 'react';

const products = [
  {
    id: 1,
    name: 'Aya toll alina , ow khali l\'affariettes alina DFGVBWC hgjgjhgggjig',
    price: '29,00 TND',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Aya toll alina , ow khali l\'affariettes alina DFGVBWC hgjgjhgggjig',
    price: '29,00 TND',
    image: 'https://via.placeholder.com/100',
  },
  // Vous pouvez ajouter plus de produits ici
];

const ProductItem = ({ name, price, image }) => (
  <div className="bg-white p-4 rounded-lg flex items-center shadow mb-4">
    <img src={image} alt="Product" className="w-24 h-24 rounded-lg mr-4" />
    <div className="flex-1">
      <p className="text-gray-700 text-base">{name}</p>
      <span className="text-black text-lg font-bold mt-2 block">{price}</span>
      <div className="flex items-center mt-2">
        <button className="bg-[#ff8c72] text-white px-4 py-2 rounded-lg text-sm mr-2 hover:bg-[#ff705b]">
          Acheter
        </button>
        <div className="text-[#ff8c72] p-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Wishlist = () => {
  return (
    <div className="bg-[#f9d2c4] p-5 rounded-lg shadow-md mx-auto w-[1180px] h-[580px]">
      <h1 className="text-xl font-bold text-gray-900 mb-5">Votre liste d’envies ({products.length})</h1>
      {products.map(product => (
        <ProductItem 
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Wishlist;