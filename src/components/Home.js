import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import SideBar from "./SideBar.js";
import { ReactComponent as Bell } from "../bell.svg";
import Player from "./Player.js";
import { PlayArrow } from "@mui/icons-material";
import { addSongId } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [thisWeekSongs, setThisWeekSongs] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllPlaylists, setShowAllPlaylist] = useState(false);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const playSelectedSong = (id, type) => {
    dispatch(addSongId(id, type));
  };

  useEffect(() => {
    // Fetch this week's songs
    axios
      .get("https://api.spotify.com/v1/browse/new-releases?limit=11", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setThisWeekSongs(response.data.albums.items);
        //console.log("songs-",response);
      })
      .catch((error) => {
        console.log("Error fetching this week's songs:", error);
      });

    // Fetch featured playlists
    axios
      .get("https://api.spotify.com/v1/browse/featured-playlists?limit=11", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFeaturedPlaylists(response.data.playlists.items);
        //console.log(response);
      })
      .catch((error) => {
        console.log("Error fetching featured playlists:", error);
      });
    //localStorage.setItem('accessToken',accessToken)
    //console.log("homepage access-token",accessToken)
  }, [accessToken]);
  const toggleShowAllSongs = () => {
    setShowAllSongs(!showAllSongs);
  };
  const toggleShowAllPlaylists = () => {
    setShowAllPlaylist(!showAllPlaylists);
  };
  return accessToken ? (
    <>
    <div className="main">
      <div className="section">
        <div className="home-container">
          <Bell className="bell" />
          <img
            className="profile"
            src="https://th.bing.com/th/id/OIP.GjSI2vNmmn8Sbr3wYcJH5AAAAA?pid=ImgDet&rs=1"
            alt="userprofile"
          />
          <h1 className="greeter">Good Evening!</h1>
          <h5 className="sectiontitle">This Week's New Songs</h5>
          {!showAllSongs && (
            <button className="see-all-songs" onClick={toggleShowAllSongs}>
              See All
            </button>
          )}
          {showAllSongs && (
            <button className="see-all-songs" onClick={toggleShowAllSongs}>
              See Less
            </button>
          )}
        </div>
        <div className="song-cards">
          {thisWeekSongs
            .slice(0, showAllSongs ? thisWeekSongs.length : 3)
            .map((song) => (
              <div key={song.id} className="song-card">
                <img
                  src={song.images[0].url}
                  alt={song.name}
                  className="song-image"
                />
                <PlayArrow
                  onClick={() => playSelectedSong(song.id, "album")}
                  className="buttonplaysongs"
                />
                <h3 className="song-name">{song.name}</h3>
                <p className="song-artist">{song.artists[0].name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="section">
      <div className="home-container">  
      <h5 className="sectiontitle">Featured Playlists</h5>
        {!showAllPlaylists && (
          <button
            className="see-all-playlists"
            onClick={toggleShowAllPlaylists}
          >
            See All
          </button>
        )}
        {showAllPlaylists && (
          <button
            className="see-all-playlists"
            onClick={toggleShowAllPlaylists}
          >
            See Less
          </button>
        )}
        </div>
        <div className="playlist-cards">
          {featuredPlaylists
            .slice(0, showAllPlaylists ? featuredPlaylists.length : 3)
            .map((playlist) => (
              <div key={playlist.id} className="playlist-card">
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="playlist-image"
                />
                <PlayArrow
                  onClick={() => playSelectedSong(playlist.id, "playlist")}
                  className="buttonplay"
                />
                <h3 className="playlist-name">{playlist.name}</h3>
                <p className="playlist-description">{playlist.description}</p>
              </div>
            ))}
        </div>
      </div>
      </div>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default Home;
