//html elements
var startButton = document.getElementById("start_button");
var resetButton = document.getElementById("reset_button");
//work elements
var workMinutesCount = 25;
var workDiv = document.getElementById("work");
var workMinsDiv = document.getElementById("work_minutes");
var workSecsDiv = document.getElementById("work_seconds");
var workMinsUpButton = document.getElementById("minutes_work_up");
var workMinsDownButton = document.getElementById("minutes_work_down");
//break elements
var breakMinutesCount = 5;
var breakDiv = document.getElementById("break");
var breakMinsDiv = document.getElementById("break_minutes");
var breakSecsDiv = document.getElementById("break_seconds");
var breakMinsUpButton = document.getElementById("break_work_up");
var breakMinsDownButton = document.getElementById("break_work_down");

// var pause = false;
var hasReset = false;
var isRunning = false;

//event listeners
workMinsUpButton.addEventListener('click', function () {
    if(isRunning) return;
    workMinutesCount = increaseTime(workMinutesCount, workMinsDiv);
});

workMinsDownButton.addEventListener('click', function () {
    if(isRunning) return;
    workMinutesCount = decreaseTime(workMinutesCount, workMinsDiv);
});

breakMinsUpButton.addEventListener('click', function () {
    if(isRunning) return;
    breakMinutesCount = increaseTime(breakMinutesCount, breakMinsDiv);
});

breakMinsDownButton.addEventListener('click', function () {
    if(isRunning) return;
    breakMinutesCount = decreaseTime(breakMinutesCount, breakMinsDiv);
});

startButton.addEventListener('click', function() {
    if(isRunning) return
    startTimer(workMinutesCount, workMinsDiv, workSecsDiv, workDiv);
}, false);

resetButton.addEventListener('click', function() {
    resetTime(25, 5, "00");
}, false);

//helper functions
function getTime(minutes) {
    var time = new Date();
    return time.setMinutes(time.getMinutes() + minutes);
}

function decreaseTime(count, div) {
    if(count > 1){
        count--;
    }
    div.innerText = count;
    return count;
}

function increaseTime(count, div) {
    count++;
    div.innerText = count;
    return count;
}

function startTimer(minutes, minutesDiv, secondsDiv, div) {
    var countDownDate = getTime(minutes);
    hasReset = false;
    isRunning = true;

    var j = setInterval(function() {
                if (hasReset) {
                    clearInterval(j);
                    return;
                }

                var now = getTime(0);
                var distance = countDownDate - now;

                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                minutesDiv.innerHTML = minutes;
                secondsDiv.innerHTML = seconds;

                if (distance < 0) {
                    clearInterval(j);
                    div.innerHTML = "EXPIRED";

                    startTimer(breakMinutesCount, breakMinsDiv, breakSecsDiv, breakDiv);
                }
        }, 1000);
}

function resetTime(workMinutes, breakMinutes, seconds) {
    workMinsDiv.innerHTML = workMinutes;
    workSecsDiv.innerHTML = seconds;
    breakMinsDiv.innerHTML = breakMinutes;
    breakSecsDiv.innerHTML = seconds;
    workMinutesCount = workMinutes;
    breakMinutesCount = breakMinutes;
    hasReset = true;
    isRunning = false;
}
