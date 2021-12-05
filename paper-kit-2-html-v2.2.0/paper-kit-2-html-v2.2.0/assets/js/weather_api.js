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
let apiKey = "35022efb71ba6d400064d158d8238b4b";
// JavaScript source code
let weather = {
  apiKey: "35022efb71ba6d400064d158d8238b4b",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data.city;
    const { country } = data.city;
    document.querySelector(".city").innerText =
      "Weather in " + name + ", " + country;

    for (i = 0; i < 3; i++) {
      document.querySelectorAll("button.btn-primary")[1].style.display = "none";
      document.querySelector(".container-1").style.display = "none";
      document.querySelector(".container-2").style.display = "none";

      const { icon, description } = data.list[i].weather[0];
      const { temp, humidity } = data.list[i].main;
      const { speed } = data.list[i].wind;
      const { dt_txt } = data.list[i];
      let time = dt_txt.slice(11, 16);
      let date = new Date(dt_txt);

      let dateString = `${currentDay(date)}  ${dt_txt.slice(
        8,
        10
      )}/${dt_txt.slice(5, 7)}  ${time}`;
      document.querySelectorAll(".today")[i].innerText = dateString;

      document.querySelectorAll(".icon_1")[
        i
      ].src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.querySelectorAll(".description")[i].innerText = description;
      document.querySelectorAll(".temp")[i].innerText =
        Math.round(temp) + "\u00B0C";
      document.querySelectorAll(".humidity")[i].innerText =
        "Humidity " + humidity + "%";
      document.querySelectorAll(".wind")[
        i
      ].innerText = `Wind speed ${Math.round(speed)} m/s`;
    }

    document.querySelector(".weather").classList.remove("loading");
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    //console.log( this.fetchWeather(document.querySelector(".search-bar").value) ) ;
  },
};

/*________________________*/
document.querySelector(".search svg").addEventListener("click", function () {
  weather.search();
});
/*________________________*/

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      weather.search();
    }
  });
/*____________________*/

let showMore = {
  apiKey: "35022efb71ba6d400064d158d8238b4b",
  fetchNow: function (city, j) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayMore(data, j));
  },
  displayMore: function (data, j) {
    for (i = j; i < j + 3; i++) {
      const { icon, description } = data.list[i].weather[0];
      const { temp, humidity } = data.list[i].main;
      const { speed } = data.list[i].wind;
      const { dt_txt } = data.list[i];
      let time = dt_txt.slice(11, 16);
      let date = new Date(dt_txt);
      let dateString = `${currentDay(date)}  ${dt_txt.slice(
        8,
        10
      )}/${dt_txt.slice(5, 7)}  ${time}`;
      document.querySelectorAll(".today")[i].innerText = dateString;

      document.querySelectorAll(".icon_1")[
        i
      ].src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.querySelectorAll(".description")[i].innerText = description;
      document.querySelectorAll(".temp")[i].innerText =
        Math.round(temp) + "\u00B0C";
      document.querySelectorAll(".humidity")[i].innerText =
        "Humidity " + humidity + "%";
      document.querySelectorAll(".wind")[
        i
      ].innerText = `Wind speed ${Math.round(speed)} m/s`;
    }
  },
  search: function (j) {
    this.fetchNow(
      document
        .querySelector(".city")
        .innerHTML.split(",")[0]
        .split("Weather in ")[1],
      j
    );
    //console.log( this.fetchWeather(document.querySelector(".search-bar").value) ) ;
  },
};
/*____________________*/
document
  .querySelectorAll("button.btn-primary")[0]
  .addEventListener("click", function () {
    document.querySelector(".container-1").style.display = "block";
    showMore.search(parseInt(3));
    document.querySelectorAll("button.btn-primary")[1].style.display =
      "inline-block";
  });

document
  .querySelectorAll("button.btn-primary")[1]
  .addEventListener("click", function () {
    document.querySelector(".container-2").style.display = "block";

    showMore.search(parseInt(6));
  });
//wheather.fetchWeather("Oslo"); */

//let url = `api.openweathermap.org/data/2.5/forecast?q=Bergen&appid=${apiKey}`;
