const apiKey = "&appid=3da17d925543f175c446b083ac7270df";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";
const forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q="

var searchCity = document.querySelector(".search input");
var searchButton = document.querySelector(".search button");
var cityHistoryEl = document.getElementById("history")
var cityHistoryList = []

async function getCurrentWeather(city){
    const respone1 = await fetch (currentWeatherUrl + city + apiKey);
    var data = await respone1.json();
    console.log(data)

    document.querySelector(".search-term").innerHTML = data.name;
    document.querySelector(".current-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    document.querySelector(".current-temperature").innerHTML = "Temperature: " + data.main.temp + "F";
    document.querySelector(".current-wind").innerHTML = "Wind: " + data.wind.speed + " MPH";
    document.querySelector(".current-humidity").innerHTML = "Humidity: " + data.main.humidity + "%"
}

const displayWeather = document.getElementById("#current-weather")

async function getForecastWeather(city){
    const respone2 = await fetch (forecastWeatherUrl + city + apiKey);
    var data = await respone2.json();
    console.log(data)

    document.querySelector(".day1-date").innerHTML = dayjs(data.list[4].dt_txt).format("MM-DD-YYYY")
    document.querySelector(".day2-date").innerHTML = dayjs(data.list[12].dt_txt).format("MM-DD-YYYY")
    document.querySelector(".day3-date").innerHTML = dayjs(data.list[20].dt_txt).format("MM-DD-YYYY")
    document.querySelector(".day4-date").innerHTML = dayjs(data.list[28].dt_txt).format("MM-DD-YYYY")
    document.querySelector(".day5-date").innerHTML = dayjs(data.list[36].dt_txt).format("MM-DD-YYYY")

    document.querySelector(".day1-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png")
    document.querySelector(".day2-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png")
    document.querySelector(".day3-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[20].weather[0].icon + ".png")
    document.querySelector(".day4-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png")
    document.querySelector(".day5-icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[36].weather[0].icon + ".png")


    document.querySelector(".day1-temperature").innerHTML = "Temp: " + data.list[4].main.temp + "F"
    document.querySelector(".day2-temperature").innerHTML = "Temp: " + data.list[12].main.temp + "F"
    document.querySelector(".day3-temperature").innerHTML = "Temp: " + data.list[20].main.temp + "F"
    document.querySelector(".day4-temperature").innerHTML = "Temp: " + data.list[28].main.temp + "F"
    document.querySelector(".day5-temperature").innerHTML = "Temp: " + data.list[36].main.temp + "F"

    document.querySelector(".day1-wind").innerHTML = "Wind: " + data.list[4].wind.speed + " MPH";
    document.querySelector(".day2-wind").innerHTML = "Wind: " + data.list[12].wind.speed + " MPH";
    document.querySelector(".day3-wind").innerHTML = "Wind: " + data.list[20].wind.speed + " MPH";
    document.querySelector(".day4-wind").innerHTML = "Wind: " + data.list[28].wind.speed + " MPH";
    document.querySelector(".day5-wind").innerHTML = "Wind: " + data.list[36].wind.speed + " MPH";

    document.querySelector(".day1-humidity").innerHTML = "Humidity: " + data.list[4].main.humidity + "%"
    document.querySelector(".day2-humidity").innerHTML = "Humidity: " + data.list[12].main.humidity + "%"
    document.querySelector(".day3-humidity").innerHTML = "Humidity: " + data.list[20].main.humidity + "%"
    document.querySelector(".day4-humidity").innerHTML = "Humidity: " + data.list[28].main.humidity + "%"
    document.querySelector(".day5-humidity").innerHTML = "Humidity: " + data.list[36].main.humidity + "%"
}

searchButton.addEventListener("click", () =>{
    getCurrentWeather(searchCity.value)
    getForecastWeather(searchCity.value)
    if (cityHistoryList.length < 10){
        cityHistoryList.unshift(searchCity.value)
    } else {
        cityHistoryList.length = cityHistoryList.length-1;
        cityHistoryList.unshift(searchCity.value)
    }
    cityHistory()
});

function cityHistory() {
    cityHistoryEl.innerHTML = "";
    for (let i = 0; i < cityHistoryList.length; i++) {
      const list = document.createElement("button");
      list.setAttribute("id",cityHistoryList[i],);
      cityHistoryEl.appendChild(list);
      const container = document.getElementById(cityHistoryList[i]);
      container.setAttribute("value",cityHistoryList[i]);
      container.setAttribute("class", "btn");
      container.textContent = cityHistoryList[i];
      container.addEventListener("click", function(event){
      const city = event.target.value;
      getCurrentWeather(city);
      getForecastWeather(city);
      })
    }
  }
  function writeLocalStorage(weatherHistory, cityHistoryList) {
    //Function to write to LocalStorage
    //Validation if the passed variable is an object for storageObject
    if(typeof cityHistoryList !== 'object') { console.log("writeLocalStorage: Invalid type submitted."); return }
      localStorage.setItem(weatherHistory, JSON.stringify(cityHistoryList))
  }
