import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import img from './téléchargement.jpg';
import { ReactComponent as TrashIcon } from './trash.svg';
import { ReactComponent as EditIcon } from './pencil.svg';
import './customers.css';
import { getUsers, blockUser, deleteUser } from '../../api/apiRep';
import { getOrderStatistics, getOrdersByClientId } from '../../api/orderRep';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Customer {
  _id: string;
  username: string;
  firstName: string;
  email: string;
  avatar: string;
  isBlocked?: boolean;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<{ [key: string]: boolean }>({});
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showValue, setShowValue] = useState<boolean>(false);
  const [filter,setFilter]=useState<string>("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getUsers('');
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getOrderStatistics();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(()=>{
    if(filter===""){
      setFilteredCustomers(customers)
    }else{
      setFilteredCustomers(customers.filter(customer=>customer.firstName.includes(filter)))
    }

  },[customers,filter])

  const handleShowValueChange = () => {
    setShowValue(true);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, customerId: string) => {
    setSelectedCustomerIds((prev) => ({
      ...prev,
      [customerId]: event.target.checked,
    }));
  };

  const handleMenuToggle = (customerId: string) => {
    setMenuOpenId((prev) => (prev === customerId ? null : customerId));
  };

  const handleViewClick = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowHistory(true);
    try {
      const data = await getOrdersByClientId(customer._id);
      setTransactions(data);
      console.log('Fetched Data:', data); // Check the data here
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('no orders for this person');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setCustomers(customers.filter(customer => customer._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  const handleBlockUser = async (userId: string) => {
    try {
      await blockUser(userId);
      setCustomers(customers.map(customer => customer._id === userId ? { ...customer, isBlocked: true } : customer));
      toast.success('User blocked successfully');
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Error blocking user');
    }
  };

  const handleEditUser = (userId: string) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <div className='customer'>
      <Navbar setFilter={setFilter} filter={filter} />
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
              {filteredCustomers.slice(0, visibleCount).map(customer => (
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
                   
                    {customer.firstName}
                  </td>
                  <td>{customer.email}</td>
                  <td>
                    {selectedCustomerIds[customer._id] ? (
                      <div className="action-icons">
                        <TrashIcon className="trash" onClick={() => handleDeleteUser(customer._id)} />
                        <EditIcon className="trash" onClick={() => handleEditUser(customer._id)} />
                      </div>
                    ) : (
                      <div className="action-menu">
                        <button className="action-button" onClick={() => handleMenuToggle(customer._id)}>...</button>
                        {menuOpenId === customer._id && (
                          <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => handleViewClick(customer)}>View</button>
                            <button className="dropdown-item" onClick={() => handleBlockUser(customer._id)}>Block User</button>
                            <button className="dropdown-item" onClick={() => handleEditUser(customer._id)}>Edit User</button>
                            <button className="dropdown-item" onClick={() => handleDeleteUser(customer._id)}>Delete User</button>
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
            {visibleCount < customers.length && (
              <button className="view-more-button" onClick={handleLoadMore}>View More</button>
            )}
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
                  <button className="block-buttons" onClick={() => handleBlockUser(selectedCustomer._id)}>Block User</button>
                </div>
                <div className="user-stats">
                  <div className="stat">
                   {/*  <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="25.12" />
                      </svg>
                    </div> */}
                    <div className="stat-info">
                      <p>Total Orders</p>
                      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : stats && <p>{stats.totalOrders}</p>}
                    </div>
                  </div>
                  <div className="stat">
                 {/*    <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="50.24" />
                      </svg>
                    </div> */}
                    <div className="stat-info">
                      <p>Orders Delivered</p>
                      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : stats && <p>{stats.totalDelivered}</p>}
                    </div>
                  </div>
                  <div className="stat">
                   {/*  <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="75.36" />
                      </svg>
                    </div> */}
                    <div className="stat-info">
                      <p>Orders Canceled</p>
                      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : stats && <p>{stats.totalCanceled}</p>}
                    </div>
                  </div>
                  <div className="stat">
                   {/*  <div className="stat-icon">
                      <svg width="55" height="55" viewBox="0 0 100 100" className='dora'>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#00B8D9" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="125.6" />
                      </svg>
                    </div> */}
                    <div className="stat-info">
                      <p>Total Revenue</p>
                      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : stats && <p>{stats.totalRevenue}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-transactions">
                <h3>Transactions</h3>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Transaction Id</th>
                      <th>Date</th>
                      <th>Products</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.products.length}</td>
                        <td>{transaction.totalAmount}</td>
                        <td className={`status ${transaction.status.toLowerCase()}`}>
            {transaction.status}
          </td>
                      </tr>
                       
                      
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="go-back-button" onClick={() => setShowHistory(false)}>Back to Customers</button>
          </div>
        )
      )}
    </div>
  );
};

export default Customers;
