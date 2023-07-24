import React from "react";
import "./Sidebar.css"
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { ExitToApp, Home } from "@mui/icons-material";
import { Search, Person2, PlaylistAdd} from "@mui/icons-material";
import {ReactComponent as SpotifyLogo } from '../spotify1.svg'
import { Link } from "react-router-dom";


const SideBar = () => {
  const dispatch= useDispatch();
  const handleLogout = () => {
    //console.log("Logged-Out")
    localStorage.removeItem('accessToken')
    //console.log("->",localStorage.getItem('accessToken'))
    dispatch(logout)
  }
  return (<>
    
    <div className="sidebar" >
    <div>
    <SpotifyLogo className="logo"/>
    </div>
      <Link className="menu-item" to="/home">
      <Home className="icons"/>  
      Home
      </Link>
      <Link className="menu-item" to="/profile">
      <Person2 className="icons"/>  
      Profile
      </Link>
      
      <Link className="menu-item" to="/search">
      <Search className="icons"/>
        Search
      </Link>
      <Link className="menu-item" to=".">
      <PlaylistAdd className="icons"/>  
      Playlists
      </Link>
      <a className="logout-menu-item" href="/" onClick={()=>handleLogout()}>
        <ExitToApp className="icons"/>
        LogOut
      </a>
    </div>
    </>
  );
};

export default SideBar;
