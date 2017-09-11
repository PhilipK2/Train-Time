// var config = {
//     apiKey: "AIzaSyAHy9kHeJzTyeQXMHUTCw-p1M8D0SU4tcQ",
//     authDomain: "train-time-d8340.firebaseapp.com",
//     databaseURL: "https://train-time-d8340.firebaseio.com",
//     projectId: "train-time-d8340",
//     storageBucket: "train-time-d8340.appspot.com",
//     messagingSenderId: "225299747215"
// };
// firebase.initializeApp(config);

var db = firebase.database();

$("#submitBtn").on("click", function() {
    event.preventDefault();
    var name = $("#name").val().trim();
    var dest = $("#dest").val().trim();
    var time = $("#time").val().trim();
    var freq = $("#freq").val().trim();

    newVar = {
        name: name,
        destination: dest,
        time: time,
        frequency: freq
    }
    db.ref().push(newVar);
});

db.ref().on('child_added', function(snap) {
    console.log(snap.val());
    var newName = snap.val().name;
    var newRole = snap.val().destination;
    var newStart = snap.val().time;
    var newRate = snap.val().frequency;

    console.log(newName);
});