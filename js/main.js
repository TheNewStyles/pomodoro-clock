"use strict";

//html elements
const startButton = document.getElementById("start_button");
const resetButton = document.getElementById("reset_button");
//work elements
let workMinutesCount = 25;
const workMinsDiv = document.getElementById("work_minutes");
const workSecsDiv = document.getElementById("work_seconds");
const workMinsUpButton = document.getElementById("minutes_work_up");
const workMinsDownButton = document.getElementById("minutes_work_down");
//break elements
let breakMinutesCount = 5;
const breakMinsDiv = document.getElementById("break_minutes");
const breakSecsDiv = document.getElementById("break_seconds");
const breakMinsUpButton = document.getElementById("break_work_up");
const breakMinsDownButton = document.getElementById("break_work_down");

const zeroStr = "0";
let counter = 0;
let hasReset = false;
let isRunning = false;

//event listeners
workMinsUpButton.addEventListener("click", () => {
    if (isRunning) return;
    workMinutesCount = increaseTime(workMinutesCount, workMinsDiv);
});

workMinsDownButton.addEventListener("click", () => {
    if (isRunning) return;
    workMinutesCount = decreaseTime(workMinutesCount, workMinsDiv);
});

breakMinsUpButton.addEventListener("click", () => {
    if (isRunning) return;
    breakMinutesCount = increaseTime(breakMinutesCount, breakMinsDiv);
});

breakMinsDownButton.addEventListener("click", () => {
    if (isRunning) return;
    breakMinutesCount = decreaseTime(breakMinutesCount, breakMinsDiv);
});

startButton.addEventListener("click", () => {
    if (isRunning) return;
    startTimer(workMinutesCount, workMinsDiv, workSecsDiv);
}, false);

resetButton.addEventListener("click", () => {
    resetTime(25, 5, "00");
}, false);

//helper functions
function getTime (minutes) {
    const time = new Date();
    return time.setMinutes(time.getMinutes() + minutes);
}

function startTimer (minutes, minutesDiv, secondsDiv) {

    const countDownDate = getTime(minutes);
    counter++;
    hasReset = false;
    isRunning = true;

    const interval = setInterval(() => {

        if (hasReset) {
            clearInterval(interval);
            return;
        }

        const now = getTime(0);
        const distance = countDownDate - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (minutes <= 9) {
            const minutesStr = `${minutes}`;
            minutesDiv.innerHTML = zeroStr + minutesStr;
        } else {
            minutesDiv.innerHTML = minutes;
        }

        if (seconds <= 9) {
            const secondsStr = `${seconds}`;
            secondsDiv.innerHTML = zeroStr + secondsStr;
        } else {
            secondsDiv.innerHTML = seconds;
        }

        if (distance < 0) {
            clearInterval(interval);
            minutesDiv.innerHTML = "00";
            secondsDiv.innerHTML = "00";

            if (counter < 2) {
                startTimer(breakMinutesCount, breakMinsDiv, breakSecsDiv);
            }
        }
    }, 100);

}

function decreaseTime (count, div) {
    if (count > 1) {
        count--;    
    }
    if (count <= 9) {
        const countStr = `${count}`;
        div.innerText = zeroStr + countStr;    
    } else {
        div.innerText = count;    
    }
    return count;
}

function increaseTime (count, div) {
    if (count <= 60) {
        count++;    
    }
    if (count <= 9) {
        const countStr = `${count}`;
        div.innerText = zeroStr + countStr;    
    } else {
        div.innerText = count;    
    }
    return count;
}

function resetTime (workMinutes, breakMinutes, seconds) {

    hasReset = true;
    isRunning = false;
    const breakMinutesStr = `${breakMinutes}`;

    workMinsDiv.innerHTML = workMinutes;
    workSecsDiv.innerHTML = seconds;
    breakMinsDiv.innerHTML = zeroStr + breakMinutesStr;
    breakSecsDiv.innerHTML = seconds;
    workMinutesCount = workMinutes;
    breakMinutesCount = breakMinutes;

}
