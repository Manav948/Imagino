import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);

    } catch (error) {
      console.error("LocalStorage parse error:", error)
    }
  }, []);

  const login = (userData, tokenData = null) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (tokenData) {
      setToken(tokenData);
      localStorage.setItem('token', tokenData);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
