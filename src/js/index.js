import '../style/style.scss';

let weather = {
    "apiKey": "754f57af387718693ecfb4a18e6c8a57",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp-num").innerText = temp;
        document.querySelector(".humidity").innerText = humidity;
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = speed;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector("#search-bar").value);

    }

}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector("#search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Denver");