const API_KEY = '0596dadb271baadc202ed15ad32c606e';

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const dc = document.querySelector('.description');
const tempMax = document.querySelector('.temp-max');
const tempMin = document.querySelector('.temp-min');

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
};

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  )
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    city.innerText = `${data.name}`;
    temp.innerText = `${Math.round(data.main.temp)}°`;
    dc.innerText = `${data.weather[0].main}`;
    tempMax.innerText = `H:${Math.round(data.main.temp_max)}°`;
    tempMin.innerText = `L:${Math.round(data.main.temp_min)}°`;
  })
};

const fail = () => {};

navigator.geolocation.getCurrentPosition(success, fail);