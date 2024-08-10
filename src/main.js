import React, { useState, useEffect } from "react";
import Login from "./login";
import { getToken, removeToken, getUser } from "./api/api";
import AppHeader from "./components/Header";
import "./styles/style.css";

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

  return (
    <div className="main-wrapper">
      <AppHeader
        loggedIn={loggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      {loggedIn ? (
        <div className="main">
          <h1 style={{ textAlign: "center", marginTop: "35dvh" }}>
            Welcome, {username}!
          </h1>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Main;
