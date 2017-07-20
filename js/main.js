//html elements
var startButton = document.getElementById("start_button");
var resetButton = document.getElementById("reset_button");
//work elements
var workMinutesCount = 25;
var workMinsDiv = document.getElementById("work_minutes");
var workSecsDiv = document.getElementById("work_seconds");
var workMinsUpButton = document.getElementById("minutes_work_up");
var workMinsDownButton = document.getElementById("minutes_work_down");
//break elements
var breakMinutesCount = 5;
var breakMinsDiv = document.getElementById("break_minutes");
var breakSecsDiv = document.getElementById("break_seconds");
var breakMinsUpButton = document.getElementById("break_work_up");
var breakMinsDownButton = document.getElementById("break_work_down");

var zeroStr = "0";
var counter=0;
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
    if(isRunning) return;
    startTimer(workMinutesCount, workMinsDiv, workSecsDiv);
}, false);

resetButton.addEventListener('click', function() {
    resetTime(25, 05, "00");
}, false);

//helper functions
function getTime(minutes) {
    var time = new Date();
    return time.setMinutes(time.getMinutes() + minutes);
}

function startTimer(minutes, minutesDiv, secondsDiv) {
    var countDownDate = getTime(minutes);
    counter++;
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

        if(minutes <= 9){
            var minutesStr = minutes+"";
            minutesDiv.innerHTML = zeroStr+minutesStr;
        }
        else{
            minutesDiv.innerHTML = minutes;
        }

        if(seconds <= 9){
            var secondsStr = seconds+"";
            secondsDiv.innerHTML = zeroStr+secondsStr;
        }else{
            secondsDiv.innerHTML = seconds;
        }

        if (distance < 0) {
            clearInterval(j);
            minutesDiv.innerHTML = "00";
            secondsDiv.innerHTML = "00";

            if(counter<2){
                startTimer(breakMinutesCount, breakMinsDiv, breakSecsDiv);
            }
        }
    }, 100);
}

function decreaseTime(count, div) {
    if(count > 1){
        count--;
    }
    if(count <= 9){
        var countStr = count+"";
        div.innerText = zeroStr+countStr;
    }else{
        div.innerText = count;
    }

    return count;
}

function increaseTime(count, div) {
    if(count <= 60){
        count++;
    }
    if(count <= 9){
        var countStr = count+"";
        div.innerText = zeroStr+countStr;
    }else{
        div.innerText = count;
    }

    return count;
}

function resetTime(workMinutes, breakMinutes, seconds) {
    hasReset = true;
    isRunning = false;
    var breakMinutesStr = breakMinutes+"";

    workMinsDiv.innerHTML = workMinutes;
    workSecsDiv.innerHTML = seconds;
    breakMinsDiv.innerHTML = zeroStr+breakMinutesStr;
    breakSecsDiv.innerHTML = seconds;
    workMinutesCount = workMinutes;
    breakMinutesCount = breakMinutes;
}
