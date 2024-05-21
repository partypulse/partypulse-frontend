import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [_userId, setUserId] = useLocalStorage("_userId", null);
  const [firstname, setFirstname] = useLocalStorage("firstname", null);
  const [lastname, setLastname] = useLocalStorage("lastname", null);
  const [tid, setTid] = useLocalStorage("tid", null);
  const [uid, setUid] = useLocalStorage("uid", null);
  const [role, setRole] = useLocalStorage("role", null);

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setUser(data);
      setRole(data.role);
      setUserId(data._userId);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setTid(data.tid);
      setUid(data.uid);

      navigate("/settings");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setRole(null);
      setUserId(null);
      setFirstname(null);
      setLastname(null);
      setTid(null);
      setUid(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure
    }
  };

  const value = useMemo(
    () => ({
      user,
      role,
      firstname,
      lastname,
      uid,
      tid,
      login,
      logout,
    }),
    [user, role, firstname, lastname, uid, tid]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
