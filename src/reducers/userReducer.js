//reducer.js
const initialState = {
  user: null,
  songId: '',
  songType: '',
  error: null
};



export const userReducer = (state = initialState, action) => {

  switch (action.type){
    case "LOGIN_SUCCESS":
      return{
        ...state,
        user: action.payload,
        error: null
      }
      case "LOGIN_FAILURE":
      return{
        ...state,
        user: null,
        error: action.payload
      }
      case "LOGOUT_SUCCESS":
      return{
        ...state,
        user: null,
        error: null
      }
      case "ADD_SONG_ID":
      return{
        ...state,
        songId: action.payload.songId,
        songType: action.payload.songType
      }
      default:
        return state
  }
}
