import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Buyer', country: 'USA', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', country: 'UK', phone: '987-654-3210' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Seller', country: 'Canada', phone: '456-789-0123' },
  { id: 4, name: 'Bob Brown', role: 'Buyer', email: 'bob@example.com', country: 'Australia', phone: '321-654-0987' },
  // Add more customer data as needed
];

const CustomerReview = ({ customer, onDetails }) => {
  if (!customer) return null;

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4 mb-4 mx-auto">
      <div className="text-center text-gray-700 font-semibold mb-2">ID: {customer.id}</div>
      <div className="flex justify-center mb-4">
        <img 
          src="https://via.placeholder.com/100" 
          alt="Customer Profile" 
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="text-center text-gray-700 text-xl font-semibold mb-2">{customer.name}</div>
      <div className="text-center text-gray-500 border-b border-gray-300 pb-2 mb-4">{customer.role}</div>
      <div className="text-gray-700 mb-2"><strong>Email:</strong> {customer.email}</div>
      <div className="text-gray-700 mb-2"><strong>Country:</strong> {customer.country}</div>
      <div className="text-gray-700 mb-4"><strong>Phone:</strong> {customer.phone}</div>
      <button className="w-full bg-orange-500 text-white mt-3 py-2 rounded hover:bg-orange-600" onClick={() => onDetails(customer)}>
        View Details
      </button>
    </div>
  );
};

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const customersPerPage = 15;
  const navigate = useNavigate();

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = roleFilter
    ? customers.filter((customer) => customer.role.toLowerCase() === roleFilter.toLowerCase())
    : customers;

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleNavigateToReviews = (customer) => {
    navigate(`/customers/${customer.id}`, { state: { customer } });
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-[764px] bg-white rounded-lg shadow-md p-5 mb-4">
        <h2 className="mb-4 py-4 border-b border-gray-300 text-2xl font-bold text-gray-700">Listed Users</h2>
        <div className="mb-4">
          <label htmlFor="roleFilter" className="form-label block text-gray-700">Filter by Role:</label>
          <select
            id="roleFilter"
            className="form-select block w-full mt-1 rounded border-gray-300"
            value={roleFilter}
            onChange={handleRoleFilterChange}
          >
            <option value="">All</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-950 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-950 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-950 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-950 uppercase tracking-wider">Country</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-950 uppercase tracking-wider">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className={customer.role.toLowerCase() === 'buyer' ? 'bg-gray-100' : 'bg-white'}
                  onClick={() => handleCustomerClick(customer)}
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 p-4 mt-4">
          <p className="mb-0 text-gray-700">Showing {currentCustomers.length} of {filteredCustomers.length} Users</p>
          <div>
            <button
              className="bg-white text-gray-700 py-2 px-4 rounded mr-2 hover:border-transparent hover:text-orange-500"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-white text-gray-700 py-2 px-4 rounded mr-2 hover:border-transparent hover:text-orange-500"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="ml-5 w-full md:w-80">
        <CustomerReview customer={selectedCustomer} onDetails={handleNavigateToReviews} />
      </div>
    </div>
  );
};

export default Customers;
