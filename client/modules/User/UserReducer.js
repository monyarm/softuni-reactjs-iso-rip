import { browserHistory } from "react-router";
// Auth Actions
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  ADD_USERS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  LOAD_USER_PROPS,
  DELETE_USER
} from "./UserActions";

// Initial State
const initialState = {
  data: null,
  users: null,
  deletedUser: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      browserHistory.push("/login");
      return {
        ...state
      };

    case REGISTER_FAILURE:
      return {
        ...state
      };

    case LOGIN_SUCCESS:
      browserHistory.push("/profile");
      return {
        ...state,
        data: action.user
      };

    case LOGIN_FAILURE:
      return {
        ...state
      };

    case LOGOUT:
      browserHistory.push("/login");
      return {
        ...state,
        data: null
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        data: action.user
      };

    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state
      };

    case LOAD_USER_PROPS:
      return {
        ...state,
        data: action.user
      };
    case DELETE_USER:
      return {
        deletedUser: action.user
      };
    default:
      return state;
  }
};

export const getUser = state => state.user.data;

// Export Reducer
export default UserReducer;
