const fetchButton = document.getElementById('search-button');
const searchTermEl = document.getElementById('search-value');
const historyEl = document.getElementById('search-history');
const displayEl = document.getElementById('today');
const forecastEl = document.getElementById('five-day');


function getForecast() {
  
  updateHistory();
  displayWeather();
  // displayForecast();
}


function updateHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  let searchTerm = searchTermEl.value

 historyEl.innerHTML = "";

 for (let i = 0; i < history.length; i++) {
  console.log(history[i])
   const termEl = document.createElement('li');
    termEl.textContent = history[i];

   historyEl.appendChild(termEl);
    
  }

  history.push(searchTerm);
  localStorage.setItem('history', JSON.stringify(history));
}

function displayWeather() {
  let searchTerm = searchTermEl.value

  displayEl.innerHTML = "";

  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    
    const weatherEl = document.createElement('div');
    weatherEl.classList = "card-body bg-info";
    const tempToday = document.createElement('h1');
    tempToday.textContent = "temperature: " + data.main.temp + "F"; 
    const humToday = document.createElement('h2');
    humToday.textContent = "humidity: " + data.main.humidity + "%";
    const windToday = document.createElement('h2');
    windToday.textContent = "Wind: " + data.main.humidity + "MPH";
    const conToday = document.createElement('img');
    conToday.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

   weatherEl.appendChild(tempToday);
   weatherEl.appendChild(humToday);
   weatherEl.appendChild(windToday);
   weatherEl.appendChild(conToday);
   displayEl.appendChild(weatherEl);
    });
}

function displayForecast() {
  let searchTerm = searchTermEl.value

  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    })

}

fetchButton.addEventListener('click', getForecast);