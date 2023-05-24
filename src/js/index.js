import '../style/style.scss';
import {convertUnit} from './domFunctions';
import weather from './apiFunctions';

// Inputting location
document.querySelector(".search button").addEventListener("click", function () {
    if (document.querySelector('#search-bar').value) weather.search();
})

document.querySelector("#search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter" && document.querySelector('#search-bar').value) {
        weather.search();
    }
})

  
// Celsius and Farenheight Toggle Coverter
document.querySelector(".temp").addEventListener("click", function () {
    let tempUnit = document.querySelector(".temp-unit").innerText;
    let tempNum = document.querySelector(".temp-num").innerText;

    const newUnits = convertUnit(tempUnit, tempNum);

    document.querySelector(".temp-unit").innerText = newUnits.tempUnit;
    document.querySelector(".temp-num").innerText = newUnits.newTemp;
})
