import { combineReducers } from "redux";


const loginTokenReducer = (currentToken = null, action) => {
    if(action.type === 'SET_LOGIN_TOKEN'){
        return action.payload;
    }
    return currentToken;
};





export default combineReducers({
    loginToken : loginTokenReducer,

});