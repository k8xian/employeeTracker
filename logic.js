$( document ).ready(function() {
    console.log("I'm ready!");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCDK1_MkP-Bk7sJ3yrOlwqvkcTWQHytAvs",
        authDomain: "timestamp-ffd7a.firebaseapp.com",
        databaseURL: "https://timestamp-ffd7a.firebaseio.com",
        projectId: "timestamp-ffd7a",
        storageBucket: "timestamp-ffd7a.appspot.com",
        messagingSenderId: "489967844923"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    $("#button-input").on("click", function(event){
    event.preventDefault();

        var name = $("#name-input").val().trim();
        var role = $("#role-input").val().trim();
        var startDate = $("#startDate-input").val().trim();
        var monthlyRate = $("#monthlyRate-input").val().trim();

        console.log(name + role + startDate + monthlyRate);
        
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#employee-form")[0].reset();
    });


    database.ref().on("child_added", function(childSnapshot) {

        var childName = childSnapshot.val().name;
        var childRole = childSnapshot.val().role;
        var childStart = childSnapshot.val().startDate;
        var childRate = childSnapshot.val().monthlyRate;

        console.log("this is from the firebase: " +  childName);
        console.log("this is from the firebase: " + childRole);
        console.log("this is from the firebase: " + childStart);
        console.log("this is from the firebase: " + childRate);

        //moment.js business
        var dateFormat = "YYYY-MM-DD";
        var convertedDate = moment(childStart, dateFormat);
        console.log(convertedDate);

        var startDateConverted = moment(convertedDate).format("MM/DD/YYYY");

        var timeEmployed = moment().diff(moment(convertedDate, "X"), "months");
        console.log("has been employed for: " + timeEmployed + "months");

        var totalEarned = timeEmployed * childRate;
        console.log("has earned " + totalEarned);

        /// syntax is variable  = moment().diff(moment(startDateVariable, "X"), "months");

        var newRow = $("<tr>");
        var newName = $("<td>").attr("data-name", childName).text(childName);
        var newRole = $("<td>").attr("data-name", childRole).text(childRole);
        var newStart = $("<td>").attr("data-name", startDateConverted).text(startDateConverted);
        var newRate = $("<td>").attr("data-name", childRate).text("$ " + childRate);



        var newMonth = $("<td>").text(timeEmployed + " months");
        var newSalary = $("<td>").text("$ " + totalEarned);

        newRow.append(newName,newRole, newStart, newMonth, newRate, newSalary);
        $("#table-body").append(newRow);

    });



});