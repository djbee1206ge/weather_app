
const API_KEY = '2ce5be4f2887b0bdca79f79ff16770fc'


const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const form = document.getElementById('form')
const search = document.getElementById('search')
const weatherData = document.querySelector('.weather')


getcity('Geneve')

async function getcity(cityname) {
  try {
    const { data } = await axios(`${API_URL + cityname}&appid=${API_KEY}`)

    createcityCard(data)
    console.log(data.sys.country)
  } catch (err) {
    console.log(err)
  }




  function createcityCard(city) {
    const iconURL = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
    const cityCard = `
    <div class="city-card">
      <div class="city-info">
        <div class="city-header">
          <h2>${city.name}</h2>
          <img src="${iconURL}" />
        </div>
        <ul>
        <li>Weather: <span>${city.weather[0].description}</span></li>
          <li>Temperature <span>${(city.main.temp - 273.15).toFixed(1)}°C</span></li> 
          <li>(Feels Like <span style="font-size: smaller;">${(city.main.feels_like - 273.15).toFixed(1)}°C)</span></></li>
          <li>Humidity <span>${city.main.humidity}%</span> </li>
          <li>Wind Speed <span>${(city.wind.speed * 3.6).toFixed(1)} km/hr</span> </li>
          <li>Wind Direction <span style="transform: rotate(${city.wind.deg}deg)">&uarr;</span> </li>
        </ul>
      </div>
    </div>
      `
    weatherData.innerHTML = cityCard
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const city = search.value

    if (city) {
      getcity(city)
      search.value = ''
      search.style.backgroundColor = 'rebeccapurple;'
    }
  })
}