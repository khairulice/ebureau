//import config from 'config';
import firebase from "firebase";

export const loginService = {
    login,
    logout,
    signup
};


function login(username, password) {
    return firebase.auth().signInWithEmailAndPassword(username, password);
//     let promise = new Promise(function(resolve,reject){
//     firebase.auth().signInWithEmailAndPassword(username, password)
//     .then(resolve =>{
//         console.log(resolve);
//         return resolve(resolve);
//     },
//     error =>{
//         console.log(error.message);
//         return reject(error.message);
//     })        
//     .catch(function (error) {
//         console.log(error.message);
//         return reject(error.message);
//     });  
    
//     return promise;
// });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function signup(email, password) {

    var promise1 = new Promise(function (resolve, reject) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                resolve({ email: email });
            })
            .catch(function (error) {
                return reject(error.message);
            });

    });

    return promise1
}

