var timer = document.getElementById("timer");
var startButton = document.getElementById("start");
var startTime = new Date().setMinutes(25);

timer.innerHTML = Math.floor((startTime % (1000 * 60 * 60)) / (1000 * 60)) + "m " + Math.floor((startTime % (1000 * 60)) / 1000) + " s";


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
        timer.innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            timer.innerHTML = "EXPIRED";
        }
    }, 1000);
}, false);


