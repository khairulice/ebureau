import firebase from "firebase";
import _ from 'lodash';
import { Observable } from 'rxjs';

export const guestRequestService = {
    list,
    reply,
    complete    
};

function list() {     
    const observable = Observable.create(function (observer) {
        var pRef = firebase.database().ref('GuestRequest');
        pRef.on('value', snapshot => {
           let requests = getData(snapshot.val());           
           observer.next(requests);
           //observer.complete();
        });       
      });
    return observable;    
}

function reply(id) {
    firebase.database().ref('GuestRequest').orderByKey().equalTo(id).on("child_added",
        function (snapshot) {
            firebase.database().ref().child('/GuestRequest/' + id)
                .set({ status: "Serving", service: snapshot.val().service, dt_created: snapshot.val().dt_created });

            let dt = new Date();
            let ga = firebase.database().ref('GuestRequestAction');
            ga.push({
                action: `Serving ${snapshot.val().service} soon.`,
                rqid: snapshot.key,
                dt_created: dt.toString()
            });
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

function complete(id){
    firebase.database().ref('GuestRequest').orderByKey().equalTo(id).on("child_added",
    function (snapshot) {

        firebase.database().ref().child('/GuestRequest/' + id)
            .set({ status: "Completed", service: snapshot.val().service, dt_created: snapshot.val().dt_created });

        //alertActions.success('Completed');
    });
}