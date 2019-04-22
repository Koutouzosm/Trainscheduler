  $(document).ready(function () {

    var config = {
      apiKey: "AIzaSyCWyauo6wbekRUaAOEWN5IaR-79G1nzpwc",
      authDomain: "classwork-5e2fb.firebaseapp.com",
      databaseURL: "https://classwork-5e2fb.firebaseio.com",
      projectId: "classwork-5e2fb",
      storageBucket: "classwork-5e2fb.appspot.com",
      messagingSenderId: "569966249545"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
    
    //add on click event to prevent page refresh and used jQuery to get the values from the input fields and store them in variables
    $("#add-train-btn").on("click", function (event) {
      event.preventDefault()
      var trainInput = $("#train-name-input").val().trim();
      var destInput = $("#destination-input").val().trim();
      var firstTrain = moment($("#first-scheduled").val().trim(), "hh:mm").format("hh:mm");
      var frequency = $("#frequency").val().trim();
  
      //told firebase what the object should look like
  
      var newTrain = {
        name: trainInput,
        destination: destInput,
        first: firstTrain,
        frequency: frequency
      };
  
      //pushed the info to firebase
  
      database.ref().push(newTrain);
  
  
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-scheduled").val("");
      $("#frequency").val("");
    });
  
    //reference the dattabase for the snapshot of the object to later append it to the html. 
  
    database.ref().on("child_added", function (childSnapshot) {
  
      var trainInput = childSnapshot.val().name;
      var destInput = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().first;
      var frequency = childSnapshot.val().frequency;
  
  
      var firstTrainFormat = moment(firstTrain, "hh:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTrainFormat), "minutes"); 
      var tRemainder = diffTime % frequency;
      var tMinutesTillTrain = frequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
      var newRow = $("<tr>").append(
        $("<td>").text(trainInput),
        $("<td>").text(destInput),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
      );
  
      $("tbody").append(newRow);
  
    })
  
  
  });
  