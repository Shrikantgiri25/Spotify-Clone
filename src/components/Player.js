import React, { useEffect, useState } from "react";
import SpotifyPlayer, { usePlaybackState } from "react-spotify-web-playback";
//import { PlayArrow, Pause, FastForward, FastRewind,VolumeUp } from "@mui/icons-material";
import "./player.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addSongId } from "../actions/userActions";

const Player = () => {
  const songID = useSelector((state) => state.user.songId);
  const songType = useSelector((state) => state.user.songType);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceID, setDeviceID] = useState('')
  const accessToken = localStorage.getItem("accessToken");
  //console.log("SongID before UseEffect: ",songID)
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsPlaying(response.data.isplaying);
        setDeviceID(response.data.device.id)
        console.log("->",response)
        if(songID===''){
          dispatch(addSongId(response.data.item.album.id,'album'));
        }
        
      })
      .catch((error) => {
        console.log("Error while fetching PlaybackState", error);
      });
  }, [accessToken, songID]);
  return (
    <div className="player">
      <SpotifyPlayer
        token={accessToken}
        uris={songID ? [`spotify:${songType}:${songID}`]:[]}
        autoPlay={isPlaying}
        deviceID={deviceID}
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
};


export default Player;

// {currentTrack &&
//   currentTrack.data.item &&
//   currentTrack.data.item.album.images &&
//   currentTrack.data.item.album.images.length > 0 &&
//   currentTrack.data.item.album?.images[0]?.url && (
//     <img
//       src={currentTrack.data.item.album.images[0].url}
//       alt={currentTrack.data.item.album.name}
//       className="playersong-image"
//     />
//   )}
// {currentTrack &&
//   currentTrack.data.item &&
//   currentTrack.data.item.album.artists.length > 0 &&
//   currentTrack.data.item.album?.artists[0]?.name && (
//     <div className="player-info">
//       <h5 className="playersong-name">{currentTrack.data.item.name}</h5>
//       <p className="playersong-artist">
//         {currentTrack.data.item.album.artists[0].name}
//       </p>
//     </div>
//   )}
//   {
//     currentTrack && currentTrack.data.item && (
//       <div className="progress-bar">
//       <p style={{"display":"flex","color":"white","marginLeft":"-55px","marginTop":"12px","paddingRight":"8px"}}>{Math.floor(progress /60000)+'.'+((progress %60000)/1000).toFixed(0)}</p>
//     <input className="progress-bar-input"
//     type="range"
//     min={0}
//     max={currentTrack.data.item.duration_ms}
//     value={progress}
//     onChange={handleSeek}
//     />
//     <p style={{"display":"flex","color":"white","marginLeft":"14px","marginTop":"12px"}}>{Math.floor(currentTrack.data.item.duration_ms /60000)+'.'+((currentTrack.data.item.duration_ms %60000)/1000).toFixed(0)}</p>
//     <VolumeUp className="volume-symbol"/>
//     </div>
//     )
//   }
// <div className="buttons">
//   <button className="buttons-prev" onClick={handlePrev}>
//     <FastRewind />
//   </button>
//   <button className="buttons-play" onClick={handlePlay}>
//     {isplaying ? <Pause /> : <PlayArrow />}
//   </button>
//   <button className="buttons-next" onClick={handleNext}>
//     <FastForward />
//   </button>
// </div>
// <input
//   className="volume"
//   type="range"
//   min={0}
//   max={100}
//   onChange={(e) => handleVolume(e.target.value)}
// />
