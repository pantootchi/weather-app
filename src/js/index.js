import '../style/style.scss';

// Weather object
let weather = {
    "apiKey": "754f57af387718693ecfb4a18e6c8a57",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => this.displayError())

    },
    displayWeather: function(data) {
        document.querySelector(".not-found").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp-num").innerText = temp;
        document.querySelector(".temp-unit"). innerText = "°C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".description").innerText = description;
        document.querySelector(".wind").innerText = speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"
    },
    displayError: function() {
        const invalidCity = document.querySelector('#search-bar').value;
        document.querySelector(".not-found").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector('.invalid').innerText = `"${invalidCity}" is an invalid location. Try again.`;
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

// Celsius and Farenheight Toggle Coverter
document.querySelector(".temp").addEventListener("click", function () {
    let tempUnit = document.querySelector(".temp-unit").innerText;
    let tempNum = document.querySelector(".temp-num").innerText;

    const newUnits = convertUnit(tempUnit, tempNum);

    document.querySelector(".temp-unit").innerText = newUnits.tempUnit;
    document.querySelector(".temp-num").innerText = newUnits.newTemp;
})

const roundToHundredth = (value) => {
    return Number(value.toFixed(2));
  };

function convertUnit (tempUnit, tempNum) {
    let newTemp = 0;
    if (tempUnit == "°C") {
        newTemp = roundToHundredth(tempNum * (9/5) + 32);
        tempUnit = "°F"
    } else {
        newTemp = roundToHundredth((5/9) * (tempNum - 32));
        tempUnit = "°C"
    }

    return {newTemp, tempUnit};
}


