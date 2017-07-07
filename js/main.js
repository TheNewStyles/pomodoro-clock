var startButton = document.getElementById("start_button");

var workMinutesCount = 25;
var workMinsDiv = document.getElementById("work_minutes");
var workSecsDiv = document.getElementById("work_seconds");
var workMinsUpButton = document.getElementById("minutes_work_up");
var workMinsDownButton = document.getElementById("minutes_work_down")

var breakMinutesCount = 5;
var breakMinsDiv = document.getElementById("break_minutes");
var breakSecsDiv = document.getElementById("break_seconds");
var breakMinsUpButton = document.getElementById("break_work_up");
var breakMinsDownButton = document.getElementById("break_work_down");




workMinsUpButton.addEventListener('click', function () {
    workMinutesCount++;
    workMinsDiv.innerText = workMinutesCount;
});

workMinsDownButton.addEventListener('click', function () {
    workMinutesCount--;
    workMinsDiv.innerText = workMinutesCount;
});

breakMinsUpButton.addEventListener('click', function () {
    breakMinutesCount++;
    breakMinsDiv.innerText = breakMinutesCount;
});

breakMinsDownButton.addEventListener('click', function () {
    breakMinutesCount--;
    breakMinsDiv.innerText = breakMinutesCount;
});

function getTime(minutes) {
    return new Date().setMinutes(minutes);
}

startButton.addEventListener('click', function() {
    var countDownDate = getTime(workMinutesCount);

    // Update the count down every 1 second
    var x = setInterval(function() {
        var now = new Date().setMinutes(0);
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        workMinsDiv.innerHTML = minutes;
        workSecsDiv.innerHTML = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            // clearInterval(x);
            // timer.innerHTML = "EXPIRED";

            var j = setInterval(function() {
                var now = new Date().setMinutes(0);
                var distance = countDownDate - now;

                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                breakMinsDiv.innerHTML = minutes;
                breakSecsDiv.innerHTML = seconds;

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(j);
                    timer.innerHTML = "EXPIRED";


                }
            }, 1000);

        }
    }, 1000);
}, false);


