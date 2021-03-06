import { loginConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user,wallet:500 } : {};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginConstants.USER_SIGNUP:
      return {
        loggedIn: true,
        user: action.user,
        wallet:500
      };
      case loginConstants.USER_WALET:
      return {
        ...state,
        wallet: state.wallet+action.wallet
      };
      case loginConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case loginConstants.LOGIN_FAILURE:
      return {};
    case loginConstants.LOGOUT:
      return {};
    default:
      return state
  }
}