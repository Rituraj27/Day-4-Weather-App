const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.error');
const inputField = document.querySelector('.search input');

// Function to handle the search logic
const handleSearch = () => {
  const APIKey = 'a0d427928554968645bfdcdf8e891be8';
  const city = inputField.value;

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather img');
      const temperature = document.querySelector('.weather .temperature');
      const description = document.querySelector('.weather .description');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;

        case 'Rain':
          image.src = 'images/rain.png';
          break;

        case 'Snow':
          image.src = 'images/snow.png';
          break;

        case 'Clouds':
          image.src = 'images/cloud.png';
          break;

        case 'Mist':
          image.src = 'images/mist.png';
          break;

        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
};

// Click event listener on the button
search.addEventListener('click', handleSearch);

// Keydown event listener on the input field
inputField.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
