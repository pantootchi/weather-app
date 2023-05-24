import {weatherDOM} from './domFunctions';

// Initiate weather page
let geoCity = {
    "apiKey": "BGUmTfnlpwU522FmGwA3TpuNVc89j8bs",
    fetchCity: function(latitude, longitude) {
        fetch ("https://api.tomtom.com/search/2/reverseGeocode/" +
        latitude +
        "," +
        longitude +
        ".json?key=" +
        this.apiKey +
        "&radius=100"
        ).then((response) => response.json())
        .then((data) => weather.fetchWeather(data.addresses[0].address.municipality))
        .catch((error) => deniedAccess())
    }
}

function processCoords(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    geoCity.fetchCity(latitude, longitude);
}

function deniedAccess() {
    weather.fetchWeather("Denver");
}

// Fetch Coordinates
navigator.geolocation.getCurrentPosition(processCoords, deniedAccess)

let weather = {
    "apiKey": "754f57af387718693ecfb4a18e6c8a57",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => weatherDOM.displayWeather(data))
        .catch((error) => weatherDOM.displayError(error))

    },
    search: function () {
        this.fetchWeather(document.querySelector("#search-bar").value);

    }
}

export default weather;