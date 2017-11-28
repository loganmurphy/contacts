import * as firebase from "firebase";

var config = {
  authDomain: "contacts2-26302.firebaseapp.com",
  databaseURL: "https://contacts2-26302.firebaseio.com",
  projectId: "contacts2-26302",
  storageBucket: "",
  messagingSenderId: "1030620866608"
};

firebase.initializeApp(config);

var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);
    }
  });


export default database;
