var startButton = document.getElementById("start");
var minutesDiv = document.getElementById("minutes");
var secondsDiv = document.getElementById("seconds");
var minutesUp = document.getElementById("minutes_work_up");
var minutesDown = document.getElementById("minutes_work_down");
var secondsUp = document.getElementById("minutes_break_up");
var secondsDown = document.getElementById("minutes_break_down");

var minutesCount = 25;

minutesUp.addEventListener('click', function () {
    minutesCount++;
    minutesDiv.innerText = minutesCount;
});

minutesDown.addEventListener('click', function () {
    minutesCount--;
    minutesDiv.innerText = minutesCount;
});

startButton.addEventListener('click', function() {
    // Set the date we're counting down to
    var countDownDate = new Date().setMinutes(25);



    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().setMinutes(0);

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        minutesDiv.innerHTML = minutes;
        secondsDiv.innerHTML = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            timer.innerHTML = "EXPIRED";
        }
    }, 1000);
}, false);


