const currentTime = () => {
  const clockTime = document.querySelector(".clock-time");
  const markingSeconds = document.querySelector(".marking-seconds");

  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  hh = hh < 10 ? `0${hh}` : hh;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;

  const ssDegrees = (ss / 60) * 360;
  markingSeconds.style.transform = `rotate(${ssDegrees}deg)`;

  let time = `${hh}:${mm}:${ss}`;
  clockTime.innerText = time;
};

currentTime();
setInterval(currentTime, 1000);
// STOPWATCH SCRIPTS
const e_stopwatchTicker = document.getElementById("stopwatchTicker");
const e_lapTicker = document.getElementById("lapTicker");

const e_lapList = document.getElementById("lapList");
const e_resetButton = document.getElementById("resetButton");
const e_startButton = document.getElementById("startButton");
const e_lapButton = document.getElementById("lapButton");

var timerRunning = false;
var timerPaused = false;
var timerTime = 0;
var timer = null;
var timerFlags = [];

// The exact-to-millisecond precise time calculated from timestamps.
var timerTimePrecise = 0;
// The unix timestamp for when the timer started ticking.
// Is constantly modified and adjusted when paused/resumed so it is never really a true value.
// NOTE: Don't rely on this to get the real time the stopwatch started.
var timerStartTime = 0;
// The unix timestamp for when the timer was paused.
// Used to calculate the time delay and subtract to make sure the time calculations are perfect.
var timerPauseTime = 0;

function reprTime(ms) {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
  return `${String(d.getUTCMinutes()).padStart(2, "0")}:${String(
    d.getUTCSeconds()
  ).padStart(2, "0")}.${String(
    Math.round(d.getUTCMilliseconds() / 10)
  ).padStart(2, "0")}`;
}

function startTimer(startFromMs) {
  timer = setInterval(function () {
    e_stopwatchTicker.textContent = reprTime(timerTimePrecise);
    e_lapTicker.textContent = reprTime(timerTimePrecise - timerFlags.at(-1));
    timerTime += 10;

    timerTimePrecise = Date.now() - timerStartTime;
  }, 10);
  timerStartTime = startFromMs;
}

function pauseTimer() {
  timerPauseTime = Date.now();
  timerPaused = true;
  clearInterval(timer);
  timer = null;
}

function resumeTimer() {
  timerPaused = false;

  // Adjust the time to skip the pause -> resume delay.
  // new start time = old start time + difference between pause time and current time
  timerStartTime = timerStartTime + (Date.now() - timerPauseTime);
  startTimer(timerStartTime);

  timerPauseTime = 0;
}

function setFlag() {
  let _flagAt = timerTimePrecise;

  let _span1 = document.createElement("span");
  _span1.textContent = String(timerFlags.length).padStart(2, "0");

  let _span2 = document.createElement("span");
  _span2.textContent = reprTime(_flagAt);

  let _span3 = document.createElement("span");
  _span3.textContent = "+" + reprTime(_flagAt - timerFlags.at(-1));

  let _li = document.createElement("li");
  _li.classList.add("lap__item");
  _li.appendChild(_span1);
  _li.appendChild(_span2);
  _li.appendChild(_span3);

  e_lapList.prepend(_li);
  timerFlags.push(_flagAt);
}

e_startButton.addEventListener("click", () => {
  if (timerRunning) {
    if (timerPaused) {
      resumeTimer();
      e_startButton.firstChild.classList.remove("fa-play");
      e_startButton.firstChild.classList.add("fa-pause");
      e_resetButton.disabled = true;
    } else {
      pauseTimer();
      e_startButton.firstChild.classList.remove("fa-pause");
      e_startButton.firstChild.classList.add("fa-play");
      e_resetButton.disabled = false;
    }
  } else {
    timerRunning = true;
    timerTime = 0;
    timerTimePrecise = 0;
    timerFlags.push(0);
    e_startButton.firstChild.classList.remove("fa-play");
    e_startButton.firstChild.classList.add("fa-pause");
    startTimer(Date.now());
    e_resetButton.disabled = true;
  }
});

e_lapButton.addEventListener("click", () => {
  if (timerRunning) {
    setFlag();
  }
});

e_resetButton.addEventListener("click", () => {
  timerPaused = false;
  if (timerRunning) {
    timerRunning = false;
    clearInterval(timer);
  }
  timerTime = 0;
  timerTimePrecise = 0;
  timerFlags = [];
  e_lapList.innerHTML = "";
  e_stopwatchTicker.textContent = reprTime(0);
  e_lapTicker.textContent = reprTime(0);
});
// TIMER

// WORLD CLOCK
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
const hr = document.querySelector(".hr");
setInterval(function () {
  let time = new Date();
  let secs = time.getSeconds() * 6;
  let mins = time.getMinutes() * 6;
  let hrs = time.getHours() * 30;
  sec.style.transform = `rotateZ(${secs}deg)`;
  min.style.transform = `rotateZ(${mins}deg)`;
  hr.style.transform = `rotateZ(${hrs + mins / 12}deg)`;
});
let getIndiaTime = () => {
  indTime = document.getElementById("indtime").innerHTML =
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      timeStyle: "long",
      hourCycle: "h12",
    });
};
getIndiaTime();
setInterval(getIndiaTime, 1000);
let getSydneyTime = () => {
  document.getElementById("syntime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Australia/Sydney",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getSydneyTime();
setInterval(getSydneyTime, 1000);
let getLondonTime = () => {
  document.getElementById("lontime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Europe/London",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getLondonTime();
setInterval(getLondonTime, 1000);
let getYorkTime = () => {
  document.getElementById("yorktime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "America/New_york",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getYorkTime();
setInterval(getYorkTime, 1000);
let getAfricaTime = () => {
  document.getElementById("aftime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Africa/Algiers",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getAfricaTime();
setInterval(getAfricaTime, 1000);
let getAmericaTime = () => {
  document.getElementById("amtime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "America/Godthab",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getAmericaTime();
setInterval(getAmericaTime, 1000);
let gethkTime = () => {
  document.getElementById("hktime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Hong_Kong",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
gethkTime();
setInterval(gethkTime, 1000);
let getchicTime = () => {
  document.getElementById("chtime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "America/Chicago",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getchicTime();
setInterval(getchicTime, 1000);
let getDakTime = () => {
  document.getElementById("dktime").innerHTML = new Date().toLocaleString(
    "en-US",
    {
      timeZone: "America/North_Dakota/Center",
      timeStyle: "medium",
      hourCycle: "h12",
    }
  );
};
getDakTime();
setInterval(getDakTime, 1000);

// alarm
const currTime = document.querySelector("#alTime"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("#alBtn");

let alarmTime,
  isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
