import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ users, setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username && user.password === password);
    console.log(user,'user')
    console.log(users,'users')
    if (user) {
      setLoggedInUser(user);
      if (user.role === 'IT_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;