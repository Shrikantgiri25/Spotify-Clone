import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import Login from "./Login";
import {OpenInBrowser} from "@mui/icons-material"



const Profile = () => {
  const [user, setUser] = useState(null);
  const navigateUser = () => {
   window.location.href='https://accounts.spotify.com/en/status?flow_ctx=81a54d47-dcb6-49ce-87bc-cec5a44f3b0c%3A1687533229';
  }
  const access_token = localStorage.getItem('accessToken')
  useEffect(()=>{
    const getUser = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        //console.log(response.data)
        setUser(response.data);
        //console.log(response);
      } catch (error) {
        console.log("Fetching user data");
      }
    };
    getUser();
  },[access_token])

  return access_token  ? (
    <>
      { user && user.display_name &&
        <div className="loggedin">
          <img className="useravatar" src="https://th.bing.com/th/id/OIP.GjSI2vNmmn8Sbr3wYcJH5AAAAA?pid=ImgDet&rs=1" alt="userprofile" />
          <h2 className="loggedin-heading">Welcome, {user.display_name}</h2>
          <p className="loggedin-email">Email: {user.email}</p>
          <button className="inButtons" onClick={navigateUser} >Open in spotify <OpenInBrowser className="browsericon"/></button>
      </div>
      }
    </>
  ) : (
    <>
      <Login/>
    </>
  );
};

export default Profile;
