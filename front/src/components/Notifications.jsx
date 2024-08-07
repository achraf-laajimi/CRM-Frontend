import React from 'react';

const Notifications = () => {
  // Example products data
  const newProducts = [
    { id: 1, name: 'Product A', date: '2024-08-01', description: 'Description of Product A', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product B', date: '2024-08-02', description: 'Description of Product B', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product C', date: '2024-08-03', description: 'Description of Product C', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product D', date: '2024-08-04', description: 'Description of Product D', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Product E', date: '2024-08-05', description: 'Description of Product E', imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-black mb-7">New Products for Review</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {newProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 font-semibold">{product.name}</p>
            <p className="text-gray-500 text-sm mb-2">{product.date}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
