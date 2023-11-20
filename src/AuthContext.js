import axios from 'axios';
import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  });
  
  function login(token) {
    localStorage.setItem('token', token);
    setToken(token);
    loadUser(token);
  };

  function logout() {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  function updateUser(user) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function loadUser(token) {
    axios.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setUser(res.data.data);
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }).catch((error) => {

      });
  }

  return (
    <AuthContext.Provider value={{ user, token, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
