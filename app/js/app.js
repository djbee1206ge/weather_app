
const API_KEY = '2ce5be4f2887b0bdca79f79ff16770fc'


// const API_URL = 'https://api.github.com/users/'
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('.git-main')

getUser('New York')

async function getUser(username) {
  try {
    const { data } = await axios(`${API_URL + username}&appid=${API_KEY}`)

    createUserCard(data)

  } catch (err) {
    console.log(err)
  }
}


function createUserCard(user) {
  const userCard = `
   <div class="user-card">
   <div class="user-info">
     <h2>${user.name}</h2>
     <span>Weather: ${user.weather.description}</span>
     

     <ul>
       <li>Temperature <span>${(user.main.temp - 273.15).toFixed(1)}°C</span></li> 
       <li>(Feels Like <span style="font-size: smaller;">${(user.main.feels_like - 273.15).toFixed(1)}°C)</span></></li>
       <li>Humidity <span>${user.main.humidity}%</span> </li>
       <li>Wind Speed <span>${(user.wind.speed * 3.6).toFixed(1)} km/hr</span> </li>
       <li>Wind Direction <span>${user.wind.deg}deg</span> </li>
     </ul>

   </div>
 </div>
   `
  main.innerHTML = userCard
}

function createErrorCard(msg) {
  const cardHTML = `
      <div class="user-card">
        <h2>${msg}</h2>
      <div>
    `
  main.innerHTML = cardHTML
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos')

  repos
    .slice(0, 10)
    .forEach(repo => {
      const repoEl = document.createElement('a')
      repoEl.classList.add('repo')
      repoEl.href = repo.html_url
      repoEl.target = '_blank'
      repoEl.innerText = repo.name

      reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const user = search.value

  if (user) {
    getUser(user)
    search.value = ''
  }
})