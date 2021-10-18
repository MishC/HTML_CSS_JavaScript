function currentDate(now) {
  let day = now.getDay(); //Day of the week, number 0-6
  let month = now.getMonth(); //current month, number of 0-11
  let hours = now.getHours(); //hour, number of 0-24
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes(); //hour, number of 0-59
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayToday = now.getUTCDate();
  let dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekDay = dayWeek[day];
  let currentMonth = months[month];
  let time = hours + ":" + minutes;
  let placeDate = document.querySelector("ul.strip.strip1").firstElementChild;
  let suff = "";
  if (dayToday === 1) {
    suff = "st";
  } else if (dayToday === 2) {
    suff = "nd";
  } else if (dayToday === 3) {
    suff = "rd";
  } else {
    suff = "th";
  }
  return `${weekDay} ${dayToday}${suff} of ${currentMonth},
  ${time}`;
}
let now = new Date();
let placeDate = document.querySelector("ul.strip.strip1").firstElementChild;

placeDate.innerHTML = currentDate(now);
/******************************************/ ////
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//________________________________//
function currentDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  return currentDay;
}
/*____________________________________*/
function getTemperaturesForecast(lists, T, elementArr) {
  /*Args: 
  lists - array of objects;
  T - temperature (string);
  elementArr - arrays of HTML elements
  */
  let temperatures = [];
  lists.forEach(function (list, index) {
    if (list.dt_txt.slice(11, 13) === T) {
      temperatures.push(Math.round(list.main.temp));
    }
  });

  elementArr.forEach(function (element, index) {
    element.innerHTML = temperatures[index] + "°C";
  });
}
//*****//
function getIconsForecast(lists, T, elementArr) {
  /*Args: 
   lists - array of objects;
  T - temperature (string);
  elementArr - arrays of HTML elements
  */

  let icons = [];

  lists.forEach(function (list, index) {
    if (list.dt_txt.slice(11, 13) === T) {
      icons.push(list.weather[0].icon);
    }
  });
  elementArr.forEach(function (element, index) {
    element.src =
      "https://openweathermap.org/img/wn/" + icons[index] + "@2x.png";
  });
}
//*__________________________________*//
function getDayForecast(lists, T, elementArr, elementArr1) {
  /*Args: 
   lists - array of objects;
  T - temperature (string);
  elementArr - arrays of HTML elements for days;
  elementArr1 - arrays of HTML elements for dates;
  */

  let days = [];
  let dates = [];
  lists.forEach(function (list, index) {
    if (list.dt_txt.slice(11, 13) === T) {
      let dateUTC = list.dt_txt;
      let date = new Date(dateUTC);

      days.push(currentDay(date));

      let dateString = dateUTC.slice(8, 10) + "." + dateUTC.slice(5, 7) + ".";
      dates.push(dateString);
    }
  });

  elementArr.forEach(function (element, index) {
    element.innerHTML = days[index];
  });
  elementArr1.forEach(function (element, index) {
    element.innerHTML = dates[index];
  });
}
//*__________________________________*//
function cityNot(city, country) {
  if (country === " ") {
    document.querySelector("div.result").classList.add("display-none");
    const h1 = document.createElement("h1");
    h1.innerHTML = `The ${city} is not in our database`;
  }
}
/*__________________________________*/
function removeFails(temp) {
  if (typeof temp !== "undefined") {
    let fails = document.querySelectorAll("h3.fail");
    if (fails.length > 0) {
      fails.forEach((fail) => {
        fail.remove();
      });
    }
  }
}
//**________________________________*//
function showWeather(response) {
  //
  let temperature = Math.round(response.data.list[0].main.temp);
  removeFails(temperature);
  document.querySelector("#temp").innerHTML = `${temperature}`;

  //let city = response.data.city.name;
  //let country = response.data.city.country;
  //cityNot(city, country);
  document.querySelector(
    "span.city"
  ).innerHTML = `${response.data.city.name.toUpperCase()} (${
    response.data.city.country
  })`;
  let icon = response.data.list[0].weather[0].icon;
  let description = response.data.list[0].weather[0].description;
  description = capitalizeFirstLetter(description);
  document.querySelector("img.icon").src =
    "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector("h6.iconic").innerHTML = description;
  let precipitation = response.data.list[0].pop;
  //let humidity = response.data.list[0].main.humidity;
  let wind = Math.round(response.data.list[0].wind.speed);
  document.querySelector(
    "#precipitation"
  ).innerHTML = `Precipitation: ${precipitation} %`;
  /*document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;*/
  document.querySelector("#wind").innerHTML = `Wind: ${wind} m/s`;
  let forecast = document.querySelectorAll("h6>span.forecast");
  let forecastNight = document.querySelectorAll("h6>span.forecast-night");
  let dateUTC = response.data.list[0].dt_txt;
  let time = dateUTC.slice(11, 13);

  let lists = response.data.list;
  //console.table(lists);
  getTemperaturesForecast(lists, "12", forecast);
  getTemperaturesForecast(lists, "00", forecastNight);
  let iconsForecast = document.querySelectorAll("img.icon-forecast");
  getIconsForecast(lists, "12", iconsForecast);
  let dayForecast = document.querySelectorAll("h6.card-title");
  let dateForecast = document.querySelectorAll("h6>span.date");
  getDayForecast(lists, "12", dayForecast, dateForecast);
}

