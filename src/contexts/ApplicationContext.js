import React, { useState } from "react";

export const AppContext = React.createContext(undefined);

export const ApplicationContext = ({ children, setNotFound }) => {
  const [appState, setAppstate] = useState({
    user: {},
    role: "",
    firstName: "",
    lastName: "",
    uid: "",
    totalPrice: 0,
    tid: "",
    cart: [],
  });
  return (
    <AppContext.Provider value={[appState, setAppstate]}>
      {children}
    </AppContext.Provider>
  );
};
