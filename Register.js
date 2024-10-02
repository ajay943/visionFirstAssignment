import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUsers, users }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    role: 'IT_USER_NORMAL',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    setUsers([...users, formData]);


    localStorage.setItem('users', JSON.stringify([...users, formData]));

    alert('User Registered Successfully');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="IT_USER_NORMAL">Normal User</option>
          <option value="IT_ADMIN">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;