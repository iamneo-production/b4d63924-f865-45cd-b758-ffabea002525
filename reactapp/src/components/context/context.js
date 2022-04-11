import React, { useState } from "react";

const RailContext = React.createContext();

const RailProvider = ({ children }) => {
  const [user, setUser] = useState({
    userType: "admin",
    email: "",
    firstName: "",
    lastName: "",
    mobilenumber: "",
    age: "",
    gender: "",
    loggedIn: false,
    token: "",
  });

  return (
    <RailContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </RailContext.Provider>
  );
};

export { RailContext, RailProvider };
