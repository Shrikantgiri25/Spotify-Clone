import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/userActions';
import Home from './Home.js';
import "../App.css"
import { Navigate } from 'react-router-dom';

// `
const Login = () => {
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const access_Token = localStorage.getItem("accessToken")
  //const playerState = useSelector((state)=> state.playerState.playerState)
  //console.log("Loggin clicked")
  
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = {};
    //here we are resetting the urlbar so only the app can access the access token(hiding the access token)
    window.location.hash
      .substring(1)
      .split("&")
      .forEach((chunk) => {
        const [key, value] = chunk.split("=");
        hash[key] = decodeURIComponent(value);
      });
    if (hash.access_token) {
      dispatch(login(hash.access_token));
      localStorage.setItem('accessToken',hash.access_token)
    }
    
  }, [dispatch]);
  const handleLogin = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectUri = "http://localhost:3000/";
    const clientId = "5dd979d19146422495bea24389a495af";

    const scopes = [
      "streaming",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
    ];
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
    window.location.href = loginUrl;
    
  };
  return (
    <div>
    {access_Token ? (
      <Navigate replace to ="/home"/>
    ) : (
      <div className="loggedout" style={{"backgroundColor":"black"}}>
        <img
          src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
          alt="Spotify Logo"
        />
        <button onClick={handleLogin}>Login with Spotify</button>
        {error && <p>{error}</p>}
      </div>
    )}
    </div>
  )
}

export default Login
