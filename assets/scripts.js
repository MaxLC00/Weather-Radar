const fetchButton = document.getElementById('search-button');
const searchTermEl = document.getElementById('search-value');
const historyEl = document.getElementById('search-history');
const displayEl = document.getElementById('today');
const forecastEl = document.getElementById('five-day');
const historyBtn = document.querySelectorAll('li');
const clearBtn = document.getElementById('clear-btn');


function getForecast() {

  updateHistory();
  displayWeather();
  displayForecast();
}


function updateHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  let searchTerm = searchTermEl.value

  historyEl.innerHTML = "";

  for (let i = 0; i < history.length; i++) {
    const termEl = document.createElement('button');
    termEl.textContent = history[i];
    termEl.classList = "button";
    termEl.id = "hist-btn";

    historyEl.appendChild(termEl);

  }

  history.push(searchTerm);
  localStorage.setItem('history', JSON.stringify(history));
}

function displayWeather() {
  let searchTerm = searchTermEl.value
  let day = dayjs();
  displayEl.innerHTML = "";

  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {

      const weatherEl = document.createElement('div');
      weatherEl.classList = "card-body bg-info";
      const tempToday = document.createElement('h2');
      tempToday.textContent = "temperature: " + data.main.temp + "F";
      const humToday = document.createElement('h2');
      humToday.textContent = "humidity: " + data.main.humidity + "%";
      const windToday = document.createElement('h2');
      windToday.textContent = "Wind: " + data.main.humidity + "MPH";
      const conToday = document.createElement('img');
      conToday.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      const timeNow = document.createElement('h1');
      timeNow.textContent = day.format('MMM D, YYYY');
      const City = document.createElement('h1');
      City.textContent = searchTerm;

      weatherEl.appendChild(City);
      weatherEl.appendChild(timeNow);
      weatherEl.appendChild(tempToday);
      weatherEl.appendChild(humToday);
      weatherEl.appendChild(windToday);
      weatherEl.appendChild(conToday);
      displayEl.appendChild(weatherEl);
    });
}

function displayForecast() {
  let searchTerm = searchTermEl.value
  let day = dayjs();

  forecastEl.innerHTML = "";

  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      for (let i = 1; i < 6; i++) {
        let dayOf = day.add(i, 'day');
        const nextDay = document.createElement('h1');
        nextDay.textContent = dayOf.format('ddd');
        const weatherEl = document.createElement('div');
        weatherEl.classList = "card-body bg-info";
        const tempToday = document.createElement('h2');
        tempToday.textContent = "temperature: " + data.list[i].main.temp + "F";
        const humToday = document.createElement('h2');
        humToday.textContent = "humidity: " + data.list[i].main.humidity + "%";
        const windToday = document.createElement('h2');
        windToday.textContent = "Wind: " + data.list[i].main.humidity + "MPH";
        const conToday = document.createElement('img');
        conToday.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        weatherEl.appendChild(nextDay);
        weatherEl.appendChild(tempToday);
        weatherEl.appendChild(humToday);
        weatherEl.appendChild(windToday);
        weatherEl.appendChild(conToday);
        forecastEl.appendChild(weatherEl);
      }
    })

}

function clearHistory() {
  localStorage.clear();
  historyEl.innerHTML = " ";
}

function getOldcast() {
  let searchTerm = historyBtn.textContent

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

  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      for (let i = 0; i < 4; i++) {
        const weatherEl = document.createElement('div');
        weatherEl.classList = "card-body bg-info";
        const tempToday = document.createElement('h1');
        tempToday.textContent = "temperature: " + data.list[i].main.temp + "F";
        const humToday = document.createElement('h2');
        humToday.textContent = "humidity: " + data.list[i].main.humidity + "%";
        const windToday = document.createElement('h2');
        windToday.textContent = "Wind: " + data.list[i].main.humidity + "MPH";
        const conToday = document.createElement('img');
        conToday.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        weatherEl.appendChild(tempToday);
        weatherEl.appendChild(humToday);
        weatherEl.appendChild(windToday);
        weatherEl.appendChild(conToday);
        forecastEl.appendChild(weatherEl);
      }
    })
}

fetchButton.addEventListener('click', getForecast);
clearBtn.addEventListener('click', clearHistory);
historyBtn.addEventListener('click', getOldcast);