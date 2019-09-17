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

});