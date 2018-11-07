//import config from 'config';
import firebase from "firebase";

export const loginService = {
    login,
    logout,
    signup
};


function login(username, password) {

    var promise1 = new Promise(function (resolve, reject) {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {           
            return reject(error.message);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {               
                localStorage.setItem('user', JSON.stringify(user));
                return resolve({email:user.email});
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    });
    return promise1
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function signup(email, password) {

    var promise1 = new Promise(function (resolve, reject) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user=>{
        resolve({email:email});
    })
    .catch(function (error) {       
        return reject(error.message);
    });

});
       
    return promise1
}

