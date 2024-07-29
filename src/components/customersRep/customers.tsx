import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import img from './téléchargement.jpg';
import { ReactComponent as TrashIcon } from './trash.svg';
import { ReactComponent as EditIcon } from './pencil.svg';
import './customers.css';
import { getUsers, getTransactions } from '../../api/apiRep'; // Import des fonctions API

interface Customer {
  _id: string;
  username: string;
  emailAddress: string;
  avatar: string;
}

interface Transaction {
  _id: string;
  transactionId: string;
  date: string;
  product: string;
  amount: string;
  status: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<{ [key: string]: boolean }>({});
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null); // État pour stocker le client sélectionné
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        console.log('Fetched customers:', usersData); // Debugging
        setCustomers(usersData);

        const transactionsData = await getTransactions();
        console.log('Fetched transactions:', transactionsData); // Debugging
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, customerId: string) => {
    setSelectedCustomerIds((prev) => ({
      ...prev,
      [customerId]: event.target.checked,
    }));
  };

  const handleMenuToggle = (customerId: string) => {
    setMenuOpenId((prev) => (prev === customerId ? null : customerId));
  };

  const handleViewClick = (customerId: string) => {
    const customer = customers.find(c => c._id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setShowHistory(true);
    }
  };

  return (
    <div className='customer'>
      <Navbar />
      {!showHistory ? (
        <div className="customers">
          <h2>Customers</h2>
          <table className="customers-table">
            <thead>
              <tr>
                <th>Order history</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map(customer => (
                  <tr key={customer._id} className={selectedCustomerIds[customer._id] ? 'selected' : ''}>
                    <td className='ooo'>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${customer._id}`}
                        onChange={(e) => handleCheckboxChange(e, customer._id)}
                      />
                      <button className="view-button" onClick={() => handleViewClick(customer._id)}>View</button>
                    </td>
                    <td>
                      <img src={customer.avatar || img} alt={customer.username} className="avatar" />
                      {customer.username}
                    </td>
                    <td>{customer.emailAddress}</td>
                    <td>
                      {selectedCustomerIds[customer._id] ? (
                        <div className="action-icons">
                          <TrashIcon className="trash" />
                          <EditIcon className="trash" />
                        </div>
                      ) : (
                        <div className="action-menu">
                          <button className="action-button" onClick={() => handleMenuToggle(customer._id)}>...</button>
                          {menuOpenId === customer._id && (
                            <div className="dropdown-menu">
                              <button className="dropdown-item" onClick={() => handleViewClick(customer._id)}>View</button>
                              <button className="dropdown-item">Block User</button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="footer">
            <span>{customers.length} Users</span>
            <button className="view-more-button">View More</button>
          </div>
        </div>
      ) : (
        <div className="history">
          <h2 className='h2'>History</h2>
          {selectedCustomer && (
            <div className='tous'>
              <div className="user-info">
                <img src={selectedCustomer.avatar || img} alt="User Avatar" className="user-avatar" />
                <h3>{selectedCustomer.username}</h3>
                <p>{selectedCustomer.emailAddress}</p>
                <div className="user-actions">
                  <button className="down-buttons">Down</button>
                  <button className="block-buttons">Block User</button>
                </div>
                <div className="user-stats">
                  <div className="stat">
                    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#281AC8" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="50" />
                      </svg>
                    </div>
                    <div className="stat-value">1000</div>
                    <p className='rr'>Total Number Of <br/> Orders</p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100"  className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" className='c1'/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#281AC8" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="80" />
                      </svg>
                    </div>
                    <div className="stat-value">#2300</div>
                    <p className='rr1'>Total Amount <br/> Earned</p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#281AC8" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="100" />
                      </svg>
                    </div>
                    <div className="stat-value">#0</div>
                    <p className='rr2'>Total number of <br/> canceled Orders</p>
                  </div>
                </div>
              </div>
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date livr</th>
                    <th>Products</th>
                    <th>Amounts</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction._id}>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.product}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        <div className={transaction.status === 'Successful' ? 'status-success-bg' : 'status-decline-bg'}>
                          <span className={transaction.status === 'Successful' ? 'status-success' : 'status-decline'}>
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="action-menus">
                          <button className="action-buttons">...</button>
                          <div className="dropdown-menus">
                            {transaction.status === 'Successful' ? (
                              <>
                                <button className="dropdown-items">Payment Details</button>
                                <button className="dropdown-items">Block User</button>
                              </>
                            ) : (
                              <button className="dropdown-items">Block User</button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Customers;
