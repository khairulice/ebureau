import { loginConstants } from '../_constants';
import { loginService } from '../_services';
import { history } from '../_common';
import { alertActions } from '../_actions'
import firebase from "firebase";

export const loginActions = {
    login,
    logout,
    signup
};

function login(email, password) {

    return dispatch => {
        dispatch(request({ email }));           
        loginService.login(email, password)
        .then(resolve =>{
            console.log(resolve);
            dispatch(success({email}));
            localStorage.setItem('user', JSON.stringify({email}));
            history.push('/');
        },
        error =>{
            console.log(error.message);
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        })    
        .catch(function (error) {
            console.log(error.message);
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        });    

        // loginService.login(email, password)
        //     .then(
        //         user => {                   
        //             dispatch(success(user));
        //             history.push('/');

        //         },
        //         error => {                    
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));

        //         }
        //     );
    };

    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}

function logout() {
    loginService.logout();
    return { type: loginConstants.LOGOUT };

}

function signup(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        loginService.signup(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                    console.log('Signup success');
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: loginConstants.USER_SIGNUP, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}
