            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyAHy9kHeJzTyeQXMHUTCw-p1M8D0SU4tcQ",
                authDomain: "train-time-d8340.firebaseapp.com",
                databaseURL: "https://train-time-d8340.firebaseio.com",
                projectId: "train-time-d8340",
                storageBucket: "train-time-d8340.appspot.com",
                messagingSenderId: "225299747215"
            };
            firebase.initializeApp(config);
            var db = firebase.database();

            $("#submitBtn").on("click", function() {
                event.preventDefault();
                var name = $("#name").val().trim();
                var dest = $("#dest").val().trim();
                var time = $("#time").val().trim(); // "DD/MM/YY").format("X");
                var freq = $("#freq").val().trim();

                //creating object from user input
                newVar = {
                    name: name,
                    destination: dest,
                    time: time,
                    frequency: freq
                };
                //uploads to db
                db.ref().push(newVar);

                //clearing textboxes
                $("#name").val("");
                $("#dest").val("");
                $("#time").val("");
                $("#freq").val("");
            });

            db.ref().on('child_added', function(snap) {
                console.log(snap.val());
                var newName = snap.val().name;
                var newDest = snap.val().destination;
                var newTime = snap.val().time;
                var newFreq = snap.val().frequency;

                //current moment test
                var now = moment();
                console.log(now);

                var tFrequency = newFreq;

                //input of first train time
                var firstTime = newTime;
                // console.log(firstTime);
                var firstTimeConvert = moment(firstTime, "hh:mm");
                console.log(firstTimeConvert);
                //current time
                var currentTime = moment();
                console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
                //diff between times
                var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
                console.log("DIFFERENCE IN TIME: " + diffTime);
                //time until next train
                var tRemainder = diffTime % tFrequency;
                console.log(tRemainder);
                //Minute Until Train
                var tMinutesUntill = tFrequency - tRemainder;
                console.log("MINUTES TILL TRAIN: " + tMinutesUntill);
                //next train
                var nextTrain = moment().add(tMinutesUntill, "minutes");
                console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
                //formatting next train
                nextTrainConvert = moment(nextTrain).format("hh:mm");

                //pushes to the table
                $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDest + "</td><td>" +
                    newFreq + "</td><td>" + nextTrainConvert + "</td><td>" + tMinutesUntill + "</td></tr>");
            });