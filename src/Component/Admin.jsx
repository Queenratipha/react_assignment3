import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const Admin = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [usersRes, plantsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/api/users`),
        fetch(`${API_BASE}/api/plants`),
        fetch(`${API_BASE}/api/orders`)
      ]);
      
      const usersData = await usersRes.json();
      const plantsData = await plantsRes.json();
      const ordersData = await ordersRes.json();
      
      setUsers(usersData);
      setPlants(plantsData);
      setOrders(ordersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) throw new Error('Failed to update role');
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', email: '' });
  };

  const saveEdit = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editForm.name, email: editForm.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to update user');

      setUsers(users.map(u => u.id === userId ? { ...u, name: editForm.name, email: editForm.email } : u));
      cancelEdit();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteUser = async (userId) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser?.id === userId) {
      alert('You cannot delete your own account.');
      return;
    }
    if (!confirm('Delete this user? This cannot be undone.')) return;

    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to delete user');
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin-login');
  };

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;
  if (error) return <div className="admin-page"><p className="admin-error">{error}</p></div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'active' : ''}>
            📊 Dashboard
          </button>
          <button onClick={() => setActiveView('database')} className={activeView === 'database' ? 'active' : ''}>
            🗄️ Database Manager
          </button>
          <button onClick={() => setActiveView('users')} className={activeView === 'users' ? 'active' : ''}>
            👥 Users
          </button>
          <button onClick={() => setActiveView('plants')} className={activeView === 'plants' ? 'active' : ''}>
            🌱 Plants
          </button>
          <button onClick={() => setActiveView('orders')} className={activeView === 'orders' ? 'active' : ''}>
            📦 Orders
          </button>
          <button onClick={() => setActiveView('inventory')} className={activeView === 'inventory' ? 'active' : ''}>
            📋 Inventory
          </button>
          <button onClick={() => setActiveView('reports')} className={activeView === 'reports' ? 'active' : ''}>
            📈 Reports
          </button>
          <button onClick={() => setActiveView('notifications')} className={activeView === 'notifications' ? 'active' : ''}>
            🔔 Notifications
          </button>
          <button onClick={() => setActiveView('logs')} className={activeView === 'logs' ? 'active' : ''}>
            📝 Activity Logs
          </button>
          <button onClick={() => setActiveView('settings')} className={activeView === 'settings' ? 'active' : ''}>
            ⚙️ Settings
          </button>
        </nav>
        <button onClick={handleLogout} className="admin-logout">🚪 Logout</button>
      </aside>
      <main className="admin-main">
        {activeView === 'dashboard' && (
          <div className="admin-panel">
            <h1>Dashboard Overview</h1>
            <p className="admin-subtitle">System statistics and overview</p>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Total Plants</h3>
                <p>{plants.length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Total Orders</h3>
                <p>{orders.length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Pending Orders</h3>
                <p>{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </div>
        )}
        {activeView === 'database' && (
          <div className="admin-panel">
            <h1>Database Manager</h1>
            <p className="admin-subtitle">Manage database tables and records</p>
            
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>Users Table</h3>
                <p>{users.length} records</p>
              </div>
              <div className="admin-stat-card">
                <h3>Plants Table</h3>
                <p>{plants.length} records</p>
              </div>
              <div className="admin-stat-card">
                <h3>Orders Table</h3>
                <p>{orders.length} records</p>
              </div>
              <div className="admin-stat-card">
                <h3>Database Size</h3>
                <p>~2.5 MB</p>
              </div>
            </div>

            <div className="settings-section">
              <h3>🗄️ Database Operations</h3>
              <div className="settings-actions">
                <button className="admin-btn" onClick={() => alert('Database backup created!')}>
                  💾 Backup Database
                </button>
                <button className="admin-btn ghost" onClick={() => alert('Database optimized!')}>
                  ⚡ Optimize Tables
                </button>
                <button className="admin-btn" onClick={() => alert('Database exported!')}>
                  📤 Export Data
                </button>
                <button className="admin-btn ghost" onClick={() => alert('Import dialog opened')}>
                  📥 Import Data
                </button>
              </div>
            </div>

            <div className="settings-section">
              <h3>📊 Table Statistics</h3>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Table Name</th>
                      <th>Records</th>
                      <th>Size</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>User</td>
                      <td>{users.length}</td>
                      <td>~1.2 MB</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <button className="admin-btn" onClick={() => alert('Table truncated!')}>Clear</button>
                      </td>
                    </tr>
                    <tr>
                      <td>plants</td>
                      <td>{plants.length}</td>
                      <td>~0.8 MB</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <button className="admin-btn" onClick={() => alert('Table truncated!')}>Clear</button>
                      </td>
                    </tr>
                    <tr>
                      <td>orders</td>
                      <td>{orders.length}</td>
                      <td>~0.5 MB</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <button className="admin-btn" onClick={() => alert('Table truncated!')}>Clear</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="settings-section">
              <h3>⚠️ Danger Zone</h3>
              <div className="settings-actions">
                <button className="admin-btn danger" onClick={() => confirm('Reset all data? This cannot be undone!') && alert('Database reset!')}>
                  🗑️ Reset Database
                </button>
                <button className="admin-btn danger" onClick={() => confirm('Delete all users? This cannot be undone!') && alert('Users deleted!')}>
                  👥 Clear All Users
                </button>
                <button className="admin-btn danger" onClick={() => confirm('Delete all orders? This cannot be undone!') && alert('Orders deleted!')}>
                  📦 Clear All Orders
                </button>
              </div>
            </div>
          </div>
        )}
        {activeView === 'users' && (
          <div className="admin-panel">
            <h1>User Management</h1>
            <p className="admin-subtitle">Manage registered users and their roles</p>
      
        <div className="admin-table-container">
          <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="admin-input"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="admin-input"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="admin-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    {editingId === user.id ? (
                      <>
                        <button onClick={() => saveEdit(user.id)} className="admin-btn">Save</button>
                        <button onClick={cancelEdit} className="admin-btn ghost">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(user)} className="admin-btn">Edit</button>
                        <button onClick={() => deleteUser(user.id)} className="admin-btn danger">Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
          </div>
        )}
        {activeView === 'plants' && (
          <div className="admin-panel">
            <h1>Plants Management</h1>
            <p className="admin-subtitle">Manage plant inventory</p>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map(plant => (
                    <tr key={plant.id}>
                      <td>{plant.id}</td>
                      <td>{plant.name}</td>
                      <td>${plant.price}</td>
                      <td>{plant.stock}</td>
                      <td>{plant.description || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeView === 'orders' && (
          <div className="admin-panel">
            <h1>Orders Management</h1>
            <p className="admin-subtitle">View and manage customer orders</p>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Plant</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user_name}</td>
                      <td>{order.plant_name}</td>
                      <td>{order.quantity}</td>
                      <td><span className={`role-badge ${order.status}`}>{order.status}</span></td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeView === 'reports' && (
          <div className="admin-panel">
            <h1>Reports & Analytics</h1>
            <p className="admin-subtitle">View system reports and analytics</p>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>Active Users</h3>
                <p>{users.filter(u => u.role === 'user').length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Admins</h3>
                <p>{users.filter(u => u.role === 'admin').length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Low Stock Items</h3>
                <p>{plants.filter(p => p.stock < 10).length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Completed Orders</h3>
                <p>{orders.filter(o => o.status === 'completed').length}</p>
              </div>
            </div>
          </div>
        )}
        {activeView === 'inventory' && (
          <div className="admin-panel">
            <h1>Inventory Management</h1>
            <p className="admin-subtitle">Track and manage stock levels</p>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>Total Items</h3>
                <p>{plants.length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Low Stock</h3>
                <p>{plants.filter(p => p.stock < 10).length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Out of Stock</h3>
                <p>{plants.filter(p => p.stock === 0).length}</p>
              </div>
              <div className="admin-stat-card">
                <h3>Total Stock Value</h3>
                <p>${plants.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="admin-table-container" style={{marginTop: '2rem'}}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Plant Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map(plant => (
                    <tr key={plant.id}>
                      <td>{plant.name}</td>
                      <td>{plant.stock}</td>
                      <td>${plant.price}</td>
                      <td>
                        <span className={`role-badge ${plant.stock === 0 ? 'danger' : plant.stock < 10 ? 'user' : 'admin'}`}>
                          {plant.stock === 0 ? 'Out of Stock' : plant.stock < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeView === 'notifications' && (
          <div className="admin-panel">
            <h1>Notifications Center</h1>
            <p className="admin-subtitle">Manage system notifications and alerts</p>
            <div className="settings-section">
              <h3>🔔 Recent Notifications</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{padding: '1rem', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', borderLeft: '4px solid #667eea'}}>
                  <h4 style={{margin: '0 0 0.5rem 0'}}>New User Registration</h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>A new user has registered - {new Date().toLocaleString()}</p>
                </div>
                <div style={{padding: '1rem', background: 'rgba(245, 87, 108, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f5576c'}}>
                  <h4 style={{margin: '0 0 0.5rem 0'}}>Low Stock Alert</h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>{plants.filter(p => p.stock < 10).length} items are running low on stock</p>
                </div>
                <div style={{padding: '1rem', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', borderLeft: '4px solid #667eea'}}>
                  <h4 style={{margin: '0 0 0.5rem 0'}}>New Order Received</h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Order #{orders.length} has been placed</p>
                </div>
              </div>
            </div>
            <div className="settings-section">
              <h3>⚙️ Notification Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Email Notifications</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Low Stock Alerts</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>New Order Alerts</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>User Registration Alerts</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeView === 'logs' && (
          <div className="admin-panel">
            <h1>Activity Logs</h1>
            <p className="admin-subtitle">View system activity and audit logs</p>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{new Date().toLocaleString()}</td>
                    <td>admin@garden.com</td>
                    <td><span className="role-badge admin">Login</span></td>
                    <td>Admin logged in successfully</td>
                    <td>127.0.0.1</td>
                  </tr>
                  <tr>
                    <td>{new Date(Date.now() - 3600000).toLocaleString()}</td>
                    <td>user@example.com</td>
                    <td><span className="role-badge user">Order</span></td>
                    <td>Placed order #123</td>
                    <td>192.168.1.1</td>
                  </tr>
                  <tr>
                    <td>{new Date(Date.now() - 7200000).toLocaleString()}</td>
                    <td>admin@garden.com</td>
                    <td><span className="role-badge pending">Update</span></td>
                    <td>Updated plant inventory</td>
                    <td>127.0.0.1</td>
                  </tr>
                  <tr>
                    <td>{new Date(Date.now() - 10800000).toLocaleString()}</td>
                    <td>newuser@example.com</td>
                    <td><span className="role-badge user">Register</span></td>
                    <td>New user registration</td>
                    <td>192.168.1.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="settings-actions" style={{marginTop: '2rem'}}>
              <button className="admin-btn" onClick={() => alert('Logs exported!')}>📥 Export Logs</button>
              <button className="admin-btn ghost" onClick={() => alert('Logs filtered!')}>🔍 Filter Logs</button>
              <button className="admin-btn danger" onClick={() => confirm('Clear all logs?') && alert('Logs cleared!')}>🗑️ Clear Logs</button>
            </div>
          </div>
        )}
        {activeView === 'settings' && (
          <div className="admin-panel">
            <h1>Admin Settings</h1>
            <p className="admin-subtitle">Configure system settings and preferences</p>
            
            <div className="settings-section">
              <h3>🔧 System Configuration</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>API Base URL</label>
                  <input type="text" value={API_BASE} disabled className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Database Status</label>
                  <input type="text" value="Connected" disabled className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Application Version</label>
                  <input type="text" value="1.0.0" disabled className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Environment</label>
                  <input type="text" value="Production" disabled className="admin-input" />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>👤 Account Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Admin Email Notifications</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Two-Factor Authentication</label>
                  <select className="admin-select">
                    <option>Disabled</option>
                    <option>Enabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Session Timeout (minutes)</label>
                  <input type="number" defaultValue="30" className="admin-input" />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>🛒 Application Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Allow User Registration</label>
                  <select className="admin-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Order Auto-Approval</label>
                  <select className="admin-select">
                    <option>Disabled</option>
                    <option>Enabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Low Stock Alert Threshold</label>
                  <input type="number" defaultValue="10" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Currency</label>
                  <select className="admin-select">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>📧 Email Configuration</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>SMTP Server</label>
                  <input type="text" placeholder="smtp.example.com" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>SMTP Port</label>
                  <input type="number" defaultValue="587" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>From Email</label>
                  <input type="email" placeholder="noreply@garden.com" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Email Encryption</label>
                  <select className="admin-select">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>🔒 Security Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Password Min Length</label>
                  <input type="number" defaultValue="8" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Max Login Attempts</label>
                  <input type="number" defaultValue="5" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Account Lockout Duration (min)</label>
                  <input type="number" defaultValue="15" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Force Password Change</label>
                  <select className="admin-select">
                    <option>Every 90 days</option>
                    <option>Every 180 days</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>🎨 Appearance Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Theme</label>
                  <select className="admin-select">
                    <option>Dark</option>
                    <option>Light</option>
                    <option>Auto</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Language</label>
                  <select className="admin-select">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Date Format</label>
                  <select className="admin-select">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Time Format</label>
                  <select className="admin-select">
                    <option>12 Hour</option>
                    <option>24 Hour</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>💾 Backup & Maintenance</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Auto Backup</label>
                  <select className="admin-select">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Backup Retention (days)</label>
                  <input type="number" defaultValue="30" className="admin-input" />
                </div>
                <div className="setting-item">
                  <label>Maintenance Mode</label>
                  <select className="admin-select">
                    <option>Disabled</option>
                    <option>Enabled</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Debug Mode</label>
                  <select className="admin-select">
                    <option>Disabled</option>
                    <option>Enabled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="admin-btn" onClick={() => alert('Settings saved!')}>💾 Save All Settings</button>
              <button className="admin-btn ghost" onClick={() => alert('Settings reset!')}>🔄 Reset to Default</button>
              <button className="admin-btn danger" onClick={() => alert('Cache cleared!')}>🗑️ Clear Cache</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
