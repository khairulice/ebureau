import { loginConstants } from '../_constants';
import { loginService } from '../_services';
import { history } from '../_common';
import { alertActions } from '../_actions'

export const loginActions = {
    login,
    logout,
    signup
};

function login(email, password) {

    return dispatch => {
        dispatch(request({ email }));
        console.log(email);
        loginService.login(email, password)
            .then(
                user => {
                    console.log('Login passed');
                    dispatch(success(user));
                    history.push('/');

                },
                error => {
                    console.log('Login failed');
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));

                }
            );
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
