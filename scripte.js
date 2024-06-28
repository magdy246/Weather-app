let searchInput = document.querySelector("#search");
let classModal = document.getElementById("staticBackdrop");
let closeModal = document.getElementById("closeBtn");

searchInput.addEventListener("change", function () {
  getWeather(searchInput.value);
  removeInput();
});

searchInput.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    getWeather(searchInput.value);
    removeInput();
  }
});

function removeInput() {
  searchInput.value = "";
}

function messegeError() {
  classModal.classList.remove("d-none");
  classModal.classList.add("d-block");
  classModal.classList.add("bg-black");
  classModal.classList.add("bg-opacity-75");
}

function closeBtn() {
  classModal.classList.add("d-none");
  classModal.classList.remove("d-block");
}

const myAPIKey = `d3115bf2decb44b0986121238242406`;

async function getWeather(country) {
  try {
    document.querySelector(
      ".all-card"
    ).innerHTML = `<div class="loader"></div>`;
    let resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${myAPIKey}&q=${country}&days=7`
    );
    let data = await resp.json();
    displayData(data);
  } catch (error) {
    messegeError();
    document.querySelector(".all-card").innerHTML = "";
  }
}

function myLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let currentLocation = `${latitude},${longitude}`;
  getWeather(currentLocation);
}
navigator.geolocation.getCurrentPosition(myLocation);

function displayData(data) {
  let location = data.location;
  let dataCurrentDay = data.current;
  let dataOfArray1 = data.forecast.forecastday[0];
  let dataOfArray2 = data.forecast.forecastday[1];
  let dataOfArray3 = data.forecast.forecastday[2];

  let date1 = new Date(dataOfArray1.date);
  let date2 = new Date(dataOfArray2.date);
  let date3 = new Date(dataOfArray3.date);

  let weekday1 = date1.toLocaleDateString("en-us", { weekday: "long" });
  let weekday2 = date2.toLocaleDateString("en-us", { weekday: "long" });
  let weekday3 = date3.toLocaleDateString("en-us", { weekday: "long" });

  let month = date1.toLocaleDateString("en-us", { month: "long" });

  let time = data.location.localtime;
  let date = new Date(time);
  let day = date.getDate();

  let weatherCards = `
  <div class="bg-forecast1 rounded-4 w-100 current-forecast d-flex flex-column justify-content-center align-items-center">
                    <div class="w-100 current-forecast-header d-flex justify-content-between align-items-center">
                        <div class="day">${weekday1}</div>
                        <div class="date">${day}${month}</div>
                    </div>
                    <div class="current-forecast-content d-flex flex-column justify-content-center align-items-start">
                        <div class="location me-4">${location.name}</div>
                        <div class="current-degree">${dataCurrentDay.temp_c}<sup>o</sup>C</div>
                        <div class="current-forecast-icon"><img src="https:${dataCurrentDay.condition.icon}" alt="icon"></div>
                        <div class="custom my-2">${dataCurrentDay.condition.text}</div>
                        <div class="span-current-forecast">
                            <span class="me-2"><img class="me-2" src="image/icon-umberella.png"
                                    alt="icon-umberella">${dataCurrentDay.cloud}%</span>
                            <span class="me-2"><img class="me-2" src="image/icon-wind.png" alt="icon-wind">${dataCurrentDay.wind_kph}Kph</span>
                            <span class="me-2"><img class="me-2" src="image/icon-compass.png"
                                    alt="icon-compass">${dataCurrentDay.humidity}%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-forecast2 rounded-4 w-100 forecast flex-column d-flex justify-content-center align-items-center">
                    <div class="w-100 forecast-header d-flex justify-content-center align-items-center">
                        <div class="day text-center">${weekday2}</div>
                    </div>
                    <div class="forecast-contect d-flex flex-column justify-content-center align-items-center">
                        <div class="forecast-icon">
                            <img src="https:${dataOfArray2.day.condition.icon}" alt="icon">
                        </div>
                        <div class="degree">${dataOfArray2.day.maxtemp_c}<sup>o</sup>C</div>
                        <div class="night-degree">${dataOfArray2.day.mintemp_c}<sup>o</sup></div>
                        <div class="custom">${dataOfArray2.day.condition.text}</div>
                    </div>
                </div>
                <div class="bg-forecast1 rounded-4 w-100 forecast flex-column d-flex justify-content-center align-items-center">
                    <div class="w-100 forecast-header d-flex justify-content-center align-items-center">
                        <div class="day text-center">${weekday3}</div>
                    </div>
                    <div class="forecast-contect d-flex flex-column justify-content-center align-items-center">
                        <div class="forecast-icon">
                            <img src="https:${dataOfArray3.day.condition.icon}" alt="icon">
                        </div>
                        <div class="degree">${dataOfArray3.day.maxtemp_c}<sup>o</sup>C</div>
                        <div class="night-degree">${dataOfArray3.day.mintemp_c}<sup>o</sup></div>
                        <div class="custom">${dataOfArray3.day.condition.text}</div>
                    </div>
                </div>
`;
  document.querySelector(".all-card").innerHTML = weatherCards;
}

getWeather("Paris");
