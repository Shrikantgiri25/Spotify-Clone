import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./actions/userActions";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

import Search from "./components/Search";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import Player from "./components/Player";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  console.log("App.js")
  useEffect(() => {
  console.log("useEffect")
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
       console.log("if acces log in")
       dispatch(login(accessToken));
       setLoggedIn(true);
    }
  }, [dispatch]);


  return (
    <Router>
      <div>
        {loggedIn && <SideBar />}
        {loggedIn && <Player />}
      </div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/home"
          element={<Home/>}
        />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
