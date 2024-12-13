// now we're gonna work on the logic and interacte with the weather API
// initiate every Element var:
const img = document.querySelector(".js-img");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const windSpeed = document.querySelector(".number.wind-speed");
const humidity = document.querySelector(".number.humidity");

const invalidCityMessage = document.createElement("p");

// let get the entered city here:
const searchBarElement = document.querySelector('.search-bar-container');
const cityEntered = document.querySelector(".js-search-field");
// in order to do that we need to see if the search btn is clicked
let apiCity = "jijel";
// and return the value entered:
const searchBtn = document.querySelector(".fa-solid.fa-magnifying-glass.js-search-btn");

searchBtn.addEventListener('click', () => {
  // remove red-message if applicable:
  if (invalidCityMessage.textContent) invalidCityMessage.textContent = '';

  validateCity();
  // get weather info by city name
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=72de38e7cd26d974c0a35ac0bae2f61a`)
    .then(response => response.json())
    .then(data => {
      if (data.message === "city not found") {
        // let handle if the user enter a wrong city:
        invalidCityMessage.classList.add("red-message");
        invalidCityMessage.textContent = `city not found`;
        searchBarElement.insertAdjacentElement('afterend', invalidCityMessage);
      } else {
        // let diplay some info on the weather card
        // city 
        console.log(data);
        city.textContent = data.name;
        //temp
        temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        //humidity
        humidity.innerHTML = `<p>${data.main.humidity} % <br><span>Humidity</span></p>`;
        //wind speed
        windSpeed.innerHTML = `<p>${data.wind.speed} km/h<br><span>Wind Speed</span></p>`;

        // let work on the pic according to the response:
        if (data.weather[0].main === 'Clear') img.src = "icons/01.png";
        else if (data.weather[0].main === 'Clouds') img.src = "icons/02.png";
        else if (data.weather[0].main === 'Rain') img.src = "icons/03.png";
        else if (data.weather[0].main === 'Snow') img.src = "icons/04.png";
        
      }
    })
    .catch(error => {
      console.error(error)

    });
  

}
)


function validateCity() {
    
  if (cityEntered.value === '') {
    // let handle if the user enter a wrong city:
    invalidCityMessage.classList.add("red-message");
    invalidCityMessage.textContent = `city not found`;
    searchBarElement.insertAdjacentElement('afterend', invalidCityMessage);
  }
  else{
    apiCity = cityEntered.value;
    console.log(apiCity)
    cityEntered.value = "";
  }
}