import firebase from "firebase";
import _ from 'lodash';
import { Observable } from 'rxjs';

export const guestService = {
    list,
    messages,
    submitService    
};

function list() { 
    const observable = Observable.create(function (observer) {
        var pRef = firebase.database().ref('Service');
        pRef.on('value', snapshot => {
           let services = getData(snapshot.val());           
           observer.next(services);           
        });       
      });
    return observable;    
}

function messages() {

    const observable = Observable.create(function (observer) {
        var pRef = firebase.database().ref('GuestRequestAction');
        pRef.on('value', snapshot => {
           let services = getData(snapshot.val());           
           observer.next(services);           
        });       
      });
    return observable;    
}

function submitService(serviceId, userId)
{
        let dt=new Date();
        let fb = firebase.database().ref('GuestRequest');
        fb.push({
            service: serviceId,
            status: 'Open',
            gid: userId,
            dt_created: dt.toString() 
        });
}

function getData(values) {
    let objectsVal = values;
    let items = _(objectsVal)
        .keys()
        .map(itemKey => {
            let cloned = _.clone(objectsVal[itemKey]);
            cloned.key = itemKey;
            return cloned;
        })
        .value();
    return items;
}