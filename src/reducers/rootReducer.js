import {userReducer} from "./userReducer";
import { combineReducers,  } from "redux";

const rootReducers = combineReducers({
    user: userReducer,
})
export default rootReducers;