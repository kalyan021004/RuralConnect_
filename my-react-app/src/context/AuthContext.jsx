import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD USER FROM BACKEND (NOT LOCALSTORAGE)
  const loadUser = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data); // FULL USER OBJECT
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 On app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (form) => {
    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    await loadUser(); // 🔥 fetch full profile immediately
  };

  // 📝 SIGNUP
  const signup = async (form) => {
    await api.post("/auth/register", form);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