/*_________*/

/*************************/
function retrievePosition(position) {
  let apiKey = "35022efb71ba6d400064d158d8238b4b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
/*____________________________________________*/

/********************************/
function connectToAPI(event) {
  event.preventDefault();
  let cityHTML = document.querySelector("span.city");
  let city = cityHTML.innerHTML.match("^[^(]+")[0];
  //console.log(city);
  let apiKey = "35022efb71ba6d400064d158d8238b4b";
  let urlCity = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${apiKey}`;
  axios.get(urlCity).catch(function (error) {
    if (error.response.status === 404) {
      console.log("stop!");

      document.querySelector("div.result").style.display = "none";
      let h3 = document.createElement("h3");
      document.body.appendChild(h3);
      h3.className = "fail";
      h3.style.textAlign = "center";
      h3.innerHTML = `<br/>Fail: 404 <br/> Sorry, the city "${city}" is not in our database`;
    }
  });

  document.querySelector("div.result").style.display = "block";
  return axios.get(urlCity).then(showWeather);
}

/*Helping function*/
function showWeather2(response) {
  console.log(response.data.list[0].main.temp);
  console.log(response.data.city.name);
  console.log(response.data.list[0].weather[0].description);

  console.log(response.data.list[0]);
  console.log(response.data.list[0].dt_txt.slice(-8));
}
/*________________*/

/***********************/

/**********/
let searchCity = document.querySelector("form#searchBar");

function writeCity(event) {
  event.preventDefault();
  let cityHTML = document.querySelector("span.city");
  let type = document.querySelector("#type");

  cityHTML.innerHTML = type.value.toUpperCase();
  now = new Date();
  placeDate.innerHTML = currentDate(now);
}

searchCity.addEventListener("submit", writeCity);
searchCity.addEventListener("submit", connectToAPI);
/*

/*Change units*/
/*________*/
function currentTemp() {
  let currentTemp = document.querySelector("#temp").innerHTML.match(/-?\d+/)[0];
  //console.log(currentTemp);
  return currentTemp;
}
let initTemp = currentTemp();
let changedTemp = currentTemp();
/*__________**/
function compareTemp(initTemp) {
  return initTemp === changedTemp;
}
/**/
let unitCelsius = document.querySelector("#celsius-link");
let unitFahrenheit = document.querySelector("#farenheit-link");
function changeUnitstoFahrenheit(event) {
  event.preventDefault();

  if (compareTemp(initTemp) === true) {
    let temperatureF = Math.round((currentTemp() * 9) / 5 + 32);

    document.querySelector("#temp").innerHTML = `${temperatureF}`;
    unitCelsius.style.color = "#1ab2a8";
    unitFahrenheit.style.color = "#D67256";
    changedTemp = temperatureF;
  }
}
function changeUnitstoCelsius(event) {
  event.preventDefault();
  if (compareTemp(initTemp) === false) {
    let temperatureC = Math.round(((currentTemp() - 32) * 5) / 9);
    console.log(temperatureC);
    document.querySelector("#temp").innerHTML = `${temperatureC}`;
    unitCelsius.style.color = "#D67256";
    unitFahrenheit.style.color = "#1ab2a8";

    changedTemp = currentTemp();
    initTemp = currentTemp();
  }
}

unitFahrenheit.addEventListener("click", changeUnitstoFahrenheit);
unitCelsius.addEventListener("click", changeUnitstoCelsius);
