import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    profile: ''
  });

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(allUsers);
  }, []);

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(users[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSave = () => {
    const updated = [...users];
    updated[editingIndex] = editForm;
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
    setEditingIndex(null);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.phone?.includes(search)
  );

  return (
    <div className="admin-page">
      <div className="header-bar">
        <h1 className="title">User Management</h1>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length > 0 ? (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={user.profile || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="profile-img"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-results">No users found.</p>
      )}

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
            />
            <input
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Email"
            />
            <input
              name="phone"
              value={editForm.phone}
              onChange={handleEditChange}
              placeholder="Phone"
            />
            <input
              name="password"
              value={editForm.password}
              onChange={handleEditChange}
              placeholder="Password"
              type="password"
            />
            <input
              name="profile"
              value={editForm.profile}
              onChange={handleEditChange}
              placeholder="Profile Image URL"
            />
            <div className="modal-buttons">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setEditingIndex(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
