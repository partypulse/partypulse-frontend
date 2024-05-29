import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

// This is the place where authentication information will be shared and made available to components.
const AuthContext = createContext();

// AuthProvider: It accepts children as props, which are the components to be wrapped by the authentication context.
// Uses useLocalStorage to create various local storage variables for user information, such as user credentials, role, name, and identification.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [_userId, setUserId] = useLocalStorage("_userId", null);
  const [firstname, setFirstname] = useLocalStorage("firstname", null);
  const [lastname, setLastname] = useLocalStorage("lastname", null);
  const [tid, setTid] = useLocalStorage("tid", null);
  const [uid, setUid] = useLocalStorage("uid", null);
  const [role, setRole] = useLocalStorage("role", null);

  const navigate = useNavigate();

  // Upon login, the user information is put into local storage and the user is redirected to "/products".
  const login = async (data) => {
    try {
      setUser(data);
      setRole(data.role);
      setUserId(data._userId);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setTid(data.tid);
      setUid(data.uid);

      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  // Upon logout, the user information is cleared from local storage and the user is redirected to the home page ("/").
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

  // Uses useMemo to memorize the authentication value and avoid unnecessary renderings.
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
    [user, role, firstname, lastname, uid, tid],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
