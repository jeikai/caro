import gameReducer from "./reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  game: gameReducer
})

export default rootReducer