import React, { useState, useEffect } from "react";
import Login from "./login";
import { getToken, removeToken, getUser } from "./api/api";

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoggedIn(true);
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    const { data, error } = await getUser();
    if (data) {
      setUsername(data.username);
    } else {
      console.error(error);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    fetchUserDetails();
  };

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    setUsername("");
  };

  if (loggedIn) {
    return (
      <div className="main">
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return <Login onLogin={handleLogin} />;
}

export default Main;
