//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useState , useEffect} from "react";
import "./Navbar.css";
import { addSongId } from "../actions/userActions";
import { PlayArrow } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("album");
  const access_token = localStorage.getItem("accessToken");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()
  const playSelectedSong = (id,type) => {
    dispatch(addSongId(id,type))
  }
  useEffect(()=>{
    const handleSearch = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: searchTerm,
            type: filter,
            limit: 10,
          },
        });
        
        if (filter !== "track") {
          const results = response.data.albums.items;
          setSearchResults(results);
        } else {
          const results = response.data.tracks.items;
          setSearchResults(results);
        }
      } catch (error) {
        console.log("Error Searching", error);
      }
    };
    handleSearch();
  },[searchTerm, filter])
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <input
          className="search"
            type="text"
            placeholder="Search for songs, artists, albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
            className="filters"
          >
            <option value="album">album</option>
            <option value="track">track</option>
          </select>
        </div>
      </nav>
      <div>
        {filter !== "album" ? (
          <div className="section">
            {
              searchResults.length > 0 && <h2 className="section-title">Top Results</h2>
            }
            <div className="list-cards">
              {searchResults.map((result) => (
                <div key={result.id} className="list-card">
                  {
                    result.album && result.album.images && result.album.images.length > 0 && result.album?.images[0]?.url && (
                    <img
                      src={result.album.images[0].url}
                      alt={result.name}
                      className="list-image"
                    />
                  )}
                <PlayArrow
                onClick={() => playSelectedSong(result.id,'track')}
                className="buttonplaysongs"
              />
                  <h3 className="list-name">{result.name}</h3>
                  {
                    result.artists && result.artists.length > 0 &&
                  <p className="list-description">
                    {result.artists[0].name}
                  </p>
                  }
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="section">
          {
            searchResults.length > 0 && <h2 className="section-title">Top Results</h2>
          }
            <div className="list-cards">
              {searchResults.map((result) => (
                <div key={result.id} className="list-card">
                  {result.images && result.images.length > 0 && (
                    <img
                      src={result.images[0]?.url}
                      alt={result.name}
                      className="list-image"
                    />
                  )}
                  <PlayArrow
                onClick={() => playSelectedSong(result.id,'album')}
                className="buttonplaysongs"
              />
                  <h3 className="list-name">{result.name}</h3>
                  {
                    result.artists && result.artists.length > 0 && (
                      <p className="list-description">
                    {result.artists[0].name}
                  </p>
                    )
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
