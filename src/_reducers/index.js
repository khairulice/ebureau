import { combineReducers } from 'redux';
import { loginReducer } from './LoginReducer';
import { alert } from './AlertReducer';
import { guestRequestReducer } from './GuestRequestReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'


const rootReducer = combineReducers({
    loginReducer,
    alert,
    guestRequestReducer,
    toastr: toastrReducer
});

export default rootReducer;