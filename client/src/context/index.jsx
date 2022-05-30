import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const INTIIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const UserContext = createContext(INTIIAL_STATE);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    await axios
      .get("http://localhost:8080/auth/me")
      .then((res) => {
        console.log(res);
        if (res.data && res.data.user) {
          setUser({
            user: res.data.user,
            loading: false,
            error: null,
          });
        } else {
          setUser({
            user: null,
            loading: false,
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Running fetchUser");
    if (token) fetchUser();
    else {
      setUser({
        user: null,
        loading: false,
        error: null,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
