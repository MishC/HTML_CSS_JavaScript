// JavaScript source code
let weather = {
    apiKey : "35022efb71ba6d400064d158d8238b4b",
    fetchWeather: function (city) { fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city 
        + "&units=metric&APPID=" +this.apiKey)
        .then((response) => response.json())
        .then((data) =>this.displayWeather(data)); },
    displayWeather: function(data){
        const {name} = data;
        const {country} = data.sys;
        const {icon, description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed}  = data.wind;
        console.log(name, icon, description, speed, temp, humidity);
        document.querySelector(".city").innerText = "Wheather in " + name + ', ' + country;
        document.querySelector(".icon_1").src = "https://openweathermap.org/img/wn/" + icon  + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "\u00B0C";
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed " + speed + " km/h";


    },

search: function()  {
    this.fetchWeather(document.querySelector(".search-bar").value) ;
    console.log( this.fetchWeather(document.querySelector(".search-bar").value) ) ;
} 
} ;
document.querySelector(".search svg").addEventListener("click", function (){weather.search()}  );
document.querySelector(".search").addEventListener("keyup", function (event) {if (event.key="Enter"){weather.search()}
}  )   ;