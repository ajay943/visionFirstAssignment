import React, { useState } from 'react';

const AdminScreen = ({ companies, setCompanies, loggedInUser }) => {
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', address: '', created_by: '' });
  const [newCompanyData, setNewCompanyData] = useState({ name: '', address: '' });


  const handleApprove = (id) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, status: 'APPROVED' } : company
      )
    );
  };


  const handleDelete = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };


  const handleEditClick = (company) => {
    setEditCompanyId(company.id);
    setEditFormData({ name: company.name, address: company.address, created_by: company.created_by });
  };


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData, [name]: value,
    }));
  };


  const handleSaveEdit = (id) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, ...editFormData } : company
      )
    );
    setEditCompanyId(null);
  };


  const handleNewCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompanyData((prevData) => ({
      ...prevData, [name]: value,
    }));
  };


  const handleCreateCompany = () => {
    const newCompany = {
      ...newCompanyData,
      id: companies.length + 1, 
      created_by: loggedInUser.username, 
      status: loggedInUser.role === 'IT_ADMIN' ? 'APPROVED' : 'UNAPPROVED', 
    };
    setCompanies([...companies, newCompany]);
    setNewCompanyData({ name: '', address: '' }); 
  };

  return (
    <div className="admin-container">
      <h2>Admin - All Companies List</h2>

      {/* Create Company Form */}
      <div className="create-company-form">
        <h3>Create Company</h3>
        <div className="row">
          <div className="column">
            <label>Company Name:</label>
            <input
              type="text"
              name="name"
              value={newCompanyData.name}
              onChange={handleNewCompanyInputChange}
              required
            />
          </div>
          <div className="column">
            <label>Company Address:</label>
            <input
              type="text"
              name="address"
              value={newCompanyData.address}
              onChange={handleNewCompanyInputChange}
              required
            />
          </div>
        </div>
        <button onClick={handleCreateCompany}>Save</button>
        <button onClick={() => setNewCompanyData({ name: '', address: '' })}>Cancel</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Company Name</th>
            <th>Created By</th>
            <th>Company Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={company.id}>
              <td>{index + 1}</td>

              {/* Edit Mode */}
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  company.name
                )}
              </td>

              {/* Created By (readonly during edit) */}
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    name="created_by"
                    value={editFormData.created_by}
                    readOnly
                  />
                ) : (
                  company.created_by
                )}
              </td>

              {/* Edit Mode */}
              <td>
                {editCompanyId === company.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  company.address
                )}
              </td>

              <td>
                {editCompanyId === company.id ? (
                  <>
                    <button style={{ backgroundColor: 'indigo', color: 'white' }} onClick={() => handleSaveEdit(company.id)}>
                      Save
                    </button>
                    <button onClick={() => setEditCompanyId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button style={{ backgroundColor: 'indigo', color: 'white' }} onClick={() => handleEditClick(company)}>
                      Edit
                    </button>
                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(company.id)}>
                      Delete
                    </button>

                    {/* Approve Button shown only for unapproved companies created by normal users */}
                    {company.status === 'UNAPPROVED' && company.created_by !== 'admin' && (
                      <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => handleApprove(company.id)}>
                        Approve
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminScreen;