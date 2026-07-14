// let fetchData = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Africa/Casablanca",);
// let fetchData = await fetch("https://ipwho.is/");
//   let fetchData = await fetch("https://api.ip.sb/geoip");

// async function apiQuote() {
//   let fetchData = await fetch(
//     "https://timeapi.io/api/Time/current/zone?timeZone=Africa/Casablanca",
//   );
//   //   let fetchData = await fetch("https://dummyjson.com/quotes/random");
//   let final = await fetchData.json();
//   console.log(final);
// }

// apiQuote();

let fullPage = document.querySelector(".full-page");

let bottomPage = document.querySelector(".bottom-page");

let quote = document.querySelector(".quote-page");
let imgRefresh = document.querySelector("img");
let authorQuote = document.querySelector(".author-quote");

let city_location = document.querySelector(".city-loca");
let country_location = document.querySelector(".country-loca");

let time_clock = document.querySelector(".time-clock");

let more_less = document.querySelector(".more-less");
let text_more_less = document.querySelector(".text-more");

let location_timezone = document.querySelector(".location-timezone");
let day_year = document.querySelector(".num-day-year");

let day_week = document.querySelector(".day-week");
let week_number = document.querySelector(".week-number");

let allTitles = document.querySelectorAll(".all-titles");
let allNum = document.querySelectorAll(".all-num");
// ----------change ------------
let changeTimes = document.querySelector(".change-times");
let imgSunMoon = document.querySelector(".img-moon-sun");

window.addEventListener("load", function () {
  async function quoted() {
    let fetchData = await fetch("https://dummyjson.com/quotes/random");
    let final = await fetchData.json();

    quote.textContent = final.quote;
    authorQuote.textContent = final.author;
  }

  quoted();

  async function ipAddress() {
    let fetchData = await fetch("https://api.ip.sb/geoip");
    let final = await fetchData.json();

    city_location.textContent = `${final.city},`;
    country_location.textContent = final.country_code;
    location_timezone.textContent = final.timezone;
  }

  ipAddress();
});

async function times() {
  let fetchData = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/London",
  );
  let final = await fetchData.json();

  //  =========== Making Time move auto ===========

  console.log(final);

  time_clock.textContent = final.hour + " : " + final.minute;
  function moveTime() {
    time_clock.textContent = final.hour + " : " + ++final.minute;
    if (final.hour === 23 && final.minute === 60) {
      time_clock.textContent = `${(final.hour = 0)} : ${(final.minute = 0)}`;
    }

    if (final.minute === 60) {
      time_clock.textContent = `${++final.hour} : ${(final.minute = 0)}`;
    }
  }

  let countTime = setInterval(moveTime, 60000);
  // ====================================
  if (final.hour < 12) {
    fullPage.classList.replace("theme-morning", "theme-night");
    bottomPage.classList.replace("color-morning", "color-night");

    imgSunMoon.classList.replace("img-sun", "img-moon");

    allTitles.forEach((ele) =>
      ele.classList.replace("color-title-morning", "color-title-night"),
    );

    allNum.forEach((ele) => ele.classList.replace("num-morning", "num-night"));
  } else if (final.hour > 18) {
    allTitles.forEach((ele) =>
      ele.classList.replace("color-title-morning", "color-title-night"),
    );

    imgSunMoon.classList.replace("img-sun", "img-moon");

    allNum.forEach((ele) => ele.classList.replace("num-morning", "num-night"));

    bottomPage.classList.replace("color-morning", "color-night");
    fullPage.classList.replace("theme-morning", "theme-night");
  } else {
    allTitles.forEach((ele) =>
      ele.classList.replace("color-title-night", "color-title-morning"),
    );

    allNum.forEach((ele) => ele.classList.replace("num-night", "num-morning"));

    fullPage.classList.replace("theme-night", "theme-morning");
    bottomPage.classList.replace("color-night", "color-morning");

    imgSunMoon.classList.replace(".img-moon", "img-sun");
  }
}

times();

// ================ change -- journey --- time ================================

fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/London")
  .then((first) => {
    let dataFet = first.json();
    return dataFet;
  })
  .then((get) => {
    if (get.hour >= 12 && get.hour < 17) {
      changeTimes.textContent = "GOOD AFTERNOON,";
    } else if (get.hour >= 18 && get.hour < 21) {
      changeTimes.textContent = "GOOD EVENING,";
    } else if (get.hour >= 21) {
      changeTimes.textContent = "GOOD NIGHT,";
    } else {
      changeTimes.textContent = "GOOD NIGHT,";
    }
  });

// ===========================================

imgRefresh.onclick = function () {
  async function quoted() {
    let fetchData = await fetch("https://dummyjson.com/quotes/random");
    let final = await fetchData.json();

    quote.textContent = final.quote;
    authorQuote.textContent = final.author;
  }

  quoted();
};

more_less.onclick = function () {
  if (fullPage.classList.contains("grid-temp-0")) {
    fullPage.classList.replace("grid-temp-0", "grid-temp-30");

    text_more_less.textContent = "LESS";

    quote.style.cssText = "opacity:0";
    authorQuote.style.cssText = "opacity:0";
  } else {
    fullPage.classList.replace("grid-temp-30", "grid-temp-0");
    text_more_less.textContent = "MORE";

    quote.style.cssText = "opacity:1";
    authorQuote.style.cssText = "opacity:1";
  }
};

let today = Temporal.Now.plainDateISO();

day_year.textContent = today.dayOfYear;
day_week.textContent = today.dayOfWeek;
week_number.textContent = today.weekOfYear;
