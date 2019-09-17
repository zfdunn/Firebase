$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyDeViRGMkBzltU-hAd-zOCmZWWfnB70wOg",
        authDomain: "https://projectone-a0168.firebaseio.com/",

    };

// ---------------------------------------------
// initialize firebase
    firebase.initializeApp(firebaseConfig);
// ---------------------------------------------
// establish firebase connection
    var database = firebase.database().ref();
// ---------------------------------------------
// stored values
    var trainName = '';
    var destination = '';
    var trainTime = '';
    var frequency = 0;
    var minutesAway = 0;
    var nextArrival = '';
// ---------------------------------------------
// button click event
    $("#submit").on("click", function(event){
        event.preventDefault();
        console.log("click");
// ---------------------------------------------
// takes in the entered values, and adds to variables:
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("frequency").val().trim();
// ---------------------------------------------
// pushed data into database
        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP 
        };
        database.push(newTrain);
// ---------------------------------------------
//clears input fields
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#frequency").val("");
        return false;
    });
// ---------------------------------------------
// update list (borrowed code from classmate - start)
database.orderByChild("dateAdded").on("child_added", function(snapshot){
    var theTrainTime = snapshot.val().trainTime;
    var theTrainFrequency = snapshot.val().frequency;
    console.log(moment(snapshot.val().dateAdded).format("MM/DD/YY"));
// ---------------------------------------------
// calculate the next arrival time, and minutes away
    var firstTimeConverted = moment(theTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERNECE IN TIME: " + diffTime);
    console.log(frequency);
    var remainder = diffTime % theTrainFrequency;
    console.log(remainder);
    var minutesAway = theTrainFrequency - remainder;
    console.log("MINUTES UNTIL TRAIN: " + minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm A"));

    var theTrainTime = snapshot.val().trainName;
    var theDestination = snapshot.val().destination;
// ---------------------------------------------
// (borrowed code - end)
// ref for html to update UI
    $(".train-name-display").append("<td>", theTrainName);
    $(".destination-display").append("<td>", theDestination);
    $(".frequency-display").append("<td>", theTrainFrequency + "minutes");
    $(".next-arrival-display").append("<td>", moment(nextArrival).format("hh:mm A"));
    $(".minutes-away-display").append("<td>", minutesAway + "minutes");
    },
// ---------------------------------------------
// handle the errors
    function(errorObject){
        console.log("Errors handled: " +errorObject.code);
    });
});