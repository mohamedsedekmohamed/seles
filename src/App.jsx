// App.jsx
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import { useEffect, useState } from 'react';
import LeaderApp from './Routing/LeaderApp';
import SellerApp from './Routing/SellerApp';
import './Index.css';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  return (
    <Routes>
      {!role && (
        <Route path="/*" element={<Login setRole={setRole} />} />
      )}
 
      {role === "sales leader" && (
        <Route path="/*" element={<LeaderApp setRole={setRole} />} />
      )}
      {role === "salesman" && (
        <Route path="/*" element={<SellerApp setRole={setRole} />} />
      )}
      <Route path="/" element={<Login setRole={setRole} />} />
    </Routes>
  );
}

export default App;
