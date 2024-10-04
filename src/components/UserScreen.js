// src/components/UserScreen.js
import React, { useState } from 'react';

const UserScreen = ({ companies, setCompanies, loggedInUser }) => {
  const [newCompany, setNewCompany] = useState({ name: '', address: '' });
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCreateCompany = () => {
    const company = {
      ...newCompany,
      id: companies.length + 1,
      created_by: loggedInUser.username,
      status: 'UNAPPROVED',
    };

    // Update companies in the state
    const updatedCompanies = [...companies, company];
    setCompanies(updatedCompanies);

    // Persist companies in localStorage
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    setNewCompany({ name: '', address: '' }); // Reset the form
  };

  const handleSaveEdit = (id) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id ? { ...company, ...editFormData } : company
    );

    setCompanies(updatedCompanies);

    // Persist companies in localStorage
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    setEditCompanyId(null);
  };

  const handleDelete = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);

    // Persist companies in localStorage
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  };

  const userCompanies = companies.filter((company) => company.created_by === loggedInUser.username);

  return (
    <div className="user-container">
      <h2>User - My Companies</h2>
      <table>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Company Name</th>
            <th>Created By</th>
            <th>Company Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userCompanies.map((company, index) => (
            <tr key={company.id}>
              <td>{index + 1}</td>
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  company.name
                )}
              </td>
              <td>{company.created_by}</td>
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditChange}
                  />
                ) : (
                  company.address
                )}
              </td>
              <td>{company.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Create a New Company</h3>
      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={newCompany.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Company Address"
        value={newCompany.address}
        onChange={handleChange}
      />
      <button onClick={handleCreateCompany}>Create Company</button>
    </div>
  );
};

export default UserScreen;