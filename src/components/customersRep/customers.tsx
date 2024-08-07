import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import img from './téléchargement.jpg';
import { ReactComponent as TrashIcon } from './trash.svg';
import './customers.css';
import { ReactComponent as EditIcon } from './pencil.svg';
import { getUsers } from '../../api/apiRep';
import { blockUser } from '../../api/apiRep'; 

interface Customer {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

const transactions = [
  { id: 1, transactionId: '289272304', date: '22/12/2019', product: '$50- Amazon Giftcard', amount: '#39,000.00', status: 'Successful' },
  { id: 2, transactionId: '289272304', date: '22/12/2019', product: '$130- Skrill Giftcard', amount: '#39,000.00', status: 'Successful' },
  { id: 3, transactionId: '289272304', date: '22/12/2019', product: '2Btc- Bitcoin', amount: '#39,000.00', status: 'Decline' },
  { id: 4, transactionId: '289272304', date: '22/12/2019', product: '$250- Steam Giftcard', amount: '#39,000.00', status: 'Successful' },
  { id: 5, transactionId: '289272304', date: '22/12/2019', product: '$134- Google Play Giftcard', amount: '#39,000.00', status: 'Successful' },
  { id: 6, transactionId: '289272304', date: '22/12/2019', product: '26Btc- Bitcoin', amount: '#39,000.00', status: 'Decline' },
];

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<{ [key: string]: boolean }>({});
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getUsers();
        console.log('Fetched Data:', data);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
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

  const handleViewClick = (customer: Customer) => {
    console.log('Selected Customer:', customer);
    setSelectedCustomer(customer);
    setShowHistory(true);
  };
  const handleBlockUser = async (userId: string) => {
    try {
      const response = await blockUser(userId);
      console.log('User blocked successfully:', response.data);
      // Optionally, update UI or state to reflect the change
    } catch (error) {
      console.error('Error blocking user:', error);
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
              {customers.map(customer => (
                <tr key={customer._id} className={selectedCustomerIds[customer._id] ? 'selected' : ''}>
                  <td className='ooo'>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${customer._id}`}
                      onChange={(e) => handleCheckboxChange(e, customer._id)}
                    />
                    <button className="view-button" onClick={() => handleViewClick(customer)}>View</button>
                  </td>
                  <td>
                    <img src={customer.avatar || img} alt={customer.username} className="avatar" />
                    {customer.username}
                  </td>
                  <td>{customer.email}</td>
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
                          <button className="dropdown-item" onClick={() => handleViewClick(customer)}>View</button>
                          <button className="dropdown-item" onClick={() => handleBlockUser(customer._id)}>Block User</button>
                        </div>
                      )}
                    </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer">
            <span>{customers.length} Users</span>
            <button className="view-more-button">View More</button>
          </div>
        </div>
      ) : (
        selectedCustomer && (
          <div className="history">
            <h2 className='h2'>History</h2>
            <div className='tous'>
              <div className="user-info">
                <img src={selectedCustomer.avatar || img} alt="User Avatar" className="user-avatar" />
                <h3>{selectedCustomer.username}</h3>
                <p>{selectedCustomer.email}</p>
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
                    <p className='rr'>Total Number Of <br /> Orders</p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" className='c1' />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#281AC8" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="80" />
                      </svg>
                    </div>
                    <div className="stat-value">#2300</div>
                    <p className='rr1'>Total Amount <br /> Earned</p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#281AC8" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="100" />
                      </svg>
                    </div>
                    <div className="stat-value">#0</div>
                    <p className='rr2'>Total number of <br /> canceled Orders</p>
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
                    <tr key={transaction.id}>
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
                              <button className="dropdown-item" onClick={() => handleBlockUser(selectedCustomer._id)}>Block User</button>
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
          </div>
        )
      )}
    </div>
  );
};

export default Customers;
