// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminScreen from './components/AdminScreen';
import UserScreen from './components/UserScreen';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem('companies');
    return savedCompanies ? JSON.parse(savedCompanies) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  return (
    <Router>
      <div className="App">


        <Navbar loggedInUser={loggedInUser} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />
          <Route path="/login" element={<Login users={users} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/admin" element={<AdminScreen loggedInUser={loggedInUser} companies={companies} setCompanies={setCompanies} />} />
          <Route path="/user" element={<UserScreen companies={companies} setCompanies={setCompanies} loggedInUser={loggedInUser} />} />
        </Routes>
        <footer className="footer">
     <p>&copy; {new Date().getFullYear()} Company Management System. All rights reserved.</p>
   </footer>
      </div>
    </Router>
  );
};

export default App;