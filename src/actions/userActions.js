//action.js
import axios from "axios";


const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'

export const login = (accessToken) => {
    return (dispatch) => {
        axios.get(`${SPOTIFY_API_BASE_URL}/me`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response)=>{
            const {display_name, email, images, id } = response.data;
            const user = {
                displayName: display_name,
                email,
                avatarUrl: images.length ? images[0]?.url: null,
                Id: id,
            };
            dispatch({type:'LOGIN_SUCCESS', payload: user})
        }).catch((error)=>{
            dispatch({type:'LOGIN_FAILURE', payload: error.message})
        })
    }
}

export const addSongId= (songId,songType) =>({
    type: "ADD_SONG_ID",
    payload: {songId, songType}
})

export const logout = () => {
    return {type: 'LOGOUT_SUCCESS',}
}